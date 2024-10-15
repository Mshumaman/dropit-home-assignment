import BasePage from "./BasePage";

export default class CheckoutPage extends BasePage{
    private emailOrMobileField = '[id="email"]';
    private firstNameField = '[id="TextField0"]';
    private lastNameField = '[id="TextField1"]';
    private addressField = '[id="TextField2"]';
    private cityField = '[id="TextField5"]';
    private carNumberField = 'iframe[name*="card-fields-number-"]';
    private cardExpirationField = 'iframe[name*="card-fields-expiry-"]';
    private cardCvvField = 'iframe[name*="card-fields-verification_value-"]';
    private nameOnCardField = 'iframe[name*="card-fields-name-"]';
    private payNowButton = '[id="checkout-pay-button"]';


    public async fillPersonalDetails(emailOrMobile: string, firstName: string, lastName: string, address: string, city: string) {
        await this.page.locator(this.emailOrMobileField).fill(emailOrMobile);
        await this.page.locator(this.firstNameField).fill(firstName);
        await this.page.locator(this.lastNameField).fill(lastName);
        await this.page.locator(this.addressField).fill(address);
        await this.page.locator(this.cityField).fill(city);
    }

    public async fillCreditCardDetails(cardNumber: string, cardExpiration: string, cardCvv: string, nameOnCard: string) {
        // wait for iframe to fully load
        const iframeElement = await this.page.waitForSelector('iframe');
        const iframe = await iframeElement.contentFrame();
        await iframe.waitForLoadState('load');

        await this.page.locator(this.carNumberField).contentFrame().getByPlaceholder('Card number').fill(cardNumber);
        await this.page.locator(this.cardExpirationField).contentFrame().getByPlaceholder('Expiration date (MM / YY)').fill(cardExpiration);
        await this.page.locator(this.cardCvvField).contentFrame().getByPlaceholder('Security code').fill(cardCvv);
        await this.page.locator(this.nameOnCardField).contentFrame().getByLabel('Name on card').fill(nameOnCard);
    }

    public async clickOnPayNowButton() {
        await this.page.locator(this.payNowButton).click();
    }
}