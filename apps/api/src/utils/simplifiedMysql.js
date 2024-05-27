import { createPool } from 'mysql2';
import { parse as parseUrl } from 'url';

class DbManager {
    constructor(mysqlUrl) {
        this.mysqlUrl = mysqlUrl;
    }

    init() {
        this.mysql = createPool(this.parseMyslUrl(this.mysqlUrl)).promise();
        return this;
    }

    async query(query, data) {
        const [results] = await this.mysql.execute(...arguments);
        return results;
    }

    async queryOne(query, data) {
        const [results] = await this.mysql.execute(...arguments);
        return results?.[0] || null;
    }

    async insert(table, data) {
        const result = await this.mysql.query(`INSERT INTO ${table} SET ?`, data);
        return result;
    }

    async update(table, data = {}, filter = '', values = []) {
        let keys = Object.keys(data);
        const updates = keys.map(key => {
            return `${key} = ?`;
        }).join(', ');

        const result = await this.mysql.query(`UPDATE ${table} SET ${updates} ${filter}`, [...Object.values(data), ...values]);
        return result;
    }

    async delete(table, filter = '', values = []) {
        const result = await this.mysql.query(`DELETE FROM ${table} ${filter}`, values);
        return result;
    }
    
    parseMyslUrl (adresse) {
        // ne gère pas l'objet query car pour l'instant on ne s'en sert pas
        const url = parseUrl(adresse, true);
        const auth = url.auth.split(':');
        return {
            host: url.hostname,
            port: url.port,
            database: url.pathname.substring(1),
            user: auth.shift(),
            password: auth.join(':'),
        };
    }
}

export default DbManager;