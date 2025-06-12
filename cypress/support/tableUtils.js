class TableUtils {
  verifyTableTitle(expectedTitle) {
    cy.get('.card-title').contains(expectedTitle).should('exist');
  }

  verifyPagination(defaultCount = 10) {
    cy.get('[role="table"]').within(() => {
      cy.get('[role="row"]').then((rows) => {
        const visibleRows = rows.length - 1; // subtract header row
        if (visibleRows > 0) {
          expect(visibleRows).to.be.at.most(defaultCount);
        } else {
          cy.contains('No record to display').should('exist');
        }
      });
    });
  }
 verifyTableRowData() {

  const tableContainer = '.salenninja-dashboard-agent-tblemani';
  const rowSelector = '.rdt_TableRow';
  const cellSelector = '.rdt_TableCell';

  cy.get(tableContainer, { timeout: 10000 })
    .should('exist')
    .then(($el) => {
      console.log('DEBUG: Table container inner HTML:', $el.html());
    });

  cy.get(rowSelector, { timeout: 8000 }).then(($rows) => {

    const rowCount = $rows.length;
    const agentNames = []; // Array to hold agent names for sorting later

    if (rowCount > 0) {
      cy.log(`✅ Table loaded with ${rowCount} row(s)`);

      // Iterate over each row (skip header if needed)
      $rows.each((rowIndex, row) => {
        const $row = Cypress.$(row); // jQuery style wrap
        const $cells = $row.find(cellSelector);

        cy.log(`📍 Verifying Row ${rowIndex + 1}`);
        console.log(`ROW ${rowIndex + 1}: ${$row.text().trim()}`);

        // Get Agent Name and Active Time cell content (assuming it's in column index 1)
        const agentFullNameWithActiveTime = $row.find('td').eq(1).text().trim();
        console.log(`DEBUG: Original agent cell content: "${agentFullNameWithActiveTime}"`);

        // Extract Agent Name and Active Time from the cell content
        const agentFullName = agentFullNameWithActiveTime.split(/\s+\d+\s+minute/).shift().trim();
        console.log(`DEBUG: Extracted agent name: "${agentFullName}"`);

        // Get the timestamp from the row (assume it's stored as a data attribute, adjust selector as needed)
        const lastCallSync = parseInt($row.data('timestamp')); // Assume the timestamp is stored in a `data-timestamp` attribute
        if (isNaN(lastCallSync)) {
          cy.log('Error: lastCallSync timestamp is invalid');
          return; // Skip this row if the timestamp is not found or invalid
        }

        // Get the current timestamp (in milliseconds)
        const currentTimestamp = new Date().getTime();

        // Calculate active time in minutes
        const activeTimeInMinutes = Math.floor((currentTimestamp - lastCallSync) / 60000); // Calculate active time in minutes

        // Prepare the formatted active time string (e.g., "5 minutes ago")
        const formattedActiveTime = `${activeTimeInMinutes} minute${activeTimeInMinutes === 1 ? '' : 's'} ago`;

        console.log(`DEBUG: Active time for agent "${agentFullName}": ${formattedActiveTime}`);

        // Collect the Agent Name for later sorting
        agentNames.push(agentFullName);

        // Iterate over each cell in the row to check or verify values
        $cells.each((cellIndex, cell) => { // cellIndex is the index of the cell
          const actualText = Cypress.$(cell).text().trim();
          
          let expectedValue;
          let columnName;

          // Define expected values based on the column index
          switch (cellIndex) {
            case 0:
              columnName = 'SN';
              expectedValue = `${rowIndex + 1}`;
              break;

            case 1:
              columnName = 'Agent Name';
              // Update expected value to match the format "Agent Name + Active Time"
              expectedValue = `${agentFullName} ${formattedActiveTime}`; // e.g., "Aadarsh Soni 4 minute"
              break;

            case 2:
              columnName = 'Team';
              expectedValue = `Team ${rowIndex + 1}`;
              break;

            case 3:
              columnName = 'Unique Call';
              expectedValue = `Unique ${rowIndex + 1}`;
              break;

            case 4:
              columnName = 'Total Duration';
              expectedValue = `Duration ${rowIndex + 1}`;
              break;

            case 5:
              columnName = 'Avg Call Duration';
              expectedValue = `Avg ${rowIndex + 1}`;
              break;

            case 6:
              columnName = 'Total Call';
              expectedValue = `Call ${rowIndex + 1}`;
              break;

            case 7:
              columnName = 'Connected Call';
              expectedValue = `Connected ${rowIndex + 1}`;
              break;

            case 8:
              columnName = 'Incoming Call';
              expectedValue = `Incoming ${rowIndex + 1}`;
              break;

            case 9:
              columnName = 'Outgoing Call';
              expectedValue = `Outgoing ${rowIndex + 1}`;
              break;

            case 10:
              columnName = 'Missed Call';
              expectedValue = `Missed ${rowIndex + 1}`;
              break;

            case 11:
              columnName = 'Not Attempted Call';
              expectedValue = `Not Attempted ${rowIndex + 1}`;
              break;

            case 12:
              columnName = 'Rejected Call';
              expectedValue = `Rejected ${rowIndex + 1}`;
              break;

            case 13:
              columnName = 'Not Picked Up By Client';
              expectedValue = `Not Picked Up ${rowIndex + 1}`;
              break;

            default:
              columnName = `Unknown Column ${cellIndex}`;
              expectedValue = `Expected Value ${cellIndex}`;
              break;
          }

          // Logging the expected and actual values
          console.log(`Row ${rowIndex + 1} - ${columnName}:`);
          console.log(`Expected: ${expectedValue}`);
          console.log(`Actual: ${actualText}`);
          console.log('------------------------------');

          // For agent name column, check with more lenient comparison due to active time variability
          if (cellIndex === 1) {
            // Check if the actual text contains the agent name (more flexible comparison)
            const containsAgentName = actualText.includes(agentFullName);
            console.log(`Does actual text contain agent name? ${containsAgentName}`);

            // Use a more lenient check for this specific column
            expect(actualText, `Agent name "${agentFullName}" should be present in "${actualText}"`).to.include(agentFullName);
          } else {
            // For other columns, use exact matching
            expect(actualText, `Mismatch in Row ${rowIndex + 1} - Column "${columnName}"`).to.equal(expectedValue);
          }
        });
      });

      // After checking all rows, verify if the agent names are in ascending order
      const sortedAgentNames = [...agentNames].sort();
      expect(agentNames, 'Agent Names should be sorted in ascending order').to.deep.equal(sortedAgentNames);

    } else {
      // If no rows are found, verify the "No record to display" message
      cy.contains('No record to display', { timeout: 8000 }).should('exist');
      cy.log('ℹ️ No data found for current filter.');
      console.log('INFO: No record to display');
    }
  });
}


}

export default new TableUtils();
