import BasePage from "./BasePage";

export default class ConfirmationPage extends BasePage{
    private confirmationMessage = '[class*="u _1x52f9sp"]';

    public async validateConfirmationMessage(message: string = 'Confirmation') {
        await this.page.locator(this.confirmationMessage).waitFor();
        await this.validateTextContent(this.confirmationMessage, message);
    }
}