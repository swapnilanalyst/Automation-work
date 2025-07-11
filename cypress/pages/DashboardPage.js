// DashboardPage.js
import { allFakers, fa } from "@faker-js/faker";
import Helper from "../utils/helper";

class DashboardPage {
  // Open Dashboard (optional, agar header se open karna ho)
  openDashboardFromMenu() {
    cy.get("aside").contains("Dashboard").click();
    cy.url().should("include", "/dashboard");
  }

  // Verify all modules/sections/cards/filters as per role
  verifyDashboardUI() {
    const role = Cypress.env("role");

    if (role === "admin") {
      this.verifyAdminDashboard();
    } else if (role === "employee") {
      this.verifyEmployeeDashboard();
    } else if (role === "roleBasedEmployee") {
      this.verifyRoleBasedEmployeeDashboard();
    } else {
      cy.log("❌ Unknown role detected, skipping dashboard checks");
    }
  }

  verifyAdminDashboard() {
    let allPass = true;
    let failedSections = [];
    // Example - update selectors and text as per actual DOM
    const sidebarModules = [
      "Call Analysis",
      "Dashboard",
      "Exclude Number",
      "Lead Management",
      "Management",
      "Performance Metrics",
      "Recording Report",
      "Report",
      "Storage Management",
      "Subscription",
    ];
    const cards = [
      "Total Call Duration",
      "Total Connected Call",
      "Number Of Employees",
    ];
    const filters = ["Select Team", "Select Employee"];
    const graphHeadings = [
      "Overall Calls Volumes",
      "Agent Performance",
      "Most Active Hour By Calls",
    ];
    const summaryBlocks = [
      "Top Caller",
      "Top Dialer",
      "Highest Call Duration",
      "Top Answered",
    ];
    const tableColumns = [
      "SN.",
      "Agent Name",
      "Team",
      "Unique Call",
      "Total Duration",
      "Avg Call Duration",
      "Total Call",
      "Connected Call",
      "Incoming Call",
      "Outgoing Call",
      "Missed Call",
      "Not Attempted Call",
      "Rejected Call",
      "Not Picked Up By Client",
    ];
    const actionButtons = ["Share", "View All"];

    // --- Sidebar modules robust check
    cy.get(
      "ul.navbar-nav.sn-side-menu-barrr li.nav-item a.menu-link span"
    ).then(($spans) => {
      const allSidebarText = $spans
        .map((i, el) => Cypress.$(el).text().trim())
        .get();
      if (
        !Helper.logAndCompare("Sidebar Modules", sidebarModules, allSidebarText)
      )
        allPass = false;
      failedSections.push("Sidebar Modules");
      sidebarModules.forEach((module) => {
        try {
          expect(allSidebarText).to.include(module);
        } catch (e) {
          allPass = false;
          if (!failedSections.includes("Sidebar Modules"))
            failedSections.push("Sidebar Modules");
        }
      });
    });

    // Cards
    cy.get(".sn-avg-unique-mumber-call .card .card-body p.mb-1").then(
      ($titles) => {
        const actualCards = $titles
          .map((i, el) => Cypress.$(el).text().trim())
          .get();
        // Log and compare (assuming you have imported Helper)
        if (!Helper.logAndCompare("Cards", cards, actualCards)) allPass = false;
        failedSections.push("Cards");
        // Standard assertion (optional)
        cards.forEach((card) => {
          try {
            expect(actualCards).to.include(card);
          } catch (e) {
            allPass = false;
            if (!failedSections.includes("Cards")) failedSections.push("Cards");
          }
        });
      }
    );

    // Filters (should  exist for ROle Based employee)
    // Filters - Robust Log & Compare
    cy.get("label").then(($labels) => {
      // Get all label texts (trimmed)
      const actualLabels = $labels.toArray().map((l) => l.textContent.trim());
      if (!Helper.logAndCompare("Filters", filters, actualLabels))
        allPass = false;
      failedSections.push("Filters");

      // Individually assert each expected filter label is present
      filters.forEach((label) => {
        try {
          expect(actualLabels).to.include(label);
          // Or for visibility on page, you can also do:
          cy.contains("label", label).should("be.visible");
        } catch (e) {
          allPass = false;
          if (!failedSections("Filters")) failedSections.push("Filters");
        }
      });
    });

    cy.wait(500);

    // Graph headings
    cy.get(".card-title.mb-0").then(($titles) => {
      const actual = $titles.map((i, el) => Cypress.$(el).text().trim()).get();
      if (!Helper.logAndCompare("Graph Headings", graphHeadings, actual))
        allPass = false;
      failedSections.push("Graph Headings");
      graphHeadings.forEach((heading) => {
        try {
          expect(actual, `Missing heading: ${heading}`).to.include(heading);
        } catch (e) {
          allPass = false;
          if (!failedSections.includes("Graph Headings"))
            failedSections.push("Graph Headings");
        }
      });
    });
    cy.wait(500);

    // Summary blocks by class (all use same class in DOM)
    cy.get("p.top-caller-title-top").then(($summary) => {
      const actual = $summary.map((i, el) => Cypress.$(el).text().trim()).get();
      if (!Helper.logAndCompare("Summary Blocks", summaryBlocks, actual))
        allPass = false;
      failedSections.push("Summary Blocks");
      summaryBlocks.forEach((label) => {
        try {
          expect(actual.some((txt) => txt.includes(label))).to.be.true;
        } catch (e) {
          allPass = false;
          if (!failedSections.includes("Summary Blocks"))
            failedSections.push("Sumqmary Blocks");
        }
      });
    });
    cy.wait(500);

    // Table columns (robust check)
    cy.get(
      '.rdt_TableHeadRow span, .rdt_TableHeadRow span[data-bs-toggle="tooltip"]'
    ).then(($spans) => {
      const actual = $spans
        .map((i, el) => Cypress.$(el).text().trim())
        .get()
        .filter((text) => text !== "" && text !== "▲"); // 💡 remove empty and arrow

      if (!Helper.logAndCompare("Table Columns", tableColumns, actual))
        allPass = false;
      failedSections.push("Tables Columns");
      tableColumns.forEach((col) => {
        try {
          expect(actual, `Missing column: ${col}`).to.include(col);
        } catch (e) {
          allPass = false;
          if (!failedSections.includes("Table Columns"))
            failedSections("Table Columns");
        }
      });
    });

    cy.wait(500);

    // Action buttons:
    // View All (span, class: ms-3)
    cy.get("span.ms-3").should("contain.text", "View All").and("be.visible");
    // Export buttons
    cy.get("button.tble-export1").should("exist"); // Excel
    cy.get("button.tble-export2").should("exist"); // PDF
    // Share button (uncomment if present as button or link)
    // cy.contains('button, a, span', 'Share').should('exist');

    cy.wait(500);

    // Console summary (optional)
    cy.then(() => {
      if (allPass) {
        console.log("✅ Admin Dashboard UI verified!");
        cy.log("✅ Admin Dashboard UI verified!");
      } else {
        console.log("❌ Admin Dashboard UI not as expected!");
        cy.log("❌ Admin Dashboard UI not as expected!");
        if (failedSections.length > 0) {
          console.log("Failed Sections: ", failedSections.join(", "));
          cy.log("Failed Sections: " + failedSections.join(", "));
        }
      }
    });
  }

  verifyEmployeeDashboard() {
    let allPass = true;
    let failedSections = [];

    // Change these arrays as per Employee visible items
    const sidebarModules = ["Dashboard", "Report", "Exclude Number"];
    const cards = [
      "Total Call Duration",
      "Total Connected Call",
      "Number Of Employees",
    ];
    const filters = ["Select Team", "Select Employee"];
    const graphHeadings = [
      "Overall Calls Volumes",
      "Agent Performance",
      "Most Active Hour By Calls",
    ];
    const summaryBlocks = [
      "Top Caller",
      "Top Dialer",
      "Highest Call Duration",
      "Top Answered",
    ];
    const tableColumns = [
      "SN.",
      "Agent Name",
      "Team",
      "Unique Call",
      "Total Duration",
      "Avg Call Duration",
      "Total Call",
      "Connected Call",
      "Incoming Call",
      "Outgoing Call",
      "Missed Call",
      "Not Attempted Call",
      "Rejected Call",
      "Not Picked Up By Client",
    ];
    const actionButtons = ["Share", "View All"];

    // Repeat same checks as above for Employee
    // --- Sidebar modules robust check
    cy.get(
      "ul.navbar-nav.sn-side-menu-barrr li.nav-item a.menu-link span"
    ).then(($spans) => {
      const allSidebarText = $spans
        .map((i, el) => Cypress.$(el).text().trim())
        .get();
      if (
        !Helper.logAndCompare("Sidebar Modules", sidebarModules, allSidebarText)
      )
        allPass = false;
      failedSections.push("Sidebar Modules");
      sidebarModules.forEach((module) => {
        try {
          expect(allSidebarText).to.include(module);
        } catch (e) {
          allPass = false;
          if (!failedSections.includes("Sidebar Modules"))
            failedSections.push("Sidebar Modules");
        }
      });
    });

    // Cards
    cy.get(".sn-avg-unique-mumber-call .card .card-body p.mb-1").then(
      ($titles) => {
        const actualCards = $titles
          .map((i, el) => Cypress.$(el).text().trim())
          .get();
        // Log and compare (assuming you have imported Helper)
        if (!Helper.logAndCompare("Cards", cards, actualCards)) allPass = false;
        failedSections.push("Cards");
        // Standard assertion (optional)
        cards.forEach((card) => {
          try {
            expect(actualCards).to.include(card);
          } catch (e) {
            allPass = false;
            if (!failedSections.includes("Cards")) failedSections.push("Cards");
          }
        });
      }
    );

    // Filters (should NOT exist for employee)
    cy.get("body").then(($body) => {
      if ($body.find("label").length > 0) {
        filters.forEach((label) => {
          cy.contains("label", label).should("not.exist");
        });
      } else {
        cy.log("No labels present, as expected.");
      }
    });

    cy.wait(500);

    // Graph headings
    cy.get(".card-title.mb-0").then(($titles) => {
      const actual = $titles.map((i, el) => Cypress.$(el).text().trim()).get();
      if (!Helper.logAndCompare("Graph Headings", graphHeadings, actual))
        allPass = false;
      failedSections.push("Graph Headings");
      graphHeadings.forEach((heading) => {
        try {
          expect(actual, `Missing heading: ${heading}`).to.include(heading);
        } catch (e) {
          allPass = false;
          if (!failedSections.includes("Graph Headings"))
            failedSections.push("Graph Headings");
        }
      });
    });
    cy.wait(500);

    // Summary blocks by class (all use same class in DOM)
    cy.get("p.top-caller-title-top").then(($summary) => {
      const actual = $summary.map((i, el) => Cypress.$(el).text().trim()).get();
      if (!Helper.logAndCompare("Summary Blocks", summaryBlocks, actual))
        allPass = false;
      failedSections.push("Summary Blocks");
      summaryBlocks.forEach((label) => {
        try {
          expect(actual.some((txt) => txt.includes(label))).to.be.true;
        } catch (e) {
          allPass = false;
          if (!failedSections.includes("Summary Blocks"))
            failedSections.push("Summary Blocks");
        }
      });
    });
    cy.wait(500);

    // Table columns (robust check)
    cy.get(
      '.rdt_TableHeadRow span, .rdt_TableHeadRow span[data-bs-toggle="tooltip"]'
    ).then(($spans) => {
      const actual = $spans
        .map((i, el) => Cypress.$(el).text().trim())
        .get()
        .filter((text) => text !== "" && text !== "▲"); // 💡 remove empty and arrow

      if (!Helper.logAndCompare("Table Columns", tableColumns, actual))
        allPass = false;
      failedSections.push("Table Columns");
      tableColumns.forEach((col) => {
        try {
          expect(actual, `Missing column: ${col}`).to.include(col);
        } catch (e) {
          allPass = false;
          if (!failedSections.includes("Table Columns"))
            failedSections.push("Table Column");
        }
      });
    });

    cy.wait(500);

    // Action buttons:
    // View All (span, class: ms-3)
    cy.get("span.ms-3").should("contain.text", "View All").and("be.visible");
    // Export buttons
    cy.get("button.tble-export1").should("exist"); // Excel
    cy.get("button.tble-export2").should("exist"); // PDF
    // Share button (uncomment if present as button or link)
    // cy.contains('button, a, span', 'Share').should('exist');

    cy.wait(500);

    cy.then(() => {
      if (allPass) {
        console.log("✅Employee Dashboard UI verified!");
        cy.log("✅Employee Dashboard UI verified!");
      } else {
        console.log("❌ Employee Dashboard UI not as expected!");
        cy.log("❌ Employee Dashboard UI not as expected!");
        if (failedSections.length > 0) {
          console.log("Failed Sections: ", failedSections.join(", "));
          cy.log("Failed Sections: " + failedSections.join(", "));
        }
      }
    });
  }

  verifyRoleBasedEmployeeDashboard() {
    let allPass = true;
    let failedSections = [];
    const sidebarModules = [
      "Dashboard",
      "Report",
      "Management",
      "Performance Metrics",
      "Recording Report",
      "Exclude Number",
    ];
    // Visible cards
    const cards = [
      "Total Call Duration",
      "Total Connected Call",
      "Number Of Employees",
    ];

    // Filters
    const filters = ["Select Team", "Select Employee"];

    // Graph headings
    const graphHeadings = [
      "Overall Calls Volumes",
      "Agent Performance",
      "Most Active Hour By Calls",
    ];

    // Summary labels (update class if unique per block)
    const summaryBlocks = [
      "Top Caller",
      "Top Dialer",
      "Highest Call Duration",
      "Top Answered",
    ];

    // Table columns (based on actual header text)
    const tableColumns = [
      "SN.",
      "Agent Name",
      "Team",
      "Unique Call",
      "Total Duration",
      "Avg Call Duration",
      "Total Call",
      "Connected Call",
      "Incoming Call",
      "Outgoing Call",
      "Missed Call",
      "Not Attempted Call",
      "Rejected Call",
      "Not Picked Up By Client",
    ];

    // --- Sidebar modules robust check
    cy.get(
      "ul.navbar-nav.sn-side-menu-barrr li.nav-item a.menu-link span"
    ).then(($spans) => {
      const allSidebarText = $spans
        .map((i, el) => Cypress.$(el).text().trim())
        .get();
      if (
        !Helper.logAndCompare("Sidebar Modules", sidebarModules, allSidebarText)
      )
        allPass = false;
      failedSections.push("Sidebar Modules");
      sidebarModules.forEach((module) => {
        try {
          expect(allSidebarText).to.include(module);
        } catch (e) {
          allPass = false;
          if (failedSections.includes("Sidebar Modules"))
            failedSections.push("Sidebar Modules");
        }
      });
    });

    // Cards
    cy.get(".sn-avg-unique-mumber-call .card .card-body p.mb-1").then(
      ($titles) => {
        const actualCards = $titles
          .map((i, el) => Cypress.$(el).text().trim())
          .get();
        // Log and compare (assuming you have imported Helper)
        if (!Helper.logAndCompare("Cards", cards, actualCards)) allPass = false;
        failedSections.push("Cards");
        // Standard assertion (optional)
        cards.forEach((card) => {
          try {
            expect(actualCards).to.include(card);
          } catch (e) {
            allPass = false;
            if (!failedSections.includes("Cards")) failedSections.push("Cards");
          }
        });
      }
    );

    // Filters (should  exist for ROle Based employee)
    // Filters - Robust Log & Compare
    cy.get("label").then(($labels) => {
      // Get all label texts (trimmed)
      const actualLabels = $labels.toArray().map((l) => l.textContent.trim());
      if (!Helper.logAndCompare("Filters", filters, actualLabels))
        allPass = false;
      failedSections.push("Filters");

      // Individually assert each expected filter label is present
      filters.forEach((label) => {
        try {
          expect(actualLabels).to.include(label);
          // Or for visibility on page, you can also do:
          cy.contains("label", label).should("be.visible");
        } catch (e) {
          allPass = false;
          if (!failedSections.includes("Filters")) failedSections.push("Filters");
        }
      });
    });

    cy.wait(500);

    // Graph headings
    cy.get(".card-title.mb-0").then(($titles) => {
      const actual = $titles.map((i, el) => Cypress.$(el).text().trim()).get();
          if (!Helper.logAndCompare("Graph Headings", graphHeadings, actual)) {
      allPass = false;
      if (!failedSections.includes("Graph Headings")) failedSections.push("Graph Headings");
    }

    graphHeadings.forEach((heading) => {
      try {
        expect(actual, `Missing heading: ${heading}`).to.include(heading);
      } catch (e) {
        allPass = false;
        if (!failedSections.includes("Graph Headings"))
          failedSections.push("Graph Headings");
        // (optional) console.log(`Missing heading: ${heading}`);
      }
    });

    });
    cy.wait(500);

    // Summary blocks by class (all use same class in DOM)
    cy.get("p.top-caller-title-top").then(($summary) => {
      const actual = $summary.map((i, el) => Cypress.$(el).text().trim()).get();
      if (!Helper.logAndCompare("Summary Blocks", summaryBlocks, actual))
        allPass = false;
      failedSections.push("Summary Blocks");
      summaryBlocks.forEach((label) => {
        try {
          expect(actual.some((txt) => txt.includes(label))).to.be.true;
        } catch (e) {
          if (!failedSections.includes("Summary Blocks"))
            failedSections.push("Summary Blocks");
        }
      });
    });
    cy.wait(500);

    // Table columns (robust check)
    cy.get(
      '.rdt_TableHeadRow span, .rdt_TableHeadRow span[data-bs-toggle="tooltip"]'
    ).then(($spans) => {
      const actual = $spans
        .map((i, el) => Cypress.$(el).text().trim())
        .get()
        .filter((text) => text !== "" && text !== "▲"); // 💡 remove empty and arrow

      if (!Helper.logAndCompare("Table Columns", tableColumns, actual))
        allPass = false;
      failedSections.push("Table Columns");
      tableColumns.forEach((col) => {
        try {
          expect(actual, `Missing column: ${col}`).to.include(col);
        } catch (e) {
          if (!failedSections.includes("Table Column"))
            failedSections.push("Table Column");
        }
      });
    });

    cy.wait(500);

    // Action buttons:
    // View All (span, class: ms-3)
    cy.get("span.ms-3").should("contain.text", "View All").and("be.visible");
    // Export buttons
    cy.get("button.tble-export1").should("exist"); // Excel
    cy.get("button.tble-export2").should("exist"); // PDF
    // Share button (uncomment if present as button or link)
    // cy.contains('button, a, span', 'Share').should('exist');

    cy.wait(500);
    cy.then(() => {
      if(allPass){
      console.log("✅ RoleBasedEmployee Dashboard UI verified!");
      cy.log("✅ RoleBasedEmployee Dashboard UI verified!");
      }else{
        console.log("❌ RoleBasedEmployee Dashboard UI not as expected!");
        cy.log("❌ RoleBasedEmployee Dashboard UI not as expected!");
      if (failedSections.length > 0) {
        console.log("Failed Sections: ", failedSections.join(", "));
        cy.log("Failed Sections: " + failedSections.join(", "));
      }
    }
    });
  }
}

export default new DashboardPage();
