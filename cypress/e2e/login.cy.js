import LoginPage from '../support/LoginPage';

describe('Login Functionality', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false; // Mencegah Cypress gagal karena error internal aplikasi
  });

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/');
  });

  it('TC-01: Login Success', () => {
    LoginPage.login('Admin', 'admin123');
    cy.url().should('include', '/dashboard');
  });

  it('TC-02: Invalid Password', () => {
    LoginPage.login('Admin', 'salah123');
    LoginPage.errorMessage.should('be.visible');
  });

  it('TC-03: Invalid Username', () => {
    LoginPage.login('UserSalah', 'admin123');
    LoginPage.errorMessage.should('be.visible');
  });

  it('TC-04: Empty Fields', () => {
    LoginPage.loginBtn.click();
    cy.get('.oxd-input-group__message').should('have.length', 2);
  });

  it('TC-05: Empty Password Only', () => {
    LoginPage.usernameInput.type('Admin');
    LoginPage.loginBtn.click();
    cy.get('.oxd-input-group__message').should('contain', 'Required');
  });

  it('TC-06: Empty Username Only', () => {
    LoginPage.passwordInput.type('admin123');
    LoginPage.loginBtn.click();
    cy.get('.oxd-input-group__message').should('contain', 'Required');
  });

  it('TC-07: Verify Login Page UI', () => {
    cy.get('.orangehrm-login-title').should('have.text', 'Login');
  });

  it('TC-08: Case Sensitive Password', () => {
    LoginPage.login('Admin', 'ADMIN123');
    LoginPage.errorMessage.should('be.visible');
  });

  it('TC-09: Success Logout', () => {
    LoginPage.login('Admin', 'admin123')
    cy.url().should('include', '/dashboard'); 
    
    LoginPage.userDropdown.click();
    LoginPage.logoutBtn.click();
    
    cy.url().should('include', '/auth/login');
    cy.get('.orangehrm-login-title').should('be.visible');
  });
  it('TC-10: Verify Forgot Password Link visibility', () => {
    LoginPage.forgotPassLink.should('be.visible');
  });
});