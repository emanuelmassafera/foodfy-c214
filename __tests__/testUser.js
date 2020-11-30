const User = require("../src/app/models/User");
const db = require("../src/config/db");
const faker = require("faker");
const { hash } = require("bcryptjs");

describe('users tests', () => { 
    test("validate if lists all users", async () => {
        const users = await User.all();

        expect(users).not.toBe(0);
    });
    
    test("validate if create", async () => {
        const password = await hash("1234", 8);
    
        const user = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: password,
            is_admin: faker.random.boolean(),
        }
    
        const userId = await User.create(user);
    
        expect(userId).not.toBeUndefined();
    
        await User.delete(userId);
    });
    
    test("validate if delete", async () => {
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
    
        expect(userFound).toBeUndefined();
    });
    
    test("validate if update", async () => {
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
    
        expect(userFound.name).toEqual(user.name);
    
        await User.delete(userId);
    });
});
