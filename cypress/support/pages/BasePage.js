export default class BasePage {

    getAccountButton() {
        cy.log('**Opening account menu with Login button. . .**');
        return cy.get('#navbarAccount');
    }

    getLoginButton() {
        return cy.get('#navbarLoginButton');
    }
}