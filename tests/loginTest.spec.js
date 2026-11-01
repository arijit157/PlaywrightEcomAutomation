const { test, expect } = require('@playwright/test');

test('Login test with valid credentials', async({ page }) => {
  await page.goto('');
  await expect(page.locator('div.login_logo')).toContainText('Swag Labs');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await page.locator('.inventory_item_name').first().waitFor({ state: 'visible'});
  await page.locator('#react-burger-menu-btn').click();
  await page.getByRole('button', { name: 'Logout', exact: true}).click();
  await expect(page.locator('#login-button')).toBeVisible();
});

test('Login test with invalid credentials', async({ page }) => {
  await page.goto('');
  await expect(page.locator('div.login_logo')).toContainText('Swag Labs');
  await page.getByPlaceholder('Username').fill('john.price@activision.com');
  await page.getByPlaceholder('Password').fill('cpt_price_141');
  await page.locator('#login-button').click();
  await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
});