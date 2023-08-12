import loginPage from "../support/pages/LoginPage";
import homePage from "../support/pages/HomePage";
import contactPage from "../support/pages/ContactPage";
import { registration } from '../support/helper';
import user from '../fixtures/user.json';
import { faker } from '@faker-js/faker';



user.email = faker.internet.email();
user.password = faker.internet.password();
user.reapetPassword = user.password;
user.answer = faker.string.alphanumeric({ length: { min: 5, max: 10 } })

before(() => {
    homePage.visit();
    registration(user);
    loginPage.loginViaUi(user);
})

describe("Contact Page", () => {
    it("Fedback form test", () => {
        let commentText = faker.lorem.sentence(5);

        cy.log("**Opening the Customer Feedback page. . .**")
        contactPage.getSideNavButton().click();
        contactPage.getCustomerFeedbackButton().click();

        cy.log("**Filling the Customer Feedback form. . .**")
        contactPage.getCommentTextArea().type(commentText);
        // contactPage.getRatingSlider().invoke('attr', 'aria-valuetext', '5').trigger('change');
        contactPage.getSliderThump().click({force: true, timeout: 5000}).type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}');
        contactPage.passTheCaptcha();

        cy.log("**Confirming the form. . .**")
        contactPage.getSubmitFeedbackButton().click();
    })
})