import LoginPage from '../support/page_objects/LoginPage';
import ForgotPasswordPage from '../support/page_objects/ForgotPasswordPage';

describe('Login & Forgot Password Tests', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it('Login dengan kredensial valid', () => {
    LoginPage.login('Admin', 'admin123');
    cy.url().should('include', '/dashboard');
  });

  it('Login gagal dengan password salah', () => {
    LoginPage.login('Admin', 'wrong123');
    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials');
  });

  it('Login gagal dengan username kosong', () => {
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-group__message').should('have.text', 'Required');
  });

  it('Reset password dengan username valid', () => {
    LoginPage.clickForgotPassword();
    ForgotPasswordPage.resetPassword('Admin');
    cy.get('.orangehrm-forgot-password-title').should('have.text', 'Reset Password link sent successfully');
  });
});