import { findProductByName } from "../support/helper";
import { registration } from "../support/helper";
import { faker } from '@faker-js/faker';
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
cardData.number = faker.finance.creditCardNumber('################');
cardData.expiryMonth = faker.number.int({ min: 1, max: 12 })
cardData.expiryYear = faker.number.int({ min: 2080, max: 2099 })

before (() => {
    homePage.visit();
    registration(user);
    loginPage.loginViaUi(user);
})

describe ("Order tests", () => {
    it.only("Making an order by name / using helper function", ()=> {
        
        cy.log("**Getting an item and openning basket. . .**")
        findProductByName('OWASP Juice Shop Sticker Page')
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
        deliveryMethodPage.chooseADeliveryMethod(); // "1 Days" value as defauld. Also, you can pass values to the function: "3 Days" and "5 Days"
        deliveryMethodPage.getContinueButton().click();

        cy.log("**Setting payment options and submitting. . .**")
        paymentShopPage.getPaymentOption().contains(' Add new card ').click();
        paymentShopPage.fillCardDetaild(cardData);
        paymentShopPage.getSubmitButton().click();
        paymentShopPage.getAddedPaymentOption().parent().click({force: true});
        paymentShopPage.getContinueButton().click();

        

    })

    it("Write a review for Item", ()=> {
        
    })

    it("Try to make order for Sold out Item ", ()=> {
        
    })

    it("Check bonuses count after purchase", ()=> {
        
    })
})