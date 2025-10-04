describe('Sales Ninja - Registration Page Test Cases', () => {
  const baseUrl = 'https://app.salesninjacrm.com/register';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

//   it('TC_01 - UI Validation: All fields visible', () => {
//     cy.get("input[placeholder='Enter name']").should('be.visible');
//     cy.get("input[placeholder='Enter email address']").should('be.visible');
//     cy.get("input[placeholder='1 (702) 123-4567']").should('be.visible');
//     cy.get("input[placeholder='Enter Address']").should('be.visible');
//     cy.get("select[name='country']").should('be.visible');
//     cy.get("input[placeholder='Enter State']").should('be.visible');
//     cy.get("input[placeholder='Search city...']").should('be.visible');
//     cy.get("input[placeholder='Enter Postal Code']").should('be.visible');
//     cy.get("#industryType").should('be.visible');
//     cy.get("input[placeholder='Enter Website Url.']").should('be.visible');
//   });

  it('TC_02 - Mandatory Field Validation', () => {
    cy.contains('Sign Up').click();
    cy.get('.invalid-feedback')
    .each(($el) => {
      cy.log($el.text());
      console.log($el.text());
    })   
    .should('have.length.greaterThan', 0);
  });

//   it('TC_03 - Name Field Validation', () => {
//     cy.get("input[placeholder='Enter name']").type('1234!@#');
//     cy.contains('Sign Up').click();
//     cy.contains('Email Address is required').should('exist');
//   });

//   it('TC_04 - Email Format Validation', () => {
//     cy.get("input[placeholder='Enter email address']").type('user@');
//     cy.contains('Sign Up').click();
//     cy.contains('Please enter a valid email address').should('exist');
//   });

//   it('TC_05 - Contact Number Validation', () => {
//     cy.get("input[placeholder='1 (702) 123-4567']").type('abc123');
//     cy.contains('Sign Up').click();
//     cy.contains('Please enter a valid number').should('exist');
//   });

//   it('TC_06 - Address Field Validation', () => {
//     cy.get("input[placeholder='Enter Address']").type('123 Main St. Apt #5');
//     cy.contains('Sign Up').click();
//     // Assuming no error is shown for a valid address
//     cy.get("input[placeholder='Enter Address']").should('have.value', '123 Main St. Apt #5');
//   });

//   it('TC_07 - Country Selection', () => {
//     cy.get("select[name='country']").select('India').should('have.value', 'India');
//   });

//   it('TC_08 - State Field Validation', () => {
//     cy.get("input[placeholder='Enter State']").type('Madhya Pradesh');
//     cy.contains('Sign Up').click();
//     cy.get("input[placeholder='Enter State']").should('have.value', 'Madhya Pradesh');
//   });

//   it('TC_09 - City Field Handling', () => {
//     cy.get("input[placeholder='Search city...']").type('Indore');
//     cy.contains('Sign Up').click();
//     cy.get("input[placeholder='Search city...']").should('have.value', 'Indore');
//   });

//   it('TC_10 - Postal Code Field Should Not Be Empty', () => {
//   // Leave postal code blank
//   cy.get("input[placeholder='Enter Postal Code']").should('exist').clear();
//   cy.contains('Sign Up').click();

//   // Assertion for empty validation error
//   cy.contains('Postal code is required').should('exist'); // <- adjust message based on actual UI
// });

//  it('TC_11 - Industry Dropdown', () => {
//   // Assert the label is present and correct
//   cy.get("label[for='stateIndustry']")
//     .should('be.visible')
//     .and('contain.text', 'Select Industry');

//   // List of expected options
//   const industryOptions = [
//     "Select Industry", "E-commerce", "Education", "Finance", "Healthcare & Wellness",
//     "Hotel/Restaurant", "Human Resources/Staffing", "Insurance", "IT/ITES", "Manufacturing",
//     "Marketing Agency", "Real Estate", "Travel&Hospitality", "Others"
//   ];

//   // Assert all expected options exist in the dropdown
//   industryOptions.forEach((option) => {
//     cy.get("#industryType").contains('option', option);
//   });

//   // Select "Finance" and assert
//   cy.get("#industryType").select('Finance').should('have.value', 'Finance');
// });


//   it('TC_12 - Website URL Validation (Optional but Should Validate if Filled)', () => {
//   cy.get("input[placeholder='Enter Website Url.']").type('invalidurl');
//   cy.contains('Sign Up').click();

//   // Ideally this should exist in the future
//   cy.contains('Please enter a valid website URL').should('exist'); // May fail if not implemented yet
// });


//   it('TC_13 - Terms & Conditions Checkbox', () => {
//     cy.get("input[placeholder='Enter name']").type('John Doe');
//     cy.get("input[placeholder='Enter email address']").type('john@example.com');
//     cy.get("input[placeholder='1 (702) 123-4567']").type('9876543210');
//     cy.get("input[placeholder='Enter Address']").type('123 Main Street');
//     cy.get("select[name='country']").select('India');
//     cy.get("input[placeholder='Enter State']").type('MP');
//     cy.get("input[placeholder='Search city...']").type('Indore');
//     cy.get("input[placeholder='Enter Postal Code']").type('452001');
//     cy.get('#industryType').should('exist').and('be.visible').select('Finance', { force: true }).should('have.value', 'Finance');
//     cy.get("input[placeholder='Enter Website Url.']").type('https://company.com');
//     // Don't check T&C
//     cy.contains('Sign Up').click();
//     cy.contains('Please read and accept the Terms of Service & Privacy Policy before continuing.').should('exist');
//   });

//   it('TC_14 - Successful Registration witout verification', () => {
//     const timestamp = Date.now();
//     const email = `user${timestamp}@mailinator.com`;

//     cy.get("input[placeholder='Enter name']").type('John Doe');
//     cy.get("input[placeholder='Enter email address']").type(email);
//     cy.get("input[placeholder='1 (702) 123-4567']").type('9876543210');
//     cy.get("input[placeholder='Enter Address']").type('123 Main Street');
//     cy.get("select[name='country']").select('India');
//     cy.get("input[placeholder='Enter State']").type('MP');
//     cy.get("input[placeholder='Search city...']").type('Indore');
//     cy.get("input[placeholder='Enter Postal Code']").type('452001');
//     cy.get('#industryType').should('exist').and('be.visible').select('Finance', { force: true }).should('have.value', 'Finance');
//     cy.get("input[placeholder='Enter Website Url.']").type('https://company.com');
//     cy.get("input[type='checkbox']").check();
//     cy.contains('Sign Up').click();

//     cy.url({ timeout: 10000 }).should('include', '/auth-success-msg');
//   });

//   it('TC_15 - Successful Registration with Verification', () => {
//     const timestamp = Date.now();
//     const email = `user${timestamp}@mailinator.com`;  // Registering with a dynamic email

//     // Step 1: Complete registration form
//     cy.get("input[placeholder='Enter name']").type('John Doe');
//     cy.get("input[placeholder='Enter email address']").type(email);
//     cy.get("input[placeholder='1 (702) 123-4567']").type('9876543210');
//     cy.get("input[placeholder='Enter Address']").type('123 Main Street');
//     cy.get("select[name='country']").select('India');
//     cy.get("input[placeholder='Enter State']").type('MP');
//     cy.get("input[placeholder='Search city...']").type('Indore');
//     cy.get("input[placeholder='Enter Postal Code']").type('452001');
//     cy.get('#industryType').should('exist').and('be.visible').select('Finance', { force: true }).should('have.value', 'Finance');
//     cy.get("input[placeholder='Enter Website Url.']").type('https://company.com');
//     cy.get("input[type='checkbox']").check();
//     cy.contains('Sign Up').click();

//     // Step 2: Ensure URL redirects to confirmation page after form submission
//     cy.url({ timeout: 10000 }).should('include', '/auth-success-msg');

//     // Step 3: Dynamically extract the user part of the email address (before @mailinator.com)
//     const userEmailPrefix = email.split('@')[0];  // Extract "user1758879704936" from "user1758879704936@mailinator.com"

//     // Step 4: Construct the Mailinator inbox URL using dynamic user prefix
//     const mailinatorUrl = `https://www.mailinator.com/v4/public/inboxes.jsp?msgid=${userEmailPrefix}&to=${userEmailPrefix}`;

// cy.origin(
//   "https://www.mailinator.com",
//   { args: { mailinatorUrl } },
//   ({ mailinatorUrl }) => {
//     cy.visit(mailinatorUrl);

// // cy.get('div.from.fz-20.ff-futura-book.p-l-20.ng-binding', { timeout: 20000 })
// //   .invoke('text')
// //   .then((text) => {
// //     expect(text.replace(/\s+/g, '')).to.include('help.salesninja@gmail.com');
// //   });


//     // Switch to JSON tab
//     cy.get('#pills-json-tab').click();

//     // Grab the verification link from the JSON content
//     cy.get('#pills-json-content pre').then(($pre) => {
//       const jsonText = $pre.text();
//       const jsonData = JSON.parse(jsonText);
//       const verificationLink = jsonData.clickablelinks.find(link => link.text === 'Verify email address').link;
      
//       // Visit verification link
//       cy.visit(verificationLink);
//     });
//   }
// );  


//   // Step 9: Verify the user is redirected to the appropriate page (e.g., dashboard)
//   cy.url().should('include', '/dashboard'); // Assuming successful login redirects to dashboard
//   });
});



