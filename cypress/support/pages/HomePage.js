import BasePage from "./BasePage.js"

class HomePage extends BasePage {
    visit() {
        cy.visit('/');
    }

    getDismissWelcomeBunnerButton() {
        return cy.get('[aria-label="Close Welcome Banner"]');
    }

    getDismissCookieButton() {
        return cy.get('[aria-label="dismiss cookie message"]');
    }

    closeWelcomeAndCookieBanners() {
        cy.log('**Closing Welcome and Cookie banners. . .**')
        this.getDismissWelcomeBunnerButton().click();
        this.getDismissCookieButton().click();
    }


}
export default new HomePage();