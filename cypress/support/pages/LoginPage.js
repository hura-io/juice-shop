import BasePage from "./BasePage";

class LoginPage extends BasePage{
    getNotYetACustomerLink() {
        return cy.get('[href="#/register"]');
    }

    getSuccessRegisterMessageText() {
        return cy.get('span.mat-simple-snack-bar-content');
    }
}
export default new LoginPage;