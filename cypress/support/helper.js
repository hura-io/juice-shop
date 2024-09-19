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
    registerPage.getRegisterButton().click({force: true});
}

export function clearJuiceCookies() {
    cy.clearCookies();
    cy.reload();
}

export function findProductByName(productName) {
    cy.get('mat-grid-list.mat-grid-list').then(page => {
        if (page.find(`[alt="${productName}"]`).length > 0){
            cy.get(`[alt="${productName}"]`).parentsUntil('mat-card').next().eq(1).click();
        } else {
            cy.get('[aria-label="Next page"]').click();
            findProductByName(productName);
        }
    })
}

