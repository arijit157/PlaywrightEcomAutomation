const { test, expect } = require('@playwright/test');

test('Product purchase flow validation', async ({ page }) => {
    await page.goto('');
    await expect(page.locator('div.login_logo')).toContainText('Swag Labs');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.locator('.inventory_item_name').first().waitFor({ state: 'visible' });
    let productLocators = await page.locator('.inventory_item').all();
    
    for(let productLocator of productLocators){
        let actualProdName = await productLocator.locator('.inventory_item_name').textContent();
        
        if(actualProdName.includes('Backpack')){
            await productLocator.getByRole('button', {name:'Add to cart'}).click();
        }
    }
});//hi hello