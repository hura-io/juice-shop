export default class BasePage {

    getAccountButton() {
        cy.log('**Opening account menu with Login button. . .**');
        return cy.get('#navbarAccount');
    }

    getLoginButton() {
        return cy.get('#navbarLoginButton');
    }

    getUserProfileButton() {
        return cy.get('button[aria-label="Go to user profile"] span');
    }
}