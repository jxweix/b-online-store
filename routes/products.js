const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();

const generateProduct = () => {
    return {
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()),
        description: faker.lorem.sentence(),
        imageUrl: faker.image.url()
    };
};

router.get('/', async (req, res) => {
    const products = [];
    for (let i = 0; i < 10; i++) {
        const product = await generateProduct();
        products.push(product);
    }
    res.json(products);
});

module.exports = router;