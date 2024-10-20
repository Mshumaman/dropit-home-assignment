import BasePage from "./BasePage";

export enum optionsEnum {
    SMALL = 'Small',
    MEDIUM = 'Medium',
    LARGE = 'Large',
    SO_LARGE_YOU_CANT_EAT_IT = 'So large you can\'t eat it',
    TOO_MUCH_FOR_YOU_TO_HANDLE = 'Too much for you to handle'
}

export default class ProductPage extends BasePage {

    private quantityField = '#Quantity-template--15463406600416__main';
    private addToCartButton = '[class*="submit"]';
    private optionsLocator = '[for*="main-"]';

    public async selectSize(size: optionsEnum) {
        await this.selectFromMultipleChoice(this.optionsLocator, size);
    }

    public async setQuantity(quantity: string) {
        await this.page.locator(this.quantityField).fill(quantity);
    }

    public async addItemToCart() {
        await this.page.locator(this.addToCartButton).click();
    }
}