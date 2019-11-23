const mysql = require('mysql2/promise');
require('bluebird');
const fs = require('fs-extra');

const META = './sql/meta.json';
const SCIRPT_PATH = './sql';
const SCIRPT_RGX = /^(\d+)-.+?\.sql$/;

class MySQLUtil {

    constructor(config) {
        this.config = config;
        this.pool = this.createPool();
    }

    async query() {
        try {
            return await this.pool.query.apply(this.pool, arguments)
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    createPool(option){
        return mysql.createPool({ ...this.config, ...option });
    }

    createConnection(option){
        return mysql.createConnection({ ...this.config, ...option });
    }

    async runMultiStatement(sqlScript){
        const connection= await this.createConnection({ multipleStatements: true });

        return connection.beginTransaction()
            .then(() => connection.execute(sqlScript))
            .then(() => connection.commit())
            .then(() => connection.end());
    }

    async runSqlScripts(){
        const lastVersion = await this.lastestVersion();
        const files = await fs.readdir(SCIRPT_PATH);

        const sqlScripts = [];

        files.forEach((fileName) => {
            const result = SCIRPT_RGX.exec(fileName);
            if (result) {
                const version = parseInt(result[1]);
                if (version > lastVersion) {
                    sqlScripts.push({ version, fileName });
                }
            }
        });

        sqlScripts.sort((a, b) => {
            return a.version - b.version;
        });

        for (let i = 0; i < sqlScripts.length; i++) {
            const { version, fileName } = sqlScripts[i];

            const succeed = await fs.readFile(`${SCIRPT_PATH}/${fileName}`, { encoding: "utf-8" })
                .then(script => {
                    return this.runMultiStatement(script)
                        .then(() => {
                            this.writeNewVersion(version);
                            console.log(`Successfully ran SQL script ${fileName}`);
                            return version;
                        })
                        .catch((err) => {
                            console.error(`error occured when running ${fileName}: `);
                            console.error(err);
                            return null;
                        });
                });
            if (!succeed) {
                return false;
            }
        }

        return true;
    }

    async lastestVersion(){
        const exist = await fs.pathExists(META);
        if (exist) {
            const meta = await fs.readJSON(META);
            return meta.version;
        }

        this.writeNewVersion(0);

        return 0;
    }

    async writeNewVersion(version){
        fs.writeJSON(META, {
            version
        });
    }

}


module.exports = new MySQLUtil({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'knowledge_base'
});