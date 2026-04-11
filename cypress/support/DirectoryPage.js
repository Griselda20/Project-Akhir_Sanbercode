class DirectoryPage {
  get menuDirectory() { return cy.contains('Directory'); }
  get employeeNameInput() { return cy.get('input[placeholder="Type for hints..."]'); }
  get jobTitleDropdown() { return cy.get('.oxd-select-text').first(); }
  get locationDropdown() { return cy.get('.oxd-select-text').last(); }
  get searchBtn() { return cy.get('button[type="submit"]'); }
  get resetBtn() { return cy.get('.oxd-button--ghost').contains('Reset'); }
  get recordsFound() { return cy.get('.orangehrm-directory-card'); }
}
export default new DirectoryPage();