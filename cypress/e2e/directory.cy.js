import DirectoryPage from '../support/DirectoryPage';
import LoginPage from '../support/LoginPage';

describe('Directory Functionality', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/directory/employees*').as('getDir');
    cy.visit('https://opensource-demo.orangehrmlive.com/');
    LoginPage.login('Admin', 'admin123');
    DirectoryPage.menuDirectory.click();
  });

  it('TC-20: Search by Valid Name', () => {
    DirectoryPage.employeeNameInput.type('Odis');
    
    cy.get('.oxd-autocomplete-dropdown', { timeout: 10000 })
      .should('be.visible')
      .children()
      .first()
      .click();

    DirectoryPage.searchBtn.click();
    
    cy.wait('@getDir').its('response.statusCode').should('eq', 200);
  });

  it('TC-21: Filter by Job Title', () => {
    DirectoryPage.jobTitleDropdown.click();
    cy.contains('Account Assistant').click();
    DirectoryPage.searchBtn.click();
    cy.get('.oxd-table-filter-area').should('be.visible');
  });

  it('TC-22: Filter by Location', () => {
    DirectoryPage.locationDropdown.click();
    cy.contains('New York Sales Office').click();
    DirectoryPage.searchBtn.click();
    DirectoryPage.recordsFound.should('exist');
  });

  it('TC-23: Reset Filter', () => {
    DirectoryPage.jobTitleDropdown.click();
    cy.get('.oxd-select-dropdown').contains('Chief Executive Officer').click();
    
    DirectoryPage.resetBtn.should('be.visible').click();
    
    DirectoryPage.jobTitleDropdown.should('contain', '-- Select --');
  });

  it('TC-24: Verify Directory Breadcrumb', () => {
    cy.get('.oxd-topbar-header-breadcrumb').should('contain', 'Directory');
  });

  it('TC-25: Intercept Data on Search', () => {
    DirectoryPage.searchBtn.click();
    cy.wait('@getDir').then((res) => { expect(res.response.body).to.not.be.null; });
  });

  it('TC-26: Verify Employee Card UI', () => {
    DirectoryPage.searchBtn.click();
    DirectoryPage.recordsFound.first().within(() => {
      cy.get('.orangehrm-directory-card-header').should('be.visible');
    });
  });

  it('TC-27: Side Menu Active State', () => {
    cy.get('.oxd-main-menu-item.active').should('contain', 'Directory');
  });

  it('TC-28: Multiple Filters Search', () => {
    DirectoryPage.jobTitleDropdown.click();
    cy.contains('HR Manager').click();
    DirectoryPage.locationDropdown.click();
    cy.contains('Texas R&D').click();
    DirectoryPage.searchBtn.click();
    cy.get('.oxd-text--span').should('be.visible');
  });
});