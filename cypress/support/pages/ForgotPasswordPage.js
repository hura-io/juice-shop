import BasePage from "./BasePage";

class ForgotPasswordPage extends BasePage{
    visit() {
    cy.visit('/#/forgot-password')
    }

    getEmailForgotField() {
        return cy.get('#email');
    }

    getSecurityAnswerFiled() {
        return cy.get('#securityAnswer', { timeout: 5000 });
    }

    getNewPasswordField() {
        return cy.get('#newPassword');
    }

    getNewPasswordReapetField() {
        return cy.get("#newPasswordRepeat");
    }

    getResetPasswordButton() {
        return cy.get('#resetButton');
    }

    getPasswordChangedMessage() {
        return cy.get('.confirmation');
    }
}
export default new ForgotPasswordPage();