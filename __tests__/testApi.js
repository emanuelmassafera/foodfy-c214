const axios = require("axios");
const About = require("../src/app/models/About");

jest.mock('axios');

describe('api tests', () => {
    test('should fetch about information', async () => {
        const about = 'Bacon ipsum dolor amet';

        const resp = {data: about};
        axios.get.mockResolvedValue(resp);

        return About.getAboutInformation().then(data => expect(data).toEqual(about));
    });

    test('should fetch images url', async () => {
        const image = 'https://foodish-api.herokuapp.com/images/pizza/pizza57.jpg';

        const resp = {data: image};
        axios.get.mockResolvedValue(resp);

        return About.getRandomFoodImages().then(data => expect(data).toEqual(image));
    });
});
