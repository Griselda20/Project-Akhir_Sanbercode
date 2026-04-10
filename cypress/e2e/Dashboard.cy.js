import LoginPage from '../support/page_objects/LoginPage';
import DashboardPage from '../support/page_objects/DashboardPage';

describe('Dashboard Directory Tests with Intercept', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/directory/employees*').as('getDirectory');
    LoginPage.visit();
    LoginPage.login('Admin', 'admin123');
  });

  it('Memvalidasi data directory termuat (Intercept)', () => {
    DashboardPage.clickDirectory();
    cy.wait('@getDirectory').its('response.statusCode').should('eq', 200);
    cy.get('.oxd-table-card').should('have.length.at.least', 1);
  });

  it('Cari karyawan di directory', () => {
    DashboardPage.clickDirectory();
    cy.intercept('GET', '**/directory/employees?**').as('searchEmployee');
    DashboardPage.searchDirectory('Peter');
    cy.wait('@searchEmployee');
    cy.get('.oxd-table-card').should('contain', 'Peter');
  });
});