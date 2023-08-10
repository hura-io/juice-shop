import homePage from "./pages/HomePage";
import loginPage from "./pages/LoginPage";
import registerPage from "./pages/RegisterPage";

export function registration(user) {
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
}

export function clearJuiceCookies() {
    cy.clearCookies();
    cy.reload();
}
