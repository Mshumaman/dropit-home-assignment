import {test} from "@playwright/test";
import BasePage from "../pages/BasePage";
import LoginPage from "../pages/LoginPage";
import HomePage, {navBarOptionsEnum} from "../pages/HomePage";
import ProductPage, {optionsEnum} from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import RandomGenerator from "../Helpers/Randomizer";
import ConfirmationPage from "../pages/ConfirmationPage";


test.describe('E2E Purchase Flow for Dropit Assignment', () => {
    let basePage: BasePage;
    let loginPage: LoginPage;
    let homePage: HomePage;
    let productPage: ProductPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;
    let randomizer: RandomGenerator;
    let confirmationPage: ConfirmationPage

    test.only('Positive scenario of E2E Purchase Flow', async ({page}) => {
        basePage = new BasePage(page);
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        randomizer = new RandomGenerator();
        confirmationPage = new ConfirmationPage(page);

        const randomEmail = randomizer.getRandomMail;
        const randomAddress = randomizer.getRandomAddress;
        const randomCity = randomizer.getRandomCity;
        const randomFirstName = randomizer.getRandomFirstName;
        const randomLastName = randomizer.getRandomLastName;


        await test.step('Navigate to Dropit Application', async () => {
            await basePage.loadApplication('https://drpt-external-dev.myshopify.com/password');

        });

        await test.step('Log in with valid credentials', async () => {
            await loginPage.loginApplication('giclao');
        });

        await test.step('Navigate to Catalog from Navigation Bar', async () => {
            await homePage.selectFromNavigationBar(navBarOptionsEnum.Catalog);
        });

        await test.step('Search and select Dropit Hamburger', async () => {
            await homePage.searchAndSelectProduct('Dropit Hamburger (QA Automation)');
        });

        await test.step('Add items to Cart: 2 Medium Dropit Hamburgers and 1 Extra Large Hamburger', async () => {
            await selectSizeAndAddToCart(optionsEnum.Medium, '2');
            await selectSizeAndAddToCart(optionsEnum.So_large_you_cant_eat_it, '1');
            await homePage.validateProductsInCart('3');
        });

        await test.step('Search and select Dropit Chips', async () => {
            await homePage.searchAndSelectProduct('Dropit Chips');
        });

        await test.step('Add items to Cart: 2 Large Dropit Chips and 1 Extra Large Chips', async () => {
            await selectSizeAndAddToCart(optionsEnum.Large, '2');
            await selectSizeAndAddToCart(optionsEnum.Too_much_for_you_to_handle, '1');
            await homePage.validateProductsInCart('6');
        });

        await test.step('Proceed to Checkout from Cart', async () => {
            await homePage.clickOnBagIcon();
            await cartPage.validateCartTitle()
            await cartPage.clickOnCheckoutButton();
        });

        await test.step('Fill in Checkout Information', async () => {
            await checkoutPage.fillPersonalDetails(randomEmail, randomFirstName, randomLastName, randomAddress, randomCity);
        });

        await test.step('Enter Credit Card Details', async () => {
            await checkoutPage.fillCreditCardDetails('1', '12/26', '777', 'Bogus Gateway')
        });

        await test.step('Complete Purchase', async () => {
            await checkoutPage.clickOnPayNowButton();
        });

        await test.step('Confirm Successful Purchase', async () => {
            await confirmationPage.validateConfirmationMessage('Confirmation');
            await page.waitForTimeout(5000);
        });
    });

    async function selectSizeAndAddToCart(size: optionsEnum, quantity: string) {
        await productPage.selectSize(size);
        await productPage.setQuantity(quantity);
        await productPage.addItemToCart();
    }
});
