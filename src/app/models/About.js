const axios = require('axios');
const { image } = require('faker');

module.exports = {
    async getAboutInformation() {
        const results = await axios.get("https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1&format=html");

        return results.data;
    },

    async getRandomFoodImages() {
        const results = await axios.get("https://foodish-api.herokuapp.com/api/");

    
        
        return results.data;
    }
}
