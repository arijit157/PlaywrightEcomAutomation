const { expect } = require('@playwright/test');

class CheckoutPage2{
    constructor(page){
        this.page = page;
        this.paymntInfoLbl = page.locator('[data-test="payment-info-label"]');
        this.finishBtn = page.locator('#finish');
        this.orderSuccessMsg = page.locator('h2:has-text("Thank you for your order!")');
    }

    async checkoutStep2(){
        await expect(this.paymntInfoLbl).toContainText('Payment Information');
        await this.finishBtn.click();
        await expect(this.orderSuccessMsg).toBeVisible();
    }
}

module.exports = { CheckoutPage2 }