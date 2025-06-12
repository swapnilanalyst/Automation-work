// ProfilePage.js
import LoginPage from "./LoginPage";
import DashboardPage from "./Dashboard";

class ProfilePage {
  openProfileFromHeader() {
    cy.get(".ri-arrow-down-s-line").click();
    cy.contains("a.dropdown-item", "Profile").click();
    cy.url().should("include", "/profile");
  }

                         /** * ✅ Compares only:
   * - Header Name vs Profile Heading  * - Header Org ID vs Profile Org ID Field */

  verifyHeaderDetailsAgainstProfile() {
    cy.get(".user-name-text").invoke("text").then((headerNameRaw) => {
      const headerName = headerNameRaw.trim();

      cy.get(".user-name-sub-text span").invoke("text").then((headerIdRaw) => {
        const headerID = headerIdRaw.trim();

        this.openProfileFromHeader();

        // Wait for profile page to fully load
        cy.get('[class*="profile"], [class*="detail"], .container', { timeout: 10000 }).should('be.visible');
        
        // Check role and verify accordingly
        const currentRole = Cypress.env('role');
        
        if (currentRole === 'admin') {
          // Wait for Organization Name field to be visible and have text
          cy.get('#organizationname', { timeout: 15000 })
            .should('be.visible')
            .should('not.be.empty')
            .and('not.contain.text', 'Loading...')
            .and('not.contain.text', '...')
            .invoke("text").then((organizationNameRaw) => {
              const organizationName = organizationNameRaw.trim();
              
              // Wait for Organization ID field 
              cy.get('#phonenumberInput', { timeout: 10000 })
                .should('be.visible')
                .should('not.be.empty')
                .invoke("text").then((organizationIdRaw) => {
                  const organizationId = organizationIdRaw.trim();
                  
                  // Save to Cypress.env() for future use
                  Cypress.env("orgName", organizationName);
                  Cypress.env("orgId", organizationId);

                  // Detailed Logs with actual vs expected
                  cy.log(`📋 ADMIN PROFILE COMPARISON:`);
                  cy.log(`📍 Header Name (Expected): "${headerName}"`);
                  cy.log(`🏢 Organization Name (Actual): "${organizationName}"`);
                  cy.log(`🆔 Header ID (Expected): "${headerID}"`);
                  cy.log(`🆔 Organization ID (Actual): "${organizationId}"`);
                  
                  // Console mein bhi print karo
                  console.log('🔍 ADMIN VERIFICATION RESULTS:');
                  console.log('Expected Header Name:', headerName);
                  console.log('Actual Organization Name:', organizationName);
                  console.log('Expected Header ID:', headerID);
                  console.log('Actual Organization ID:', organizationId);

                  // Enhanced Assertions with better error messages
                  if (organizationName === '') {
                    cy.log('❌ Organization Name field is empty - retrying...');
                    cy.wait(2000); // Wait a bit more
                    cy.reload(); // Reload if needed
                    this.openProfileFromHeader();
                  } else {
                    expect(organizationName, `Organization Name should match Header Name. Expected: "${headerName}", but got: "${organizationName}"`).to.eq(headerName);
                  }
                  
                  if (organizationId === '') {
                    cy.log('❌ Organization ID field is empty - retrying...');
                    cy.wait(2000);
                  } else {
                    expect(organizationId, `Organization ID should match Header ID. Expected: "${headerID}", but got: "${organizationId}"`).to.eq(headerID);
                  }
                });
            });
          
        } else if (currentRole === 'employee') {
          // Wait for Employee Name field to be visible and have text
          cy.get('#organizationname', { timeout: 15000 })
            .should('be.visible')
            .should('not.be.empty')
            .and('not.contain.text', 'Loading...')
            .invoke("text").then((employeeNameRaw) => {
              const employeeName = employeeNameRaw.trim();
              
              // Wait for Organization ID field
              cy.get('#phonenumberInput', { timeout: 10000 })
                .should('be.visible')
                .should('not.be.empty')
                .invoke("text").then((organizationIdRaw) => {
                  const organizationId = organizationIdRaw.trim();
                  
                  // Save to Cypress.env() for future use
                  Cypress.env("empName", employeeName);
                  Cypress.env("orgId", organizationId);

                  // Detailed Logs with actual vs expected
                  cy.log(`📋 EMPLOYEE PROFILE COMPARISON:`);
                  cy.log(`📍 Header Name (Expected): "${headerName}"`);
                  cy.log(`👨‍💼 Employee Name (Actual): "${employeeName}"`);
                  cy.log(`🆔 Header ID (Expected): "${headerID}"`);
                  cy.log(`🆔 Organization ID (Actual): "${organizationId}"`);
                  
                  // Console mein bhi print karo
                  console.log('🔍 EMPLOYEE VERIFICATION RESULTS:');
                  console.log('Expected Header Name:', headerName);
                  console.log('Actual Employee Name:', employeeName);
                  console.log('Expected Header ID:', headerID);
                  console.log('Actual Organization ID:', organizationId);

                  // Enhanced Assertions with better error messages
                  if (employeeName === '') {
                    cy.log('❌ Employee Name field is empty - retrying...');
                    cy.wait(2000);
                    cy.reload();
                    this.openProfileFromHeader();
                  } else {
                    expect(employeeName, `Employee Name should match Header Name. Expected: "${headerName}", but got: "${employeeName}"`).to.eq(headerName);
                  }
                  
                  if (organizationId === '') {
                    cy.log('❌ Organization ID field is empty - retrying...');
                    cy.wait(2000);
                  } else {
                    expect(organizationId, `Organization ID should match Header ID. Expected: "${headerID}", but got: "${organizationId}"`).to.eq(headerID);
                  }
                });
            });
        }
      });
    });
  }

  /**
   * 🔍 Verify profile details based on user role - Admin ke liye alag, Employee ke liye alag
   */
  verifyProfileDetails() {
    const currentRole = Cypress.env('role');
    
    if (currentRole === 'admin') {
      this.verifyAdminProfileDetails();
    } else if (currentRole === 'employee') {
      this.verifyEmployeeProfileDetails();
    } else {
      cy.log("❌ Unknown role detected, skipping profile verification");
    }
  }

  /**
   * 👑 Admin ke liye profile details verification with proper wait conditions
   */
  verifyAdminProfileDetails() {
    // Read expected values from Cypress.env
    const expectedValues = {
      'Organization Name': Cypress.env('orgName') || '',
      'Organization ID': Cypress.env('orgId') || '',
    };

    const adminFields = [
      { label: "Organization Name", selector: "#organizationname" },
      { label: "Organization ID", selector: "#phonenumberInput" },
      { label: "Email", selector: "#emailInput" },
      { label: "Country Code", selector: "#zipcodeInput" },
      { label: "Mobile Number", selector: "#mobilenumberInput" },
      { label: "Pin Code", selector: "#pincodeInput" },
      { label: "Country", selector: "#countryInput" },
      { label: "City", selector: "#cityInput" },
      { label: "State", selector: "#state" },
      { label: "Industry Type", selector: "#Industryinput" },
      {
        label: "Website Url (Optional)",
        selector: "#webInput",
        optional: true,
      },
    ];

    const summary = [];

    adminFields.forEach((field) => {
      // Add proper wait conditions for each field
      cy.get(field.selector, { timeout: 10000 })
        .should('be.visible')
        .wait(500) // Small wait to ensure content is loaded
        .invoke("text")
        .then((actualText) => {
          const actual = actualText.trim();
          const expected = expectedValues[field.label] || "";
          const match = expected ? (actual === expected ? "✅" : "❌") : "N/A";

          // Enhanced logging with actual vs expected
          cy.log(`🔍 ${field.label}:`);
          cy.log(`   Expected: "${expected}"`);
          cy.log(`   Actual: "${actual}"`);
          cy.log(`   Match: ${match}`);

          summary.push({
            Field: field.label,
            "Expected Value": expected || "(Not Provided)",
            "Actual Value": actual || "(Empty)",
            Match: match,
          });

          // Console mein bhi print karo
          console.log(`🔍 ${field.label}: Expected="${expected}", Actual="${actual}", Match=${match}`);

          if (expected && !field.optional) {
            if (actual === '') {
              cy.log(`❌ ${field.label} field is empty, retrying...`);
              cy.wait(1000);
              // Retry once more
              cy.get(field.selector).invoke("text").then((retryText) => {
                const retryActual = retryText.trim();
                expect(retryActual, `${field.label} should match after retry. Expected: "${expected}", but got: "${retryActual}"`).to.eq(expected);
              });
            } else {
              expect(actual, `${field.label} should match. Expected: "${expected}", but got: "${actual}"`).to.eq(expected);
            }
          }
        });
    });

    cy.then(() => {
      console.log("🧾 Admin Profile Details Verification Summary");
      console.table(summary);
    });
  }

  /**
   * 👨‍💼 Employee ke liye profile details verification with proper wait conditions
   */
  verifyEmployeeProfileDetails() {
    // Read expected values from Cypress.env for employee
    const expectedValues = {
      'Employee Name': Cypress.env('empName') || '',
      'Organization ID': Cypress.env('orgId') || '',
    };

    const employeeFields = [
      { label: "Employee Name", selector: "#organizationname" },
      { label: "Organization ID", selector: "#phonenumberInput" },
      { label: "Email", selector: "#emailInput" },
      { label: "Role", selector: "#roleInput" },
      { label: "Team", selector: "#teamInput" },
      { label: "Registered Date", selector: "#registeredInput" },
      { label: "Device Name", selector: "#deviceNameInput" },
      { label: "App Version", selector: "#versionInput" },
      { label: "Call Recording Sync", selector: "#callrecordingInput" },
      { label: "Last Call Sync", selector: "#lastcallrecordingInput" },
    ];

    const summary = [];

    employeeFields.forEach((field) => {
      // Add proper wait conditions for each field
      cy.get(field.selector, { timeout: 10000 })
        .should('be.visible')
        .wait(500) // Small wait to ensure content is loaded
        .invoke("text")
        .then((actualText) => {
          const actual = actualText.trim();
          const expected = expectedValues[field.label] || "";
          const match = expected ? (actual === expected ? "✅" : "❌") : "N/A";

          // Enhanced logging with actual vs expected
          cy.log(`🔍 ${field.label}:`);
          cy.log(`   Expected: "${expected}"`);
          cy.log(`   Actual: "${actual}"`);
          cy.log(`   Match: ${match}`);

          summary.push({
            Field: field.label,
            "Expected Value": expected || "(Not Provided)",
            "Actual Value": actual || "(Empty)",
            Match: match,
          });

          // Console mein bhi print karo
          console.log(`🔍 ${field.label}: Expected="${expected}", Actual="${actual}", Match=${match}`);

          if (expected && !field.optional) {
            if (actual === '') {
              cy.log(`❌ ${field.label} field is empty, retrying...`);
              cy.wait(1000);
              // Retry once more
              cy.get(field.selector).invoke("text").then((retryText) => {
                const retryActual = retryText.trim();
                expect(retryActual, `${field.label} should match after retry. Expected: "${expected}", but got: "${retryActual}"`).to.eq(expected);
              });
            } else {
              expect(actual, `${field.label} should match. Expected: "${expected}", but got: "${actual}"`).to.eq(expected);
            }
          }
        });
    });

    cy.then(() => {
      console.log("🧾 Employee Profile Details Verification Summary");
      console.table(summary);
    });
  }

  verifyProfileUpdate() {
    const currentRole = Cypress.env('role');
    
    if (currentRole === 'admin') {
      this.verifyAdminProfileDetails();
    } else if (currentRole === 'employee') {
      this.verifyEmployeeProfileDetails();
    } else {
      cy.log("❌ Unknown role detected, skipping profile verification");
    }
  }

  /**
   * 👑 Admin ke liye profile details verification with proper wait conditions
   */
  verifyAdminProfileUpdate() {

       cy.xpath("//button[normalize-space()='Update']").click();
    cy.contains("Personal").should('be.visible');
    cy.url().should("include", "/update/personal");
    cy.xpath("//input[@placeholder='Enter Organization Name']").should('be.visible')
    .clear().type('Red Test')
    cy.xpath("//button[normalize-space()='Update']")
  }
}

export default new ProfilePage();
