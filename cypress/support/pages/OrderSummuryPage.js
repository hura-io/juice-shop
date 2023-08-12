
import BasePage from "./BasePage";


class BasketPage extends BasePage{

    visit() {
        cy.visit('/#/order-summary')
    }

    getCheckOutButton() {
       return cy.get('button#checkoutButton');
    }
}
export default new BasketPage;