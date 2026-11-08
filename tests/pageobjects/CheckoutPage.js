const { expect } = require('@playwright/test');

class CheckoutPage{
    constructor(page){
        this.page = page;
        this.pageTitle = page.locator("span.title");
        this.firstName = page.getByPlaceholder('First Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.zipCode = page.getByPlaceholder('Zip/Postal Code');
        this.continueBtn = page.locator('#continue');
    }

    async checkoutStep1(){
        await expect(this.pageTitle).toContainText('Checkout');
        await this.firstName.pressSequentially("John", {delay: 300});
        await this.lastName.fill("Doe");
        await this.zipCode.fill('123321');
        await this.continueBtn.click();
    }
}

module.exports = { CheckoutPage }