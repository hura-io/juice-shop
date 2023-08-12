import BasePage from "./BasePage";

class ForgotPasswordPage extends BasePage{
    visit() {
    cy.visit('/#/contact')
    }

    getCommentTextArea() {
        return cy.get('#comment');
    }

    getRatingSlider() {
        return cy.get('[role="slider"]');
    }

    getSliderThump() {
        return cy.get('div.mat-slider-thumb');
    }

     passTheCaptcha() {
        cy.get("body").find('#captcha').invoke('text').then((text) => {
            cy.get("#captchaControl").type(eval(text));
        });
     }

     getSubmitFeedbackButton() {
        return cy.get('button#submitButton');
     }

}
export default new ForgotPasswordPage();