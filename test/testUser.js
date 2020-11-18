const User = require("../src/app/models/User");

QUnit.module("users tests");

QUnit.test("validate if lists all users", async assert => {
    const users = await User.all();

    assert.notEqual(users, 0, "should not be 0");
});

QUnit.test("validate if create", async assert => {
    const user = {
        name: "User Test Create",
        email: "user@testcreate.com",
        password: "1234",
        is_admin: false,
    }

    const userId = await User.create(user);

    assert.ok(userId, "should be ok");
});

QUnit.test("validate if delete", async assert => {
    const user = {
        name: "User Test Delete",
        email: "user@test-delete.com",
        password: "1234",
        is_admin: false,
    }

    const userId = await User.create(user);

    await User.delete(userId);

    const results = await User.find(userId);
    const userFound = results.rows[0];

    assert.notOk(userFound, "should be not ok");
});

QUnit.test("validate if update", async assert => {
    let user = {
        name: "User Test Update",
        email: "user@test-update.com",
        password: "1234",
        is_admin: false,
    }

    const userId = await User.create(user);

    user = {
        name: "User Test Update Ok",
        email: "user@test-update.com",
        password: "1234",
        is_admin: false,
        id: userId,
    }

    await User.update(user);

    const results = await User.find(userId);
    const userFound = results.rows[0];

    assert.equal(userFound.name, "User Test Update Ok", "should be equal");
});