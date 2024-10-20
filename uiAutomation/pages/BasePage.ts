import {expect, Locator, Page} from "@playwright/test";

export default class BasePage {

    constructor(public page: Page) {
    }


    public async loadApplication(url: string) {
        await this.page.goto(url);
    }


    public async selectFromMultipleChoice(Element: string, value: string) {
        const Options = await this.page.locator(Element).all();
        for (let dropdownOption of Options) {
            const optionText = await dropdownOption.innerText();
            if (optionText.trim() === value) {
                await dropdownOption.click();
                return;
            }
        }
    }

    public async validateTextContent(element: string, expectedText: string) {
        const locator = this.page.locator(element);
        await expect(locator).toContainText(expectedText);
    }

    public async validateElementColor(locator: Locator, cssProperty: string, expectedColor: string) {
        const actualColor = await locator.evaluate((el, property) => {
            return window.getComputedStyle(el).getPropertyValue(property);
        }, cssProperty);
        expect(actualColor).toEqual(expectedColor);
    }

}