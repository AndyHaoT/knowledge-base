# KNOWLEDGE BASE DEV GUIDE

## SET UP DEV

### 1. Install node js
### 2. Install mysql
### 3. Initilize Database Schema

```sh
CREATE SCHEMA `knowledge_base` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4. Create .env file in root dir

Copy to your .env and fill them out
```sh
NODE_ENV=dev
PORT=[your port]
SESSION_SECRET=COMP4711ibbl4u9fdbn
MYSQL_HOST=[your host dns or ip]
MYSQL_USER=[your mysql user name]
MYSQL_PASSWORD=[your mysql password]
DOMAIN=[your domain]
```

### 5. Create meta.json in "../sql"

Copy the following to your meta.json
```sh
{"version":0}
```

## Run DEV

### 1. Make sure your database is up to date
Run the followng command
```sh
npm run sql
```

### 2. Start developing
Use the following command to run the server with nodemon
```sh
npm run dev
```