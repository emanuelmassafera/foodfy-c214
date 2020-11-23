const User = require("../src/app/models/User");
const faker = require("faker");
const { hash } = require("bcryptjs");

QUnit.module("users tests");

QUnit.test("validate if lists all users", async assert => {
    const users = await User.all();

    assert.notEqual(users, 0, "should not be 0");
});

QUnit.test("validate if create", async assert => {
    const password = await hash("1234", 8);

    const user = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: password,
        is_admin: faker.random.boolean(),
    }

    const userId = await User.create(user);

    assert.ok(userId, "should be ok");

    await User.delete(userId);
});

QUnit.test("validate if delete", async assert => {
    const password = await hash("1234", 8);

    const user = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: password,
        is_admin: faker.random.boolean(),
    }

    const userId = await User.create(user);

    await User.delete(userId);

    const results = await User.find(userId);
    const userFound = results.rows[0];

    assert.notOk(userFound, "should be not ok");
});

QUnit.test("validate if update", async assert => {
    const password = await hash("1234", 8);

    let user = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: password,
        is_admin: faker.random.boolean(),
    }

    const userId = await User.create(user);

    user = {
        name: `${user.name} Updated`,
        email: user.email,
        password: password,
        is_admin: user.is_admin,
        id: userId,
    }

    await User.update(user);

    const results = await User.find(userId);
    const userFound = results.rows[0];

    assert.equal(userFound.name, user.name, "should be equal");

    await User.delete(userId);
});
