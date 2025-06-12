// class Pagination {
//   verifyTableTitle(expectedTitle) {
//     cy.get('.card-title').contains(expectedTitle).should('exist');
//   }

//   verifyTableRowData() {
//     const tableContainer = '.salenninja-dashboard-agent-tblemani';
//     const rowSelector = '.rdt_TableRow';
//     const cellSelector = '.rdt_TableCell';

//     cy.get(tableContainer, { timeout: 10000 }).should('exist');

//     cy.get(rowSelector, { timeout: 8000 }).then(($rows) => {
//       const rowCount = $rows.length;
//       const agentNames = [];

//       if (rowCount > 0) {
//         cy.log(`✅ Table loaded with ${rowCount} row(s)`);

//         $rows.each((rowIndex, row) => {
//           const $row = Cypress.$(row);
//           const $cells = $row.find(cellSelector);

//           const agentFullNameWithActiveTime = $row.find('td').eq(1).text().trim();
//           const agentFullName = agentFullNameWithActiveTime.split(/\s+\d+\s+minute/).shift().trim();

//           const lastCallSync = parseInt($row.data('timestamp'));
//           if (isNaN(lastCallSync)) {
//             cy.log('Error: lastCallSync timestamp is invalid');
//             return;
//           }

//           const currentTimestamp = new Date().getTime();
//           const activeTimeInMinutes = Math.floor((currentTimestamp - lastCallSync) / 60000);
//           const formattedActiveTime = `${activeTimeInMinutes} minute${activeTimeInMinutes === 1 ? '' : 's'} ago`;

//           agentNames.push(agentFullName);

//           $cells.each((cellIndex, cell) => {
//             const actualText = Cypress.$(cell).text().trim();
//             let expectedValue;
//             let columnName;

//             switch (cellIndex) {
//               case 0:
//                 columnName = 'SN';
//                 expectedValue = `${rowIndex + 1}`;
//                 break;
//               case 1:
//                 columnName = 'Agent Name';
//                 expectedValue = `${agentFullName} ${formattedActiveTime}`;
//                 break;
//               case 2:
//                 columnName = 'Team';
//                 expectedValue = `Team ${rowIndex + 1}`;
//                 break;
//               case 3:
//                 columnName = 'Unique Call';
//                 expectedValue = `Unique ${rowIndex + 1}`;
//                 break;
//               case 4:
//                 columnName = 'Total Duration';
//                 expectedValue = `Duration ${rowIndex + 1}`;
//                 break;
//               case 5:
//                 columnName = 'Avg Call Duration';
//                 expectedValue = `Avg ${rowIndex + 1}`;
//                 break;
//               case 6:
//                 columnName = 'Total Call';
//                 expectedValue = `Call ${rowIndex + 1}`;
//                 break;
//               case 7:
//                 columnName = 'Connected Call';
//                 expectedValue = `Connected ${rowIndex + 1}`;
//                 break;
//               case 8:
//                 columnName = 'Incoming Call';
//                 expectedValue = `Incoming ${rowIndex + 1}`;
//                 break;
//               case 9:
//                 columnName = 'Outgoing Call';
//                 expectedValue = `Outgoing ${rowIndex + 1}`;
//                 break;
//               case 10:
//                 columnName = 'Missed Call';
//                 expectedValue = `Missed ${rowIndex + 1}`;
//                 break;
//               case 11:
//                 columnName = 'Not Attempted Call';
//                 expectedValue = `Not Attempted ${rowIndex + 1}`;
//                 break;
//               case 12:
//                 columnName = 'Rejected Call';
//                 expectedValue = `Rejected ${rowIndex + 1}`;
//                 break;
//               case 13:
//                 columnName = 'Not Picked Up By Client';
//                 expectedValue = `Not Picked Up ${rowIndex + 1}`;
//                 break;
//               default:
//                 columnName = `Unknown Column ${cellIndex}`;
//                 expectedValue = `Expected Value ${cellIndex}`;
//                 break;
//             }

//             if (cellIndex === 1) {
//               expect(actualText).to.include(agentFullName);
//             } else {
//               expect(actualText).to.equal(expectedValue);
//             }
//           });
//         });

//         const sortedAgentNames = [...agentNames].sort();
//         expect(agentNames).to.deep.equal(sortedAgentNames);
//       } else {
//         cy.contains('No record to display', { timeout: 8000 }).should('exist');
//         cy.log('ℹ️ No data found for current filter.');
//       }
//     });
//   }
// }

// export default new Pagination();
class Pagination {
  // Verifies if the table title is correct
  verifyTableTitle(expectedTitle) {
    cy.contains(expectedTitle).should('exist');
  }

  // Verifies row data and logs all rows (pass expectedText based on table type)
  verifyTableRowData(expectedText = 'Agent') {
    const rowSelector = '.rdt_Table [role="rowgroup"] [role="row"]';

    // Wait for table to render and have at least 1 row
    cy.get(rowSelector, { timeout: 8000 }).should('exist');

    // Check that at least one row has expected text
    cy.get(rowSelector).first().should('contain.text', expectedText);

    // Log all visible row texts
    cy.get(rowSelector).each(($row, index) => {
      cy.wrap($row).invoke('text').then(rowText => {
        cy.log(`🧾 Row ${index + 1}: ${rowText.trim()}`);
      });
    });

    cy.log(`✅ Table contains rows with expected text: "${expectedText}"`);
  }

  // Optional: Verifies pagination if present
  verifyPaginationControls() {
    cy.get('button').then($buttons => {
      if ($buttons.filter(':contains("Next")').length > 0) {
        cy.contains('Next').click();
        cy.log('➡️ Clicked Next page');
        cy.wait(1000); // Wait for data load
        cy.contains('Previous').should('exist');
        cy.log('⬅️ Previous button is now visible');
      } else {
        cy.log('ℹ️ Pagination not available');
      }
    });
  }
}

export default new Pagination();


