import BasePage from "./BasePage";


class DeliveryMethodPage extends BasePage{
    visit() {
        cy.visit('/#/delivery-method');
    }

    chooseADeliveryMethod(method = '1 Days') {
        cy.get('mat-cell').contains(`${method}`).click();
    }

    getContinueButton() {
        return cy.get('[aria-label="Proceed to delivery method selection"]');
    }
}
export default new DeliveryMethodPage;