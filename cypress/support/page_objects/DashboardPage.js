class DashboardPage {
  clickDirectory() {
    cy.contains('span', 'Directory').click();
  }

  searchDirectory(name) {
    cy.get('.oxd-autocomplete-text-input > input').type(name);
    cy.get('button[type="submit"]').click();
  }
}
export default new DashboardPage();