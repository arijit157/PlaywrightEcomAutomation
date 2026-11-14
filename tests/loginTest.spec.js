const { test } = require('@playwright/test');
const { LoginPage } = require('./pageobjects/LoginPage');

test('Login test with valid credentials', async({ page }) => {
  let loginPage = new LoginPage(page);
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.logout();
});

test('Login test with invalid credentials', async({ page }) => {
  let loginPage = new LoginPage(page);
  await loginPage.login('standard_user', 'Test@123');
});