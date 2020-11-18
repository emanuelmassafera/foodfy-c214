const db = require("../src/config/db");

QUnit.module("database tests");

QUnit.test("validate if connects", async assert => {
    const client = await db.connect();
    const totalCount = db.totalCount;
    client.release();

    assert.equal(totalCount, 1, 'should be 1');
});

QUnit.test("validate if the users registers were created", async assert => {
    const users = await db.query("SELECT count(*) FROM users");

    assert.notEqual(users, 0, "should not be 0");
});

QUnit.test("validate if the chefs registers were created", async assert => {
    const chefs = await db.query("SELECT count(*) FROM chefs");

    assert.notEqual(chefs, 0, "should not be 0");
});

QUnit.test("validate if the recipes registers were created", async assert => {
    const recipes = await db.query("SELECT count(*) FROM recipes");

    assert.notEqual(recipes, 0, "should not be 0");
});

QUnit.test("validate if the files registers were created", async assert => {
    const files = await db.query("SELECT count(*) FROM files");

    assert.notEqual(files, 0, "should not be 0");
});

QUnit.test("validate if the recipes_files registers were created", async assert => {
    const recipes_files = await db.query("SELECT count(*) FROM recipes_files");

    assert.notEqual(recipes_files, 0, "should not be 0");
});
