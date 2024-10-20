import BasePage from "./BasePage";
import {expect} from "@playwright/test";

export enum navBarOptionsEnum {
    Home = 'Home',
    Catalog = 'Catalog',
    Contact = 'Contact'
}

export default class HomePage extends BasePage {

    private headersLocator = '[class*="der__m"]';
    private magnifierIcon = '[class="modal__toggle-open icon icon-search"]';
    private searchField = '#Search-In-Modal';
    private searchButtonInSearchField = '[class="icon icon-search"]';
    private cardInformation = '[class="card-information__text h5"]';
    private productTitle = '[class="product__title"]';
    private cartAmount = '[class="cart-count-bubble"] span';
    private cartNotification = '[id="cart-notification"]'
    private bagIcon = '[class="icon icon-cart"]';

    public async selectFromNavigationBar(navBarOption: navBarOptionsEnum) {
        await this.selectFromMultipleChoice(this.headersLocator, navBarOption);
    }

    public async searchAndSelectProduct(item: string) {
        await this.page.locator(this.magnifierIcon).click();
        await this.page.locator(this.searchField).fill(item);
        await this.page.locator(this.searchButtonInSearchField).click();
        await this.validateTextContent(this.cardInformation, item);
        await this.selectProduct();
        await this.validateTextContent(this.productTitle, item);
    }

    public async selectProduct() {
        await this.page.locator(this.cardInformation).click()
    }

    public async validateProductsInCart(amount: string) {
        await this.page.locator(this.cartNotification).waitFor();
        await expect(this.page.locator(this.cartAmount).first()).toContainText(amount);
    }

    public async clickOnBagIcon() {
        await this.page.locator(this.bagIcon).click();
    }
}