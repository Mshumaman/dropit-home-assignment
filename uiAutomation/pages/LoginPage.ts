import BasePage from "./BasePage";

export default class LoginPage extends BasePage {
    private passwordField = '#password';
    private enterButton = '[type="submit"]';
    private mainPageHeader = '[class="announcement-bar__message h5"]'

    public async loginApplication(password: string) {
        await this.page.locator(this.passwordField).fill(password);
        await this.page.locator(this.enterButton).click();
        await this.validateTextContent(this.mainPageHeader, 'Welcome to our store');
    }
}