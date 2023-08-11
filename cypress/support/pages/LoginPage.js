import BasePage from "./BasePage";

class LoginPage extends BasePage{

    visit() { 
        cy.visit('/#/login');
    }

    getNotYetACustomerLink() {
        return cy.get('[href="#/register"]');
    }

    getSuccessRegisterMessageText() {
        return cy.get('span.mat-simple-snack-bar-content');
    }

    getEmailInput(email, isEmpty = true) {
        if(isEmpty){
            return cy.get('#email').type(email);
        } else {
            cy.log('User email is empty, skip entering login name');
        }
    }

    getPasswordInput() {
        return cy.get('#password');
    }

    getLogInButtonInLoginPage() {
        return cy.get('button#loginButton');
    }

    getForgotPasswordLink() {
        return cy.get('a.forgot-pw');
    }

    loginViaUi(user) {
        cy.log("**Entering login data and confirm. . .**")
        this.getEmailInput(user.email);
        this.getPasswordInput().type(user.password);
        this.getLogInButtonInLoginPage().click();
    }

    getFillingLoginFiledMistakeMessage() {
        return cy.get('mat-error.mat-error');
    }

    getInvalidLoginOrEmailMessage() {
        return cy.get('.error');
    }
}
export default new LoginPage;