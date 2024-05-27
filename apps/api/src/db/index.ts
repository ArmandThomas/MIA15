import DbManager from "@/utils/simplifiedMysql.js";

let db: DbManager;

function getDB () {
    if (!db) {
        db = new DbManager(process.env.DB_URL).init();
    }
    return db;
}

export {
    getDB
}