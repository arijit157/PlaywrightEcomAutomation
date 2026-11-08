const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.cartPageTitle = page.locator('span.title');
        this.cartItems = page.locator('div.cart_item').all();
        this.cartItemsName = '.inventory_item_name';
        this.checkoutBtn = page.locator('#checkout');
    }

    async validateCart(actualProdName, flag) {
        await expect(this.cartPageTitle).toContainText('Your Cart');
        let cartItems = await this.cartItems;

        for (let cartItem of cartItems) {
            let cartItemName = await cartItem.locator('.inventory_item_name').textContent();

            if (cartItemName.includes(actualProdName)) {
                flag = true;
                break;
            }
        }

        return flag;
    }

    async clickCheckOut(){
        await this.checkoutBtn.click();
    }
}

module.exports = { CartPage }