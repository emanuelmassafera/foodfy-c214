const Chef = require("../src/app/models/Chef");
const File = require("../src/app/models/File");
const faker = require("faker");

QUnit.module("chefs tests");

QUnit.test("validate if lists all chefs", async assert => {
    const users = await Chef.all();

    assert.notEqual(users, 0, "should not be 0");
});

QUnit.test("validate if create", async assert => {
    let chefs = [];
    let files = [];

    files.push({
        filename: faker.image.image(),
        path: `public/images/placeholder.png`,
    });
    
    const filesPromises = files.map(file => File.createChefFile(file));
    let results = await filesPromises[0];
    const fileId = results.rows[0].id;

    chefs.push({
        name: faker.name.findName(),
        fileId: fileId,
    });
    
    const chefsPromise = chefs.map(chef => Chef.create(chef));

    const chefsIds = await Promise.all(chefsPromise);

    assert.ok(chefsIds[0], "should be ok");

    await Chef.delete(chefsIds[0]);
});

QUnit.test("validate if delete", async assert => {
    let chefs = [];
    let files = [];

    files.push({
        filename: faker.image.image(),
        path: `public/images/placeholder.png`,
    });
    
    const filesPromises = files.map(file => File.createChefFile(file));
    let results = await filesPromises[0];
    const fileId = results.rows[0].id;

    chefs.push({
        name: faker.name.findName(),
        fileId: fileId,
    });
    
    const chefsPromise = chefs.map(chef => Chef.create(chef));

    const chefsIds = await Promise.all(chefsPromise);
    
    await Chef.delete(chefsIds[0]);

    results = await Chef.find(chefsIds[0]);
    const chefFound = results.rows[0];

    assert.notOk(chefFound, "should be not ok");
});

QUnit.test("validate if update", async assert => {
    let chefs = [];
    let files = [];

    files.push({
        filename: faker.image.image(),
        path: `public/images/placeholder.png`,
    });
    
    const filesPromises = files.map(file => File.createChefFile(file));
    let results = await filesPromises[0];
    const fileId = results.rows[0].id;

    chefs.push({
        name: faker.name.findName(),
        fileId: fileId,
    });
    
    const chefsPromise = chefs.map(chef => Chef.create(chef));

    const chefsIds = await Promise.all(chefsPromise);

    await Chef.update({
        name: "Updated",
        id: chefsIds[0],
    }, fileId);
    
    results = await Chef.find(chefsIds[0]);
    const chefFound = results.rows[0];
    
    assert.equal(chefFound.name, "Updated", "should be equal");
    
    await Chef.delete(chefsIds[0]);
});