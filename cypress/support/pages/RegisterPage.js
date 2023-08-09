import BasePage from "./BasePage";

class RegisterPage extends BasePage{
    fillInRegisterForm(user) {
        cy.get('#emailControl').type(user.email);
        cy.get('#passwordControl').type(user.password);
        cy.get('#repeatPasswordControl').type(user.reapetPassword);
        cy.get('#securityAnswerControl').type(user.answer);
    }

    chooseTheSecurityQuestion() {
        cy.get('[name="securityQuestion"]').click();
        cy.get('#mat-option-14').scrollIntoView().should('be.visible').click(); //запитати про цей селект: як краще його дістати та як відрефакторити?
    }

    getRegisterButton() {
        return cy.get('button#registerButton');
    }

    getFillingFiledMistakeMessage() {
        return cy.get('mat-error.mat-error');
    }

    getAnswerFieled() {
        return cy.get('#securityAnswerControl');
    }

    getPasswordAdviceSwitcher() {
        return cy.get('mat-slide-toggle.mat-slide-toggle');
    }

    getAdviceForPassword() {
        return cy.get('mat-icon[color]');
    }
}
export default new RegisterPage;