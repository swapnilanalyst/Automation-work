import Chance from 'chance';


describe("Task Manager - Registration Page Test Cases", () => {
  const baseUrl = "http://taskmanager.salesninjacrm.com/sign-up";
  const chance = new Chance();

  const locators = {
    orgName: "input[name='organizationName']",
    email: "input[name='email']",
    mobileNumber: "input[name='mobileNumber']",
    address: "input[name='address']",
    country: "input[placeholder='Choose a country']",
    state: "input[name='state']",
    city: "input[name='city']",
    pincode: "input[name='pincode']",
    industryType: "input[name='industryType']",
    website: "input[name='website']",
    Createriganization: "button[type='submit']",
    countryCodeSelected: "selector-for-selected-country-code",
    countryCodeButton: "#country-list-button",
    cc: ".minimal__flag__icon__root",
    errorMsg: "selector-for-error-message",
  };

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  //   it('TC_01 - UI Validation: All fields visible', () => {
  //     cy.get(locators.orgName).should('be.visible');
  //     cy.get(locators.email).should('be.visible');
  //     cy.get(locators.mobileNumber).should('be.visible');
  //     cy.get(locators.address).should('be.visible');
  //     cy.get(locators.country).should('be.visible');
  //     cy.get(locators.state).should('be.visible');
  //     cy.get(locators.city).should('be.visible');
  //     cy.get(locators.pincode).should('be.visible');
  //     cy.get(locators.industryType).should('be.visible');
  //     cy.get(locators.website).should('be.visible');
  //     cy.get(locators.Createriganization).should('be.visible');
  //   });

  //   it('TC_02 - Mandatory Field Validation', () => {
  //   // Trigger the "Create Organization" button
  //   cy.contains('Create Organization').click();
  //   cy.get('.MuiFormHelperText-root.Mui-error.MuiFormHelperText-sizeMedium.MuiFormHelperText-contained.css-15piqkk')
  //     .each(($el) => {
  //       // Log the inner text of each element
  //       cy.log($el.text());
  //       console.log($el.text());
  //     }).should('have.length.greaterThan', 0);
  // });
  //   it('TC_03 - Name Field Validation', () => {
  //     cy.get(locators.orgName).type('1234!@#');
  //     cy.contains('Create Organization').click();
  //     cy.contains('Email is required!').should('exist');
  //   });

  //   it('TC_04 - Email Format Validation', () => {
  //     cy.get(locators.email).type('user@');
  //     cy.contains('Create Organization').click();
  //     cy.contains('Email must be a valid email address!').should('exist');
  //   });

//   it('TC_05 - Mobile Number Validation for default selected country India', () => {
//     cy.get(locators.countryCodeButton)
//       .find('img.minimal__flag__icon__img')
//       .invoke('attr', 'alt')
//       .then((countryCode) => {
//         cy.log(`Selected country code: ${countryCode}`);
//         expect(countryCode).to.equal('IN'); // Optional: ensure India is selected
//         // If India selected, mobile must be exactly 10 digits
//         // Enter less than 10 digits (invalid)
//         cy.get(locators.mobileNumber).clear().type('1234567');
//         cy.get(locators.Createriganization).click();
//         cy.contains('Mobile number must be at least 10 digits').should('exist');

//         // Enter exactly 10 digits (valid)
//         cy.get(locators.mobileNumber).clear().type('1234567890');
//         cy.get(locators.Createriganization).click();
//         cy.contains('Mobile number must be at least 10 digits').should('not.exist');
//       });
//   });

//   it("TC_05.01 - Mobile Number Validation for other countries", () => {
//     // Open country dropdown and select US (or any other country)
//     cy.get(locators.countryCodeButton).click();
//     cy.get('ul[role="menu"] li') // Adjust locator if needed
//       .contains("United States") // or the exact text in the country list
//       .click()
//       .wait(500); // wait for selection to register

//     // Now confirm selected country is US
//     cy.get(locators.countryCodeButton)
//       .find("img.minimal__flag__icon__img")
//       .invoke("attr", "alt")
//       .then((countryCode) => {
//         cy.log(`Selected country code: ${countryCode}`);
//         expect(countryCode).to.equal("US"); // Optional check

//         // For other countries: allow 15-20 digits max

//         // Enter 15 digits (valid)
//         cy.get(locators.mobileNumber).clear().type("123456789012345");
//         cy.get(locators.Createriganization).click();
//         cy.contains("Mobile number must be").should("not.exist");

//         // Enter more than 20 digits (invalid)
//         cy.get(locators.mobileNumber).clear().type("1234567890123456789012345"); // 25 digits
//         cy.get(locators.Createriganization).click();
//         cy.contains("Mobile number cannot exceed 20 digits").should("exist");

//         // Enter valid number with exactly 20 digits
//         cy.get(locators.mobileNumber).clear().type("12345678901234567890");
//         cy.get(locators.Createriganization).click();
//         cy.contains("Mobile number cannot exceed 20 digits").should(
//           "not.exist"
//         );
//       });
//   });

//    it('TC_06 - Address Field Validation', () => {
//       cy.get(locators.address).type('123 Main St. Apt #5');
//       cy.get(locators.Createriganization).click();
//       // Assuming no error is shown for a valid address
//       cy.get(locators.address).should('have.value', '123 Main St. Apt #5');
//     });

//    it("TC_07 - Country Selection", () => {
//      cy.get(locators.country).click().type("India");
//      cy.wait(500); // You can adjust the wait time if needed
//      // Click the 'India' option from the dropdown
//      cy.get('ul[role="listbox"]') // Make sure this matches the correct dropdown selector
//        .contains("India") // Adjust the text to match the displayed text in the dropdown
//        .click();

//      // Verify that 'India' is selected
//      cy.get(locators.country).should("have.value", "India");
//    });

//     it('TC_08 - State Field Validation', () => {
//       cy.get(locators.state).type('Madhya Pradesh');
//       cy.contains('Create Organization').click();
//       cy.get(locators.state).should('have.value', 'Madhya Pradesh');
//     });

//     it('TC_09 - City Field Handling', () => {
//       cy.get(locators.city).type('Indore');
//       cy.contains('Create Organization').click();
//       cy.get(locators.city).should('have.value', 'Indore');
//     });

//     it('TC_10 - Postal Code Field Should Not Be Empty', () => {
//     // Leave postal code blank
//     cy.get(locators.pincode).should('exist').clear();
//     cy.contains('Create Organization').click();

//     // Assertion for empty validation error
//     cy.contains('Pincode is required!').should('exist'); // <- adjust message based on actual UI
//   });

//    it('TC_11 - Industry Type Field', () => {
//      cy.get(locators.industryType).type('Indore');
//       cy.contains('Create Organization').click();
//       cy.get(locators.industryType).should('have.value', 'Indore');
//   });

//     it('TC_12 - Website URL Validation (Optional but Should Validate if Filled)', () => {
//     cy.get(locators.website).type('invalidurl');
//     cy.contains('Create Organization').click();

//     // Ideally this should exist in the future
//     cy.contains('Website must be a valid url').should('exist'); // May fail if not implemented yet
//   });

    // it('TC_13 - Terms & Conditions Checkbox', () => {
    //   cy.get(locators.orgName).type('John Doe');
    //   cy.get(locators.email).type('john@example.com');
    //   cy.get(locators.mobileNumber).type('9876543210');
    //   cy.get(locators.address).type('123 Main Street');
    //   cy.get(locators.country).click().type("India")
    //   cy.get('ul[role="listbox"]') // Make sure this matches the correct dropdown selector
    //   .contains("India") // Adjust the text to match the displayed text in the dropdown
    //   .click();;
    // //   cy.get("input[placeholder='Enter State']").type('MP');
    // //   cy.get("input[placeholder='Search city...']").type('Indore');
    //   cy.get(locators.pincode).type('452001');
    //   cy.get(locators.industryType).type('Finance').should('have.value', 'Finance');
    //   cy.get(locators.website).type('https://company.com');
    //   cy.wait(500);
    //   // Don't check T&C
    //   cy.contains('Create Organization').click();
    // //   cy.contains('Please read and accept the Terms of Service & Privacy Policy before continuing.').should('exist');
    // });

    it('TC_14 - Successful Registration witout verification', () => {
      const timestamp = Date.now();
      const email = `user${timestamp}@mailinator.com`;
      
    //   const address = faker.address.streetAddress();
      const username = chance.name(); // Random name   // Random email
      const phone = chance.phone(); // Random phone number

      console.log(username, phone);
      cy.log(username, phone);

      cy.get(locators.orgName).type(username);
      cy.get(locators.email).type(email);
      cy.get(locators.mobileNumber).type(phone);
      cy.get(locators.address).type(chance.address());
      cy.get(locators.country).click().type("India")
      cy.get('ul[role="listbox"]').contains("India") .click();
    //   cy.get("input[placeholder='Enter State']").type('MP');
    //   cy.get("input[placeholder='Search city...']").type('Indore');
      cy.get(locators.pincode).type('452001');
      cy.get(locators.industryType).type('Finance').should('have.value', 'Finance');
      cy.get(locators.website).type('https://company.com');
      cy.wait(5000);
    //   cy.get("input[type='checkbox']").check();
      cy.contains('Create Organization').click();

      cy.url({ timeout: 10000 }).should('include', '/auth-success-msg');
    });

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
  //     cy.contains('Create Organization').click();

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
