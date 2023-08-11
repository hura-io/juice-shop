import user from '../fixtures/user.json'
import {faker} from '@faker-js/faker'
import homePage from '../support/pages/HomePage'
import loginPage from '../support/pages/LoginPage';
import registerPage from '../support/pages/RegisterPage';

user.email = faker.internet.email();
user.password = faker.internet.password();
user.reapetPassword = user.password;
user.answer = faker.string.alphanumeric({ length: { min: 5, max: 10 } })

describe('Registration positive cases', () => {

  it('Succesfull registration', () => {
    homePage.visit();
    homePage.closeWelcomeAndCookieBanners()
    
    cy.log("** Getting the registration form . . .**");
    homePage.getAccountButton().click();
    homePage.getLoginButton().click();
    loginPage.getNotYetACustomerLink().click();

    cy.log('**Filling the registration form. . .**');
    registerPage.fillInRegisterForm(user);
    registerPage.chooseTheSecurityQuestion();

    cy.log('** Confirm registration. . .**');
    registerPage.getRegisterButton().click();

    cy.log('**Checking the successful registration. . .**');
    loginPage.getSuccessRegisterMessageText().should('be.visible').and('contain', "Registration completed successfully. You can now log in.");

    cy.log("**Loginnig as created user. . .**")
    loginPage.loginViaUi(user)

  })

  it("Registration attempt with the different password in the 'Reapet password' field ", () => {
    cy.log('Update user data');
    user.reapetPassword = faker.internet.password();

    homePage.visit();
    homePage.closeWelcomeAndCookieBanners()
    
    cy.log("** Getting the registeration form . . .**");
    homePage.getAccountButton().click();
    homePage.getLoginButton().click();
    loginPage.getNotYetACustomerLink().click();

    cy.log('**Filling the registration form. . .**');
    registerPage.fillInRegisterForm(user);
    registerPage.chooseTheSecurityQuestion();

    cy.log('**Checking an mistake during the registration. . .**');
    registerPage.getFillingFiledMistakeMessage().should('contain', ' Passwords do not match ')
    .invoke('css', 'color').should('be.eq', 'rgb(255, 87, 34)');

    registerPage.getRegisterButton().should('be.disabled');
  })

  it("Registration attempt when password is shorter than 5 characters  ", () => {
    cy.log('Update user data');
    user.password = faker.internet.password({length: 4});
    user.reapetPassword = user.password

    homePage.visit();
    homePage.closeWelcomeAndCookieBanners()
    
    cy.log("** Getting the registeration form . . .**");
    homePage.getAccountButton().click();
    homePage.getLoginButton().click();
    loginPage.getNotYetACustomerLink().click();

    cy.log('**Filling the registration form. . .**');
    registerPage.fillInRegisterForm(user);
    registerPage.chooseTheSecurityQuestion();

    cy.log('**Checking an mistake during the registration. . .**');
    registerPage.getFillingFiledMistakeMessage().should('contain', 'Password must be 5-40 characters long. ')
    .invoke('css', 'color').should('be.eq', 'rgb(255, 87, 34)');

    registerPage.getRegisterButton().should('be.disabled');
  })

  it("Registration attempt with empty 'Answer' field", () => {
    cy.log('Update user data');
    user.answer = "{leftArrow}"

    homePage.visit();
    homePage.closeWelcomeAndCookieBanners()
    
    cy.log("** Getting the registeration form . . .**");
    homePage.getAccountButton().click();
    homePage.getLoginButton().click();
    loginPage.getNotYetACustomerLink().click();

    cy.log('**Filling the registration form. . .**');
    registerPage.fillInRegisterForm(user);
    registerPage.chooseTheSecurityQuestion();

    cy.log('**Checking an mistake during the registration. . .**');
    registerPage.getFillingFiledMistakeMessage().should('contain', ' Please provide an answer to your security question. ')
    .invoke('css', 'color').should('be.eq', 'rgb(255, 87, 34)');

    registerPage.getRegisterButton().should('be.disabled');
  })

  it("Check the Advice icons changing according to the entered lowercased password", () => {
    user.password = faker.string.alpha({ length: 6, casing: "lower"})
    user.reapetPassword = user.password

    homePage.visit();
    homePage.closeWelcomeAndCookieBanners()
    
    cy.log("** Getting the registeration form . . .**");
    homePage.getAccountButton().click();
    homePage.getLoginButton().click();
    loginPage.getNotYetACustomerLink().click();

    cy.log('**Filling the registration form. . .**');
    registerPage.fillInRegisterForm(user);
    registerPage.chooseTheSecurityQuestion();

    registerPage.getPasswordAdviceSwitcher().click();
    registerPage.getAdviceForPassword().first().should('have.text', "done");
  })
})