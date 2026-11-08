const { expect } = require('@playwright/test');

class ProductPage {
    constructor(page) {
        this.page = page;
        this.products = page.locator('.inventory_item').all();
        this.productName = '.inventory_item_name';
        this.cartItemNumber = page.locator('.shopping_cart_badge');
        this.cart = page.locator('.shopping_cart_link');
    }

    async addProductToCart(productName) {
        let products = await this.products;

        console.log(productName);

        for (let product of products) {
            let actualProdName = await product.locator(this.productName).textContent();

            console.log(actualProdName);

            if (actualProdName.includes(productName)) {
                await product.getByRole('button', { name: 'Add to cart' }).click();
                break;
            }
        }

        await expect(this.cartItemNumber).toHaveText('1');
        await this.cart.click();
    }
}

module.exports = { ProductPage }