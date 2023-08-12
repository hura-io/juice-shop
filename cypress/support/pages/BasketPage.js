import BasePage from "./BasePage";


class BasketPage extends BasePage{

    visit() {
        cy.visit('/#/basket')
    }

    getCheckOutButton() {
       return cy.get('button#checkoutButton', {timeout: 10000});
    }
}
export default new BasketPage;