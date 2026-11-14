const { expect } = require('@playwright/test');

class LoginPage{
    constructor(page){
        this.page = page;
        this.loginLogo = page.locator('div.login_logo');
        this.username = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.loginBtn = page.locator('#login-button');
        this.firstProduct = page.locator('.inventory_item_name').first();
        this.burgerMenuBtn = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.getByRole('button', { name: 'Logout', exact: true});
        this.errorMsg = page.locator('[data-test="error"]');
    }

    async login(username, password){
        await this.page.goto('');
        await expect(this.loginLogo).toContainText('Swag Labs');
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
        await this.firstProduct.waitFor({ state: 'visible'});
    }

    async logout(){
        await this.burgerMenuBtn.click();
        await this.logoutLink.click();
        await expect(this.loginBtn).toBeVisible();
    }
}

module.exports = { LoginPage }