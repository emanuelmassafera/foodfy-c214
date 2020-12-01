var { Pool } = require("pg"), db;

module.exports = {
    get() {
        if(!db) {
            db = new Pool({
                user: "postgres",
                password: "admin",
                host: "localhost",
                port: 5432,
                database: "foodfy"
            });
        }

        return db;
    },
};
