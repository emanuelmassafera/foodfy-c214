const db = require("../config/db");

module.exports = {
    date(timestamp) {
        const date = new Date(timestamp);

        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        };
    },

    // async cleanDatabase() {
    //     await db.query("DELETE FROM recipes_files");
    //     await db.query("DELETE FROM recipes");
    //     await db.query("DELETE FROM chefs");
    //     await db.query("DELETE FROM files");
    //     await db.query("DELETE FROM users");

    //     await db.query("ALTER SEQUENCE files_id_seq RESTART WITH 1");
    //     await db.query("ALTER SEQUENCE recipes_files_id_seq RESTART WITH 1");
    //     await db.query("ALTER SEQUENCE chefs_id_seq RESTART WITH 1");
    //     await db.query("ALTER SEQUENCE recipes_id_seq RESTART WITH 1");
    //     await db.query("ALTER SEQUENCE users_id_seq RESTART WITH 1");
    // }
}