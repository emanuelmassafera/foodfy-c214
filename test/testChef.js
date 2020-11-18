const Chef = require("../src/app/models/Chef");

QUnit.module("chefs tests");

QUnit.test("validate if lists all chefs", async assert => {
    const users = await Chef.all();

    assert.notEqual(users, 0, "should not be 0");
});
