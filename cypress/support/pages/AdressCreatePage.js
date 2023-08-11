import BasePage from "./BasePage";



class AdressSelectPage extends BasePage{
    getCountryInput() {
        return cy.get('[placeholder="Please provide a country."]');
    }

    getNameInput() {
        return cy.get('[placeholder="Please provide a name."]');
    }

    getMobileNumberInput() {
        return cy.get('[placeholder="Please provide a mobile number."]');
    }

    getZipCodeInput() {
        return cy.get('[placeholder="Please provide a ZIP code."]');
    }

    getAdressTextArea() {
        return cy.get('#address');
    }

    getCityInput() {
        return cy.get('[placeholder="Please provide a city."]');
    }

    getStateInput() {
        return cy.get('[placeholder="Please provide a state."]');
    }

    fillAdressForm(adress) {
        this.getCountryInput().type(adress.country);
        this.getNameInput().type(adress.name);
        this.getMobileNumberInput().type(adress.mobileNumber);
        this.getZipCodeInput().type(adress.zipCode);
        this.getAdressTextArea().type(adress.userAdress);
        this.getCityInput().type(adress.city);
        this.getStateInput().type(adress.state);
    }

    getSubmitButton() {
        return cy.get('button#submitButton');
    }
}
export default new AdressSelectPage;