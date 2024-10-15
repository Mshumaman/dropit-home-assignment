import BasePage from "./BasePage";

export enum optionsEnum {
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
    So_large_you_cant_eat_it = 'So large you can’t eat it',
    Too_much_for_you_to_handle = 'Too much for you to handle'
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