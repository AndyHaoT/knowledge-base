require('../util/env');
const db = require("../util/database");

(async function() {
    const success = await db.runSqlScripts();
	if (!success) {
		console.log(`Failed to ran above scripts`);
	}
})();