import BasePage from "./BasePage";

export default class CartPage extends BasePage {
    private cartTitle = '[class="title title--primary"]';
    private checkoutButton = '[id="checkout"]';

    public async validateCartTitle(title: string = 'Your cart') {
        await this.validateTextContent(this.cartTitle, title);
    }

    public async clickOnCheckoutButton() {
        await this.page.locator(this.checkoutButton).click();
    }
}