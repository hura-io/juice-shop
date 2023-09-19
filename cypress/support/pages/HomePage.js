import BasePage from "./BasePage.js"

class HomePage extends BasePage {
    visit() {
        cy.visit('/');
    }

    getDismissWelcomeBunnerButton() {
        return cy.get('[aria-label="Close Welcome Banner"]', { timeout: 5000 });
    }

    getDismissCookieButton() {
        return cy.get('[aria-label="dismiss cookie message"]',  { timeout: 5000 });
    }

    closeWelcomeAndCookieBanners() {
        cy.log('**Closing Welcome and Cookie banners. . .**')
        this.getDismissWelcomeBunnerButton().click();
        this.getDismissCookieButton().click();
    }

    getItem(itemName) {
        return cy.get(`[alt="${itemName}"]`);
    }

    getReviewTextArea() {
        return cy.get('[placeholder="What did you like or dislike?"]');
    }

    getReviewSubmitButton() {
        return cy.get('button#submitButton', {timeout: 5000});
    }

    getReviewsPanel() {
        return cy.get('span').contains('Reviews');
    }

    getLastReviewText(userEmail) {
        return cy.get('cite').contains(userEmail).last().next();
    }
}
export default new HomePage();