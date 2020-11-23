const Recipe = require("../src/app/models/Recipe");
const File = require("../src/app/models/File");
const faker = require("faker");

QUnit.module("recipes tests");

QUnit.test("validate if lists all recipes", async assert => {
    const recipes = await Recipe.all();

    assert.notEqual(recipes, 0, "should not be 0");
});

QUnit.test("validate if create", async assert => {
    let recipes = [];
    let files = [];

    recipes.push({
        chef: Math.ceil(Math.random() * 5),
        title: faker.name.title(),
        ingredients: faker.lorem.paragraph(Math.ceil(Math.random() * 5)).split(". ").map(ingredient => ingredient.replace(".", "")),
        preparation: faker.lorem.paragraph(Math.ceil(Math.random() * 5)).split(". ").map(ingredient => ingredient.replace(".", "")),
        information: faker.lorem.paragraph(Math.ceil(Math.random() * 10)),
        userId: Math.ceil(Math.random() * 5),
    });
    
    const recipesPromise = recipes.map(recipe => Recipe.create(recipe));

    recipesIds = await Promise.all(recipesPromise);

    while(files.length < 5) {
        files.push({
            filename: faker.image.image(),
            path: `public/images/placeholder.png`,
            recipe_id: recipesIds[0],
        });
    }
    
    const filesPromises = files.map(file => File.create(file));
    await Promise.all(filesPromises);

    assert.ok(recipesIds[0], "should be ok");

    await Recipe.delete(recipesIds[0]);
});

QUnit.test("validate if delete", async assert => {
    let recipes = [];
    let files = [];

    recipes.push({
        chef: Math.ceil(Math.random() * 5),
        title: faker.name.title(),
        ingredients: faker.lorem.paragraph(Math.ceil(Math.random() * 5)).split(". ").map(ingredient => ingredient.replace(".", "")),
        preparation: faker.lorem.paragraph(Math.ceil(Math.random() * 5)).split(". ").map(ingredient => ingredient.replace(".", "")),
        information: faker.lorem.paragraph(Math.ceil(Math.random() * 10)),
        userId: Math.ceil(Math.random() * 5),
    });
    
    const recipesPromise = recipes.map(recipe => Recipe.create(recipe));

    recipesIds = await Promise.all(recipesPromise);

    while(files.length < 5) {
        files.push({
            filename: faker.image.image(),
            path: `public/images/placeholder.png`,
            recipe_id: recipesIds[0],
        });
    }
    
    const filesPromises = files.map(file => File.create(file));
    await Promise.all(filesPromises);

    await Recipe.delete(recipesIds[0]);

    const results = await Recipe.find(recipesIds[0]);
    const recipeFound = results.rows[0];

    assert.notOk(recipeFound, "should be not ok");
});

QUnit.test("validate if update", async assert => {
    let recipes = [];
    let files = [];

    recipes.push({
        chef: Math.ceil(Math.random() * 5),
        title: faker.name.title(),
        ingredients: faker.lorem.paragraph(Math.ceil(Math.random() * 5)).split(". ").map(ingredient => ingredient.replace(".", "")),
        preparation: faker.lorem.paragraph(Math.ceil(Math.random() * 5)).split(". ").map(ingredient => ingredient.replace(".", "")),
        information: faker.lorem.paragraph(Math.ceil(Math.random() * 10)),
        userId: Math.ceil(Math.random() * 5),
    });
    
    const recipesPromise = recipes.map(recipe => Recipe.create(recipe));

    recipesIds = await Promise.all(recipesPromise);

    while(files.length < 5) {
        files.push({
            filename: faker.image.image(),
            path: `public/images/placeholder.png`,
            recipe_id: recipesIds[0],
        });
    }
    
    const filesPromises = files.map(file => File.create(file));
    await Promise.all(filesPromises);

    await Recipe.update({
        chef: Math.ceil(Math.random() * 5),
        title: "Updated",
        ingredients: faker.lorem.paragraph(Math.ceil(Math.random() * 5)).split(". ").map(ingredient => ingredient.replace(".", "")),
        preparation: faker.lorem.paragraph(Math.ceil(Math.random() * 5)).split(". ").map(ingredient => ingredient.replace(".", "")),
        information: faker.lorem.paragraph(Math.ceil(Math.random() * 10)),
        userId: Math.ceil(Math.random() * 5),
        id: recipesIds[0],
    });
    
    const results = await Recipe.find(recipesIds[0]);
    const recipeFound = results.rows[0];
    
    assert.equal(recipeFound.title, "Updated", "should be equal");
    
    await Recipe.delete(recipesIds[0]);
});
