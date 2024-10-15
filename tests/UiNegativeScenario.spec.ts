import {test} from "@playwright/test";
import BasePage from "../pages/BasePage";
import LoginPage from "../pages/LoginPage";
import HomePage, {navBarOptionsEnum} from "../pages/HomePage";
import ProductPage, {optionsEnum} from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import RandomGenerator from "../Helpers/Randomizer";
import {
    CC_CVV,
    CC_EXPIRY,
    CC_INVALID_NUMBER,
    CC_NAME,
    DROPIT_PASSWORD,
    DROPIT_URL,
    INVALID_EMAIL,
    MAIN_PRODUCT,
    SECONDARY_PRODUCT
} from "../Helpers/TestData";


test.describe('E2E Negative Scenario: Validating Error Handling on Invalid Checkout Inputs', () => {
    let basePage: BasePage;
    let loginPage: LoginPage;
    let homePage: HomePage;
    let productPage: ProductPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;
    let randomizer: RandomGenerator;

    test('Negative E2E Purchase Flow - Invalid Email and Credit Card Validation', async ({page}) => {
        basePage = new BasePage(page);
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        randomizer = new RandomGenerator();

        const randomEmail = randomizer.getRandomMail;
        const randomAddress = randomizer.getRandomAddress;
        const randomCity = randomizer.getRandomCity;
        const randomFirstName = randomizer.getRandomFirstName;
        const randomLastName = randomizer.getRandomLastName;


        await test.step('Navigate to Dropit Application', async () => {
            await page.setViewportSize({width: 1440, height: 900});
            await basePage.loadApplication(DROPIT_URL);

        });

        await test.step('Log in with Valid Credentials', async () => {
            await loginPage.loginApplication(DROPIT_PASSWORD);
        });

        await test.step('Navigate to Catalog from Navigation Bar', async () => {
            await homePage.selectFromNavigationBar(navBarOptionsEnum.Catalog);
        });

        await test.step('Search and Select Dropit Hamburger', async () => {
            await homePage.searchAndSelectProduct(MAIN_PRODUCT);
        });

        await test.step('Add items to Cart: 2 Medium Dropit Hamburgers and 1 Extra Large Hamburger', async () => {
            await selectSizeAndAddToCart(optionsEnum.SMALL, '1');
        });

        await test.step('Search and select Dropit Chips', async () => {
            await homePage.searchAndSelectProduct(SECONDARY_PRODUCT);
        });

        await test.step('Add Chips to Cart', async () => {
            await selectSizeAndAddToCart(optionsEnum.MEDIUM, '1');
        });

        await test.step('Proceed to Checkout from Cart', async () => {
            await homePage.clickOnBagIcon();
            await cartPage.validateCartTitle();
            await cartPage.clickOnCheckoutButton();
        });

        await test.step('Fill in Checkout Information with Invalid Email', async () => {
            await checkoutPage.selectCountryOrRegion();
            await checkoutPage.fillPersonalDetails(INVALID_EMAIL, randomFirstName, randomLastName, randomAddress, randomCity);
            await checkoutPage.validateInvalidEmailMessage();
            await checkoutPage.validateInvalidEmailFieldColor();
            await checkoutPage.fillEmailOrMobile(randomEmail);
        });

        await test.step('Enter Credit Card Details with Invalid Number', async () => {
            await checkoutPage.fillCreditCardDetails(CC_INVALID_NUMBER, CC_EXPIRY, CC_CVV, CC_NAME);
        });

        await test.step('Attempt to Complete Purchase', async () => {
            await checkoutPage.clickOnPayNowButton();
            await checkoutPage.validateInvalidCreditCard();
            await checkoutPage.validateInvalidCreditCardFieldColor();
        });

        await test.step('Validate Order Placement Block', async () => {
            await checkoutPage.validateOrderBlocked();
        });
    });

    async function selectSizeAndAddToCart(size: optionsEnum, quantity: string) {
        await productPage.selectSize(size);
        await productPage.setQuantity(quantity);
        await productPage.addItemToCart();
    }
});
