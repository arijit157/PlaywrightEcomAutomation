const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./pageobjects/LoginPage');
const { ProductPage } = require('./pageobjects/ProductPage');
const { CartPage } = require('./pageobjects/CartPage');
const { CheckoutPage } = require('./pageobjects/CheckoutPage');
const { CheckoutPage2 } = require('./pageobjects/CheckoutPage2');

let flag=false;

test('Product purchase flow validation', async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce',1);
    
    let productToPurchase = 'Sauce Labs Backpack';
    let productPage = new ProductPage(page);
    await productPage.addProductToCart(productToPurchase);

    let cartPage = new CartPage(page);
    flag = await cartPage.validateCart(productToPurchase);

    let checkoutPage = new CheckoutPage(page);
    let checkoutPage2 = new CheckoutPage2(page);

    if(flag){
        await cartPage.clickCheckOut();
        await checkoutPage.checkoutStep1();

        await checkoutPage2.checkoutStep2();
    }
    else{
        expect(flag).toBeTruthy();
    }
});