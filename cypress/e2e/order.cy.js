import { findProductByName } from "../support/helper";
import { registration } from "../support/helper";
import { faker } from '@faker-js/faker';
import { clearJuiceCookies } from '../support/helper';
import basketPage from "../support/pages/BasketPage";
import loginPage from "../support/pages/LoginPage";
import user from "../fixtures/user.json"
import adress from "../fixtures/adress.json"
import cardData from "../fixtures/adress.json"
import homePage from "../support/pages/HomePage";
import adressSelectPage from "../support/pages/AdressSelectPage";
import adressCreatePage from "../support/pages/AdressCreatePage";
import deliveryMethodPage from "../support/pages/DeliveryMethodPage";
import paymentShopPage from "../support/pages/PaymentShopPage";
import orderSummuryPage from "../support/pages/OrderSummuryPage";

//update data for user registration
user.email = faker.internet.email();
user.password = faker.internet.password();
user.reapetPassword = user.password;
user.answer = faker.string.alphanumeric({ length: { min: 5, max: 10 } })

//update data for Add new Adress
adress.country = faker.location.country();
adress.name = faker.person.fullName();
adress.mobileNumber = faker.phone.number('095#######');
adress.zipCode = faker.location.countryCode();
adress.userAdress = faker.location.streetAddress();
adress.city = faker.location.city();
adress.state = faker.location.state()

//update card data for Add new card
cardData.name = adress.name;
cardData.number = faker.finance.creditCardNumber('1###############');
cardData.expiryMonth = faker.number.int({ min: 1, max: 12 });
cardData.expiryYear = faker.number.int({ min: 2080, max: 2099 });

before (() => {
    registration(user);
    clearJuiceCookies();
})

beforeEach (() => {
    loginPage.visit();
    homePage.closeWelcomeAndCookieBanners();
    loginPage.loginViaUi(user);
})

describe ("Order tests", () => {
    it("Making an order by name / using helper function", ()=> {
        let itemName = 'OWASP Juice Shop Sticker Page'

        cy.log("**Getting an item and openning basket. . .**")
        findProductByName(itemName);
        homePage.getYourBasketButton().click();
        basketPage.getYourBasketButton().click();
        basketPage.getCheckOutButton().click();

        cy.log("**Adding a new user adress and submitting. . .**")
        adressSelectPage.getAddNewAdressButton().click();
        adressCreatePage.fillAdressForm(adress);
        adressCreatePage.getSubmitButton().click()
        adressSelectPage.selectAnAdress(adress.country);
        adressSelectPage.getContinueButton().click();

        cy.log("**Setting delivery options and submitting. . .**")
        deliveryMethodPage.chooseADeliveryMethod(); // "1 Days" value as default. Also, you can pass values to the function: "3 Days" and "5 Days"
        deliveryMethodPage.getContinueButton().click();

        cy.log("**Setting payment options and submitting. . .**")
        paymentShopPage.getPaymentOption().contains(' Add new card ').click();
        paymentShopPage.fillCardDetails(cardData);
        paymentShopPage.getSubmitButton().click();
        paymentShopPage.getAddedPaymentOption().parent().click();
        paymentShopPage.getContinueButton().click();

        cy.log("**Confirming order. . .**")
        orderSummuryPage.checkTheCard(cardData.number);
        orderSummuryPage.getItemName().should('contain', ` ${itemName} `);
        orderSummuryPage.getPlaceOrderAndPayButton().click()

        orderSummuryPage.getOrderConfirmation().should('contain', 'Thank you for your purchase!');
        
    })

    it("Write a review for Item", ()=> {
        let reviewText = faker.lorem.lines(1);
        // user.email = faker.internet.email();
        homePage.visit();
        
        cy.log("**Openning item's info. . .**")
        homePage.getItem('Apple Pomace').click();
        
        cy.log("**Leaving a review. . .**")
        homePage.getReviewTextArea().type(reviewText, {force: true});
        homePage.getReviewSubmitButton().click();

        cy.log("**Checking the left review. . .**")
        homePage.getReviewsPanel().click();
        homePage.getLastReviewText(user.email).should('have.text', `${reviewText}`)
    })
})