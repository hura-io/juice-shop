import BasePage from "./BasePage";



class AdressSelectPage extends BasePage{
    getAddNewAdressButton() {
        return cy.get('[aria-label="Add a new address"]');
    }

    getSelectAdrtessRadioButton() {
        return cy.get('[type="radio"]');
    }

    getContinueButton() {
        return cy.get('[aria-label="Proceed to payment selection"]');
    }

    selectAnAdress(country) {
        cy.get('mat-cell').contains(`${country}`).click();
    }
}
export default new AdressSelectPage;