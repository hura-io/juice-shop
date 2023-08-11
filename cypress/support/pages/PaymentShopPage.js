import BasePage from "./BasePage";



class PaymentShopPage extends BasePage{

    getPaymentOption() {
        return cy.get('mat-panel-title');
    }

    fillInCardNameInput(cardName) {
        return cy.get('.mat-input-element.mat-form-field-autofill-control').eq(1).type(cardName);
    }

    getCardNumberInput() {
        return cy.get('[type="number"]');
    }

    getExpiryMonthSelect() {
        return cy.get('#mat-input-18');
    }

    getExpiryYearSelect() {
        return cy.get('select#mat-input-19');
    }

    fillCardDetaild(cardData) {
        this.fillInCardNameInput(cardData.name);
        this.getCardNumberInput().type(cardData.number);
        this.getExpiryMonthSelect().select(cardData.expiryMonth);
        this.getExpiryYearSelect().select(cardData.expiryYear);
        
    }

    getSubmitButton() {
        return cy.get('#submitButton');
    }
    
    getAddedPaymentOption() {
        return cy.get('input.mat-radio-input');
    }

    getContinueButton() {
        return cy.get('[aria-label="Proceed to review"]');
    }
}
export default new PaymentShopPage;