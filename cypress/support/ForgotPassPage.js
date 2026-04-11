class ForgotPassPage {
  get usernameInput() { return cy.get('input[name="username"]'); } // Lebih spesifik
  get resetBtn() { return cy.get('button[type="submit"]'); }
  get cancelBtn() { return cy.get('button[type="button"]'); }
  get successTitle() { return cy.get('.orangehrm-forgot-password-title'); }
  get brandingLogo() { return cy.get('.orangehrm-forgot-password-layout-left > img'); } 
}
export default new ForgotPassPage();