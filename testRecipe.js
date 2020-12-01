const Recipe = require("../src/app/models/Recipe");
const File = require("../src/app/models/File");
const faker = require("faker");

describe('recipes tests', () => {
    test("validate if lists all recipes", async () => {
        const recipes = await Recipe.all();
    
        expect(recipes).not.toBe(0);
    });
    
    test("validate if create", async () => {
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
    
        expect(recipesIds[0]).not.toBeUndefined();
    
        await Recipe.delete(recipesIds[0]);
    });
    
    test("validate if delete", async () => {
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
    
        expect(recipeFound).toBeUndefined();
    });
    
    test("validate if update", async () => {
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

        expect("Updated").toMatch(recipeFound.title);
                
        await Recipe.delete(recipesIds[0]);
    });
});
