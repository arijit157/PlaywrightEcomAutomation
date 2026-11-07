const { test, expect } = require('@playwright/test');

test('Sort product by name in DESC order', async({ page }) => {
    await page.goto('');
    await expect(page.locator('div.login_logo')).toContainText('Swag Labs');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.locator('.inventory_item_name').first().waitFor({ state: 'visible' });
    await page.locator('select.product_sort_container').selectOption('za');
    let firstProductName = page.locator('.inventory_item').first().locator('div.inventory_item_name');
    await expect(firstProductName).toContainText('Test.all');
});