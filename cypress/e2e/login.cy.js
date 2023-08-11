import user from '../fixtures/user.json';
import loginPage from '../support/pages/LoginPage';
import homePage from '../support/pages/HomePage';
import { registration } from '../support/helper';
import { clearJuiceCookies } from '../support/helper';
import { faker } from '@faker-js/faker';
import forgotPasswordPage from '../support/pages/ForgotPasswordPage';

user.email = faker.internet.email();
user.password = faker.internet.password();
user.reapetPassword = user.password;
user.answer = faker.string.alphanumeric({ length: { min: 5, max: 10 } })

before(() => {
    cy.log("**User registration before Login tests and Clearing Cookies. . .")
    registration(user);
    clearJuiceCookies();
})

describe("Login Positive cases", () => {

    it("Success login", () => {
        loginPage.visit()
        homePage.closeWelcomeAndCookieBanners()

        cy.log("**Loginning. . .**");
        loginPage.loginViaUi(user)

        cy.log("**Confirmation the success login. . .**");
        homePage.getAccountButton().click();
        homePage.getUserProfileButton().should('contain', ` ${user.email} `)
    })

    it("Forgot your password link test", () => {
        user.password = faker.internet.password();
        loginPage.visit();
        homePage.closeWelcomeAndCookieBanners();

        cy.log("**Going to Forgot Password page. . .**");
        loginPage.getForgotPasswordLink().click({ force: true });

        cy.log("**Filling the form and confirm. . .**");
        forgotPasswordPage.getEmailForgotField().type(user.email);
        forgotPasswordPage.getSecurityAnswerFiled().type(user.answer);
        forgotPasswordPage.getNewPasswordField().type(user.password);
        forgotPasswordPage.getNewPasswordReapetField().type(user.password);
        forgotPasswordPage.getResetPasswordButton().click();

        cy.log("**Confirming changes. . .");
        forgotPasswordPage.getPasswordChangedMessage().should('contain', ' Your password was successfully changed. ');

        loginPage.visit();
        homePage.closeWelcomeAndCookieBanners;
        loginPage.loginViaUi(user);
    })

    it("Remember me button test", () => {
        loginPage.visit();
        homePage.closeWelcomeAndCookieBanners();
        
        cy.log("**Entering login data and confirm. . .**")
        loginPage.getEmailInput(user.email);
        loginPage.getPasswordInput().type(user.password);
        
        cy.log("**Checking the 'Remember me' checkbox and. . .**")
        cy.get('#rememberMe-input').check({force: true});
        loginPage.getLogInButtonInLoginPage().click();

        cy.log("**Checking the LocalStorage for user email data. . .**")
        cy.getAllLocalStorage().then((result) => {
            expect(result).to.deep.equal({
              'https://juice-shop-sanitarskyi.herokuapp.com': {
                email: `${user.email}`,
              },
            })
          })
    })

})

describe("Login Negative cases", () => {
    it("Login attempt with empty Email field", () => {
        
        loginPage.visit();
        homePage.closeWelcomeAndCookieBanners();

        loginPage.getEmailInput(user.email, false)
        loginPage.getPasswordInput().type(user.password);

        cy.log("**Checking that Login button is disabled");
        loginPage.getLogInButtonInLoginPage().should('be.disabled')
    })

    it("Login attempt with wrong password", () => {
        user.password = faker.internet.password();

        loginPage.visit();
        homePage.closeWelcomeAndCookieBanners();

        cy.log("**Filling Login form and confirm. . .**");
        loginPage.getEmailInput(user.email);
        loginPage.getPasswordInput().type(user.password);
        loginPage.getLogInButtonInLoginPage().click()

        cy.log("**Checking that loginning is impossible ");
        loginPage.getInvalidLoginOrEmailMessage().should('contain', 'Invalid email or password.')
            .invoke('css', 'color').should('be.eq', 'rgb(255, 87, 34)');
    })
})