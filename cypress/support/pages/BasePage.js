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

    setWelcomeAndCookiesMessageintoCookies(){
        cy.setCookie('cookieconsent_status', 'dismiss');
        cy.setCookie('welcomebanner_status', 'dismiss');
        cy.reload();
    }

    getYourBasketButton() {
        return cy.get('[routerlink="/basket"]');
    }

    getOrderConfirmation() {
        return cy.get('h1.confirmation');
    }

    getSideNavButton() {
        return cy.get('[aria-label="Open Sidenav"]');
    }

    getCustomerFeedbackButton() {
        return cy.get('[routerlink="/contact"]');
    }
}