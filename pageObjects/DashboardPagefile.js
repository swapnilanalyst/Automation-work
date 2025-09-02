import filters from '../utils/filters';
import tableUtils from '../utils/pagination';

class DashboardPagefile {
  verifyDashboardElements() {
    const elements = [
      'Total Call Duration',
      'Total Connected Call',
      'Number Of Employees',
      'Overall Calls Volumes',
      'Top Caller',
      'Top Dialer',
      'Highest Call Duration',
      'Top Answered',
      'Agent Performance'
    ];

    elements.forEach(text => {
      cy.contains(text, { matchCase: false }).should('exist');
    });

    cy.contains('Most Active Hour By Calls').should('exist');
    cy.get('.col-md-3 > .card').should('exist');
    tableUtils.verifyTableTitle('Agent Performance');
    tableUtils.verifyTableRowData();
  }

  verifySidebarMenu() {
    cy.get('.sidebar-background').should('exist');
  }

  verifyHeaderMenu() {
    cy.get('.header-menu').should('exist');
  }

  applyDashboardFilters(team, employee, fromDate, toDate) {
    filters.selectTeam(team);
    filters.selectEmployee(employee);
    filters.selectDateRange(fromDate, toDate);
  }
}

export default new DashboardPagefile();
