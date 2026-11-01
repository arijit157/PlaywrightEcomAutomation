const { test, expect } = require('@playwright/test');

let actualProdName, flag=false;

test('Product purchase flow validation', async ({ page }) => {
    await page.goto('');
    await expect(page.locator('div.login_logo')).toContainText('Swag Labs');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.locator('.inventory_item_name').first().waitFor({ state: 'visible' });
    let productLocators = await page.locator('.inventory_item').all();
    
    for(let productLocator of productLocators){
        actualProdName = await productLocator.locator('.inventory_item_name').textContent();
        
        if(actualProdName.includes('Backpack')){
            await productLocator.getByRole('button', {name:'Add to cart'}).click();
            break;
        }
    }

    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await page.locator('.shopping_cart_link').click();
    await expect(page.locator('span.title')).toContainText('Your Cart');
    let cartItems = await page.locator('div.cart_item').all();
    
    for(let cartItem of cartItems){
        let cartItemName = await cartItem.locator('.inventory_item_name').textContent();
        console.log(cartItemName, actualProdName);
        if(cartItemName.includes(actualProdName)){
            flag=true;
            break;
        }
    }

    if(flag){
        await page.locator('#checkout').click();
        await expect(page.locator("span.title")).toContainText('Checkout');
        await page.getByPlaceholder('First Name').pressSequentially("John", {delay: 300});
        await page.getByPlaceholder('Last Name').fill("Doe");
        await page.getByPlaceholder('Zip/Postal Code').fill('123321');
        await page.locator('#continue').click();
        await expect(page.locator('[data-test="payment-info-label"]')).toContainText('Payment Information');
        await page.locator('#finish').click();
        await expect(page.locator('h2:has-text("Thank you for your order!")')).toBeVisible();
    }
    else{
        expect(flag).toBeTruthy();
    }
});