const Chef = require("../src/app/models/Chef");
const File = require("../src/app/models/File");
const faker = require("faker");

describe('chefs tests', () => {
    afterAll(() => {
        db.end();
    });
    
    test("validate if lists all chefs", async () => {
        const chefs = await Chef.all();
    
        expect(chefs).not.toBe(0);
    });
    
    test("validate if create", async () => {
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
    
        expect(chefsIds[0]).not.toBeUndefined();
    
        await Chef.delete(chefsIds[0]);
    });
    
    test("validate if delete", async () => {
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
    
        expect(chefFound).toBeUndefined();
    });
    
    test("validate if update", async () => {
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
        
        expect("Updated").toMatch(chefFound.name);
        
        await Chef.delete(chefsIds[0]);
    });
});
