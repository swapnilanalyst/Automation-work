  // class DashboardPage {
  //   verifyDashboardElements() {
  //     const elementsToCheck = [
  //       'Total Call Duration',
  //       'Total Connected Call',
  //       'Number Of Employees',
  //       'Overall Calls Volumes',
  //       'Top Caller',
  //       'Top Dialer',
  //       'Highest Call Duration',
  //       'Top Answered',
  //       'Agent Performance'
  //     ];

  //     elementsToCheck.forEach((expectedText) => {
  //       cy.contains(expectedText, { matchCase: false })  // case-insensitive match
  //         .should('exist')
  //         .then(($el) => {
  //           const actualText = $el.text().trim();

  //           // Log in Cypress and browser console
  //           if (actualText === expectedText) {
  //             cy.log(`Matched: Expected = "${expectedText}", Actual = "${actualText}"`);
  //             console.log(`Matched: Expected = "${expectedText}", Actual = "${actualText}"`);
  //           } else {
  //             cy.log(`Mismatch: Expected = "${expectedText}", Actual = "${actualText}"`);
  //             console.warn(`Mismatch: Expected = "${expectedText}", Actual = "${actualText}"`);
  //             throw new Error(`Text Mismatch \nExpected: "${expectedText}"\nActual: "${actualText}"`);
  //           }
  //         });
  //     });

  //     // Verify table exists
  //     cy.get('.h-100 > .card-header > .card-title')
  //   .should('have.text', 'Agent Performance') // Verify the exact title
  //   .then((title) => {
  //     cy.log('Table title: ' + title.text());
  //     console.log('Table title:', title.text());
  //   });
  //     cy.get('.salenninja-dashboard-agent-tblemani') // main table container
  //   .should('exist')
  //   .find('[role="table"]') // find the actual table container
  //   .should('exist')
  //   .within(() => {
  //     cy.get('[role="row"]', { timeout: 10000 }) // rows inside table
  //       .should('have.length.greaterThan', 1) // include header + at least 1 data row
  //       .each(($row, index) => {
  //         const text = $row.text().trim();
  //         cy.log(`Row ${index}: ${text}`);
  //         console.log(`Row ${index}:`, text);
  //   });
  //   });

  //   cy.get('.col > .card > .card-header > .card-title')
  //   .should('have.text', 'Most Active Hour By Calls') // Verify the exact title
  //   .then((title) => {
  //     cy.log('Table title: ' + title.text());
  //     console.log('Table title:', title.text());
  //   });
  //   cy.get('.apexcharts-legend-series').should('exist').each(($legend, index) => {
  //     const text = $legend.text().trim();
  //     cy.log(`Legend ${index + 1}: ${text}`);
  //     console.log(`Legend ${index + 1}:`, text);
  //   });
  // };
  // }
  // export default new DashboardPage();
// import CommonElements from './CommonElements';

// class DashboardPage {
//   verifyDashboardElements() {
//     const elementsToCheck = [
//       'Total Call Duration',
//       'Total Connected Call',
//       'Number Of Employees',
//       'Overall Calls Volumes',
//       'Top Caller',
//       'Top Dialer',
//       'Highest Call Duration',
//       'Top Answered',
//       'Agent Performance'
//     ];

//     elementsToCheck.forEach((expectedText) => {
//       cy.contains(expectedText, { matchCase: false })
//         .should('exist')
//         .then(($el) => {
//           const actualText = $el.text().trim();
//           if (actualText === expectedText) {
//             cy.log(`Matched: "${expectedText}"`);
//           } else {
//             throw new Error(`Text Mismatch \nExpected: "${expectedText}"\nActual: "${actualText}"`);
//           }
//         });
//     });

//     // Table check
//     cy.get('.h-100 > .card-header > .card-title').should('have.text', 'Agent Performance');
//     cy.get('.salenninja-dashboard-agent-tblemani').find('[role="table"]').within(() => {
//       cy.get('[role="row"]', { timeout: 10000 }) // rows inside table
//         .should('have.length.greaterThan', 1) // include header + at least 1 data row
//         .each(($row, index) => {
//           const text = $row.text().trim();
//           cy.log(`Row ${index}: ${text}`);
//           console.log(`Row ${index}:`, text);
//         // .each(($row, index) => cy.log(`Row ${index}: ${$row.text().trim()}`));
//         })
//     });

//     CommonElements.verifyPagination('.salenninja-dashboard-agent-tblemani [role="table"]');

//     // Chart legends
//     cy.get('.col > .card > .card-header > .card-title')
//       .should('have.text', 'Most Active Hour By Calls');
//     cy.get('.apexcharts-legend-series').should('exist');
//   }

//   verifyFilters() {
//     CommonElements.verifyDropdown('[placeholder="Select Team"]', 'Select Team');
//     CommonElements.verifyDropdown('[placeholder="Select Employee"]', 'Select Employee');
//   }
// }


// export default new DashboardPage();
import filters from '../support/commonFilters';
import tableUtils from '../support/tableUtils';

class DashboardPage {
  verifyDashboardElements() {
    const elementsToCheck = [
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

    elementsToCheck.forEach((text) => {
      cy.contains(text, { matchCase: false }).should('exist');
    });

    // Table title and content
    tableUtils.verifyTableTitle('Agent Performance');
    // tableUtils.verifyPagination();
    tableUtils.verifyTableRowData();
    testAllDropdownOptions(placeholder, callbackFn)
    
    cy.contains('Most Active Hour By Calls').should('exist');
    cy.get('.apexcharts-legend-series').should('exist');
  }

  applyDashboardFilters(team, employee, fromDate, toDate) {
    filters.selectTeam(team);
    filters.selectEmployee(employee);
    filters.selectDateRange(fromDate, toDate);
  }
}

export default new DashboardPage();
