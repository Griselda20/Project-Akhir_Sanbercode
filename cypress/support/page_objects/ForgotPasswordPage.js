class ForgotPasswordPage {
  resetPassword(username) {
    cy.get('input[name="username"]').type(username);
    cy.get('button[type="submit"]').click();
  }
}
export default new ForgotPasswordPage();