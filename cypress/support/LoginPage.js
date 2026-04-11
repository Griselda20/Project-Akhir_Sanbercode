class LoginPage {
  get usernameInput() { return cy.get('input[name="username"]'); }
  get passwordInput() { return cy.get('input[name="password"]'); }
  get loginBtn() { return cy.get('button[type="submit"]'); }
  get errorMessage() { return cy.get('.oxd-alert-content'); }
  get forgotPassLink() { return cy.get('.orangehrm-login-forgot > .oxd-text'); }
  get userDropdown() { return cy.get('.oxd-userdropdown-tab'); }
  get logoutBtn() { return cy.contains('Logout'); }

  login(username, password) {
    if(username) this.usernameInput.type(username);
    if(password) this.passwordInput.type(password);
    this.loginBtn.click();
  }
}
export default new LoginPage();