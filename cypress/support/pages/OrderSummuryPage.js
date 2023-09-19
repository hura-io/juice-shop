
import BasePage from "./BasePage";


class BasketPage extends BasePage{

    visit() {
        cy.visit('/#/order-summary')
    }

    checkTheCard(cardNumber) {
        let checkCard = cardNumber.toString().match(/^\d{12}(\d{4})$/, "\\$&")[1];
        cy.get('span').contains('Card ending in').parent().should('have.text', `Card ending in ${checkCard}`);
    }

    getItemName() {
        return cy.get('mat-cell.cdk-column-product.mat-column-product.ng-star-inserted');
    }

    getPlaceOrderAndPayButton() {
        return cy.get('button#checkoutButton');
    }
}
export default new BasketPage;