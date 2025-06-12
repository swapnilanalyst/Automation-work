import LoginPage from "../pages/LoginPage";

// ✅ Ignore unexpected exceptions to prevent test failures from unrelated errors
Cypress.on("uncaught:exception", () => false);

describe("Login Page - Full Coverage", () => {

  // ✅ Test: Valid Login
  it("should log in with valid credentials", () => {
    const env = Cypress.env("ENV");
    const role = Cypress.env("role");
    const credentials = Cypress.env(env)?.[role];

    if (!credentials) {
      throw new Error(`No credentials found for env="${env}" and role="${role}"`);
    }

    const { email, password } = credentials;

    LoginPage.loginAs(role, email, password);

    const expectedText = "DASHBOARD";
    cy.wait(10000)

    cy.get(".mb-sm-0")
      .should("be.visible")
      .invoke("text")
      .then((actualText) => {
        const actual = actualText.trim();
        cy.log(`✅ Expected: ${expectedText}`);
        cy.log(`📌 Actual: ${actual}`);
        expect(actual).to.equal(expectedText);
      });
  });

  // ✅ Test: Admin tab selected by default
  it("should display Admin tab selected by default", () => {
    cy.visit("/");
    const expectedTab = "Admin";

    cy.get(".nav-tabs .nav-link.active")
      .invoke("text")
      .then((actualTab) => {
        const actual = actualTab.trim();
        cy.log(`✅ Expected: ${expectedTab}`);
        cy.log(`📌 Actual: ${actual}`);
        expect(actual).to.equal(expectedTab);
      });
  });

  // ✅ Test: Toggle Admin and Employee tabs
  it("should toggle between Admin and Employee tabs", () => {
    cy.visit("/");
    cy.get(".nav-tabs").trigger("mouseover").should("be.visible");

    const firstTab = "Employee";
    const secondTab = "Admin";

    cy.get(".nav-tabs .nav-link").contains(firstTab)
      .click().should("have.class", "active")
      .invoke("text")
      .then((actual) => {
        expect(actual.trim()).to.equal(firstTab);
      });

    cy.get(".nav-tabs .nav-link").contains(secondTab)
      .click().should("have.class", "active")
      .invoke("text")
      .then((actual) => {
        expect(actual.trim()).to.equal(secondTab);
      });
  });

  // ✅ Test: Empty email and password validation
  it("should show validation for empty email and password", () => {
    cy.visit("/");
    cy.get("button").contains("Sign In").click();

    cy.get('#home1 input[placeholder="Enter email address"]')
      .trigger("mouseover")
      .should("have.attr", "aria-invalid")
      .then((emailAttr) => {
        const expected = "Email address is required";
        cy.log(`✅ Expected Email aria-invalid: ${expected}`);
        cy.log(`📌 Actual Email aria-invalid: ${emailAttr}`);
        expect(emailAttr).to.equal(expected);
      });

    cy.get('#home1 input[placeholder="Enter Password"]')
      .trigger("mouseover")
      .should("have.attr", "aria-invalid")
      .then((passwordAttr) => {
        const expected = "Password is required";
        cy.log(`✅ Expected Password aria-invalid: ${expected}`);
        cy.log(`📌 Actual Password aria-invalid: ${passwordAttr}`);
        expect(passwordAttr).to.equal(expected);
      });
  });

  // ✅ Test: Invalid email format validation
  it("should show validation for invalid email format", () => {
    cy.visit("/");

    cy.get('#home1 input[placeholder="Enter email address"]')
      .clear().type("invalid-email");

    cy.get('#home1 input[placeholder="Enter Password"]')
      .clear().type("123456");

    cy.get("button").contains("Sign In").click();

    cy.get('#home1 input[placeholder="Enter email address"]:invalid')
      .should("exist")
      .trigger("mouseover")
      .should("have.attr", "aria-invalid")
      .then((emailAttr) => {
        const expected = "Please enter a valid email address";
        cy.log(`✅ Expected Email aria-invalid: ${expected}`);
        cy.log(`📌 Actual Email aria-invalid: ${emailAttr}`);
        expect(emailAttr).to.equal(expected);
      });
  });

  // ✅ Test: Incorrect password with valid email
  it("should show error for valid email but incorrect password", () => {
    cy.visit("/");

    cy.get('#home1 input[placeholder="Enter email address"]')
      .clear().type("support@redvisionglobal.com");

    cy.get('#home1 input[placeholder="Enter Password"]')
      .clear().type("wrongPassword123");

    cy.get("button").contains("Sign In").click();

    cy.get("div.alert.alert-danger[role='alert']")
      .should("be.visible")
      .then(($el) => {
        const actualText = $el.text().trim();
        const expectedText = "User not found. Please check your email or password.";
        cy.log("Actual Error Message:", actualText);
        expect(actualText).to.contain(expectedText);
      });
  });

  // ✅ Test: Password field empty validation
  it("should show required password validation if password is empty", () => {
    cy.visit("/");

    cy.get('#home1 input[placeholder="Enter email address"]')
      .clear().type("validuser@example.com");

    cy.get('#home1 input[placeholder="Enter Password"]').clear();

    cy.get("button").contains("Sign In").click();

    cy.get('#home1 input[placeholder="Enter Password"]')
      .trigger("mouseover")
      .should("have.attr", "aria-invalid")
      .then((actualMessage) => {
        const expectedMessage = "Password is required";
        cy.log(`✅ Expected: ${expectedMessage}`);
        cy.log(`🔍 Actual: ${actualMessage}`);
        expect(actualMessage).to.equal(expectedMessage);
      });
  });

  // ✅ Test: Toggle password visibility
  it("should toggle password visibility", () => {
    cy.visit("/");

    cy.get('#home1 input[placeholder="Enter Password"]')
      .type("123456");

    cy.get("#password-addon").click();

    cy.get('#home1 input[placeholder="Enter Password"]')
      .should("have.attr", "type", "text")
      .then(($input) => {
        const passwordValue = $input.val();
        cy.log("🔑 Password after toggle:", passwordValue);
      });
  });

  // ✅ Test: Forgot Password navigation
  it("should navigate to Forgot Password page", () => {
    cy.visit("/");
    cy.get("a").contains("Forgot password").click();
    cy.url().should("include", "forgot-password");
    cy.go("back");
  });

  // ✅ Test: Signup navigation
  it("should navigate to Signup page", () => {
    cy.visit("/");
    cy.get("a").contains("Signup").click();
    cy.url().should("include", "register");
    cy.go("back");
  });

  // ✅ Test: Invalid login credentials
  it("should show error for invalid login credentials", () => {
    cy.visit("/");

    cy.get('#home1 input[placeholder="Enter email address"]')
      .clear().type("invalid@email.com");

    cy.get('#home1 input[placeholder="Enter Password"]')
      .clear().type("wrongpass");

    cy.get("button").contains("Sign In").click();

    cy.get("#home1 .alert")
      .should("have.length", 1)
      .invoke("text")
      .then((actualText) => {
        const expectedText = "email is not registred";
        const actual = actualText.trim();
        cy.log(`❌ Expected: ${expectedText}`);
        cy.log(`🔍 Actual: ${actual}`);
        expect(actual).to.equal(expectedText);
      });
  });

});
