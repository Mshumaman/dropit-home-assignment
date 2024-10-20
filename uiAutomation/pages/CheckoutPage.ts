import BasePage from "./BasePage";
import {expect} from "@playwright/test";

export default class CheckoutPage extends BasePage {
    private emailOrMobileField = '[id="email"]';
    private firstNameField = '[placeholder="First name (optional)"]';
    private lastNameField = '[placeholder="Last name"]';
    private addressField = '[placeholder="Address"]';
    private cityField = '[placeholder="City"]';
    private carNumberField = 'iframe[name*="card-fields-number-"]';
    private cardExpirationField = 'iframe[name*="card-fields-expiry-"]';
    private cardCvvField = 'iframe[name*="card-fields-verification_value-"]';
    private nameOnCardField = 'iframe[name*="card-fields-name-"]';
    private payNowButton = '[id="checkout-pay-button"]';
    private invalidEmailMessage = '#error-for-email';
    private invalidCreditCardMessage = '#error-for-number';
    private countryOrRegionDropDown = '[name="countryCode"]';
    private shippingCalculation = '[class*="_19gi7ytn _19gi7ytj"]';
    private emailBorderSelector = '[class*="_7ozb2u7"]';
    private totalAmountSelector = '[class*="w _19gi7yt2 n"]';


    public async fillPersonalDetails(emailOrMobile: string, firstName: string, lastName: string, address: string, city: string) {
        await this.fillEmailOrMobile(emailOrMobile);
        await this.page.locator(this.firstNameField).fill(firstName);
        await this.page.locator(this.lastNameField).fill(lastName);
        await this.page.locator(this.addressField).fill(address);
        await this.page.locator(this.cityField).fill(city);
    }

    public async selectCountryOrRegion(country: string = 'IL'){
        await this.page.locator(this.countryOrRegionDropDown).selectOption(country);
    }

    public async fillEmailOrMobile(emailOrMobile: string) {
        await this.page.locator(this.emailOrMobileField).fill(emailOrMobile);
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
        await this.page.locator(this.shippingCalculation).waitFor({state: 'hidden'});
        await this.page.locator(this.payNowButton).click();
    }

    public async validateInvalidEmailMessage() {
        await this.validateTextContent(this.invalidEmailMessage, 'Enter a valid email');
    }

    public async validateInvalidEmailFieldColor() {
        await this.validateElementColor(this.page.locator(this.invalidEmailMessage), 'color', 'rgb(221, 29, 29)');
        await this.validateElementColor(this.page.locator(this.emailBorderSelector), 'border-bottom-color', 'rgb(221, 29, 29)');
    }

    public async validateInvalidCreditCardFieldColor() {
        await this.validateElementColor(this.page.locator(this.invalidCreditCardMessage), 'color', 'rgb(221, 29, 29)');
    }

    public async validateInvalidCreditCard() {
        await expect(this.page.locator(this.invalidCreditCardMessage)).toContainText('Enter a valid card number');
    }

    public async validateOrderBlocked() {
        const initialUrl = this.page.url();
        await this.clickOnPayNowButton();
        expect(this.page.url()).toEqual(initialUrl);
    }

    public async validateTotalAmount(totalAmount: string) {
        await this.page.locator(this.shippingCalculation).waitFor({state: 'hidden'});
        await this.validateTextContent(this.totalAmountSelector, totalAmount);
    }
}