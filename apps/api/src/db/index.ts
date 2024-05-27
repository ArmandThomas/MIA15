import DbManager from "@/utils/simplifiedMysql.js";

let db: DbManager;

const getDB = (): DbManager => {
    return db ?? (db = new DbManager(process.env.DB_URL).init());
};

export {
    getDB
}