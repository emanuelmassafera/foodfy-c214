const db = require("../src/config/db");

describe('database tests', () => {
    test('validate if connects', async () => {
        const client = await db.connect();
        const totalCount = db.totalCount;
        client.release();
        
        expect(totalCount).toBe(1);
    });

    test("validate if the users registers were created", async () => {
        const users = await db.query("SELECT count(*) FROM users");

        expect(users).not.toBe(0);
    });

    test("validate if the chefs registers were created", async () => {
        const chefs = await db.query("SELECT count(*) FROM chefs");

        expect(chefs).not.toBe(0);
    });

    test("validate if the recipes registers were created", async () => {
        const recipes = await db.query("SELECT count(*) FROM recipes");
    
        expect(recipes).not.toBe(0);
    });

    test("validate if the files registers were created", async () => {
        const files = await db.query("SELECT count(*) FROM files");
    
        expect(files).not.toBe(0);
    });

    test("validate if the recipes_files registers were created", async () => {
        const recipes_files = await db.query("SELECT count(*) FROM recipes_files");
    
        expect(recipes_files).not.toBe(0);
    });
});
