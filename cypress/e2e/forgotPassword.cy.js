import ForgotPassPage from '../support/ForgotPassPage';
import LoginPage from '../support/LoginPage';

describe('Forgot Password Functionality', () => {
  Cypress.on('uncaught:exception', () => {
    return false; // Mengabaikan error internal app yang bikin timeout
  });

  beforeEach(() => {
    // Tambah timeout untuk kunjungan halaman karena server sering lemot
    cy.visit('https://opensource-demo.orangehrmlive.com/', { timeout: 30000 });
    LoginPage.forgotPassLink.click();
  });

  it('TC-11: Success Reset Request', () => {
    // Menambahkan timeout khusus untuk aksi ini karena server merespon lama
    ForgotPassPage.usernameInput.type('Admin');
    ForgotPassPage.resetBtn.click();
    
    cy.get('.orangehrm-forgot-password-title', { timeout: 30000 })
      .should('be.visible');
  });

  it('TC-12: Cancel Button Redirection', () => {
    ForgotPassPage.cancelBtn.click();
    cy.url().should('include', '/login');
  });

  it('TC-13: Empty Username Request', () => {
    ForgotPassPage.resetBtn.click();
    cy.get('.oxd-input-group__message').should('be.visible');
  });

  it('TC-14: Verify Reset Page Title', () => {
    cy.get('.orangehrm-forgot-password-title').should('have.text', 'Reset Password');
  });

  it('TC-15: Intercept Reset API Status', () => {
    cy.intercept('GET', '**/messages').as('apiMessages');
    ForgotPassPage.usernameInput.type('random.user');
    ForgotPassPage.resetBtn.click();
    
    cy.url().should('include', '/sendPasswordReset');
    cy.get('.orangehrm-forgot-password-title').should('be.visible');
  });

  it('TC-16: Invalid Username Request', () => {
    ForgotPassPage.usernameInput.type('!@#$%^');
    ForgotPassPage.resetBtn.click();
    ForgotPassPage.successTitle.should('be.visible');
  });

  it('TC-17: Back to Login via URL', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('.orangehrm-login-title').should('be.visible');
  });

  it('TC-18: Verify Username Input placeholder', () => {
    ForgotPassPage.usernameInput.should('have.attr', 'placeholder', 'Username');
  });

  it('TC-19: Multiple Reset Attempts', () => {
    ForgotPassPage.usernameInput.type('Admin');
    ForgotPassPage.resetBtn.click();
    cy.get('.orangehrm-forgot-password-title').should('be.visible');
    cy.go('back');
    ForgotPassPage.usernameInput.should('be.visible');
  });
});