/// <reference types="cypress" />

import {
  registerDashboardIntercepts,
  waitDashboardIntercepts,
} from "../../support/routes/intercepts.routes"; // if using the routes layer
import EmployeeFilter from "../../common_components/EmployeeFilter";
import TeamFilter from "../../common_components/TeamFilter";
import DateRangePicker from "../../common_components/DateRangePicker";

const emp = new EmployeeFilter();
const team = new TeamFilter();
const range = new DateRangePicker();

describe("Dashboard - default load and sections", () => {
  beforeEach(() => {
    const role = Cypress.env("role");
    if (role === "admin") {
      cy.log("**Logging in as ADMIN**");
    } else if (role === "employee") {
      cy.log("**Logging in as EMPLOYEE**");
    } else {
      cy.log("**Logging in with unknown role: " + role + "**");
    }
    cy.loginWithRole(Cypress.env("ENV"), role);

    // 1) Register intercepts first, then visit, then wait for data
    registerDashboardIntercepts(); // empTable, callHours, empReport, pieChart
    cy.visit("/dashboard");
    cy.wait(["@empTable", "@pieChart", "@TopPerformers"], {
      requestTimeout: 60000,
    });
    // Optional: conditionally wait for others if they exist:
    cy.get("body").then(($b) => {
      // if chart element exists, likely its API fired:
      if ($b.find('[data-cy="chart-active-hours"]').length) {
        cy.wait("@callHours", { requestTimeout: 40000 });
      }
    });
  });

  // it("Header: title, share button, username", () => {
  //   // Title inside a visible header container
  //   cy.log("**1. Check page title**");
  //   cy.get(".sn-title-page-main-head h4:visible")
  //     .invoke("text")
  //     .then((Actual_Title) => {
  //       const title = Actual_Title.trim();
  //       cy.log(`Page title: ${title}`);
  //       // optional strong assertion if needed
  //       expect(title).to.eq("DASHBOARD");
  //     });

  //   // Share button visible in topbar (not in hidden dropdown)
  //   cy.log("2. Check Share button visible");
  //   cy.get(".sn-sales-ninja-share-btn > a")
  //     .should("be.visible")
  //     .and("contain", "Share");

  //   // Username: read from visible topbar area (not dropdown)
  //   cy.log("3. Check username and user code");
  //   const topbar = ".header-item.topbar-user";
  //   cy.get(topbar).within(() => {
  //     // Visible username text span
  //     cy.get(".user-name-text:visible")
  //       .invoke("text")
  //       .then((t) => t?.trim() || "")
  //       .then((name) => {
  //         cy.log(`Username: ${name}`);
  //         expect(name).to.have.length.greaterThan(0); // ensure not empty [web:83]
  //       });
  //     // Visible user code line (optional)
  //     cy.get(".user-name-sub-text:visible span")
  //       .invoke("text")
  //       .then((t) => t?.trim() || "")
  //       .then((code) => {
  //         cy.log(`User code: ${code}`);
  //         expect(code).to.have.length.greaterThan(0);
  //       });
  //   });
  // });

  // it('Filters: team, employee default "All items are selected" and date = today', () => {

  //   // Team filter default
  //   cy.log("1. Check Team filter default selection");
  //   cy.get(":nth-child(1) > .col-sm-auto").should(
  //     "contain.text",
  //     "All items are selected."
  //   );
  //   // Print dropdown options (opens menu, lists items)
  //   cy.log("Team Dropdown options:");
  //   team.open();
  //   cy.get(".dropdown-content").each(($li) =>
  //     cy.log(`Team option: ${$li.text().trim()}`)
  //   );
  //   cy.get("body").click(0, 0); // close

  //   // Employee filter default
  //   cy.log("2. Check Employee filter default selection");
  //   cy.log("Check Employee filter default selection");
  //   cy.get(":nth-child(2) > .col-sm-auto").should(
  //     "contain.text",
  //     "All items are selected."
  //   );
  //   // Print dropdown options (opens menu, lists items)
  //   cy.log("Employee Dropdown options:");
  //   emp.open();
  //   cy.get(".dropdown-content").each(($li) =>
  //     cy.log(`Employee option: ${$li.text().trim()}`)
  //   );
  //   cy.get("body").click(0, 0);

  //   // Date range default = today (assumes control shows "YYYY-MM-DD -> YYYY-MM-DD")
  //   cy.log("3. Check Date range filter default selection");
  //   const today = new Date().toISOString().slice(0, 10);
  //   cy.get(".col-md-6 > .col-sm-auto")
  //     .invoke("val")
  //     .then((val) => {
  //       cy.log(`Date range control: ${val || "(custom component display)"}`);
  //     });
  //   cy.get(
  //     ".ant-picker > :nth-child(1) > input" && ":nth-child(3) > input"
  //   ).should(($el) => {
  //     const txt = $el.val() || $el.text();
  //     expect(txt).to.include(today);
  //   });

  //   // Show and Reset buttons visible
  //   cy.log("4. Check Show and Reset buttons visible");
  //   cy.get(".btn-danger").should("be.visible").and("contain", "Show");
  //   cy.get(".btn-soft-danger")
  //     .should("be.visible")
  //     .within(() => cy.get("i.ri-refresh-line").should("exist"));
  // });

  // it("Pie chart present and prints legend + values (short)", () => {
  //   const chart = "#portfolio_donut_charts";

  //   // visible checks
  //   cy.get(".col-md-3 > .card > :nth-child(2)").should("be.visible");
  //   cy.get(chart).should("be.visible");

  //   // Total (center text)
  //   cy.get(`${chart} .apexcharts-datalabel-value`)
  //     .invoke("text")
  //     .then((t) => cy.log(`Total Calls: ${t.trim()}`));

  //   // Legend labels
  //   cy.get(`${chart} .apexcharts-legend-text`).then(($labels) => {
  //     const labels = [...$labels].map((el) => (el.textContent || "").trim());

  //     // Slices: data:value attribute with escaped colon
  //     cy.get(`${chart} .apexcharts-slices path[data\\:value]`).then(
  //       ($paths) => {
  //         const values = [...$paths].map((p) =>
  //           Number(p.getAttribute("data:value") || 0)
  //         );

  //         labels.forEach((label, i) => cy.log(`${label}: ${values[i] ?? 0}`));

  //         // Optional checks
  //         expect(labels).to.include.members([
  //           "OUTGOING",
  //           "INCOMING",
  //           "MISSED",
  //           "REJECTED",
  //         ]); // legend set
  //         values.forEach((v) => expect(v).to.be.gte(0)); // non-negative
  //       }
  //     );

  //   });
  // });

  // it("KPIs: Total Call Duration, Total Connected, Number of EmployeesFF (print values)", () => {
  //   let duration = "",
  //     connected = "",
  //     employees = "";

  //   cy.contains(".avg-call-duration .card-body p", /^Total Call Duration$/i)
  //     .parents(".flex-grow-1")
  //     .find("h4.mb-0 div:first-child")
  //     .invoke("text")
  //     .then((t) => {
  //       duration = t.trim();
  //     });
  //   cy.then(() => {
  //     cy.log(`Total Call Duration: ${duration}`);
  //   });

  //   cy.contains(".avg-unique-call .card-body p", /^Total Connected Call$/i)
  //     .parents(".flex-grow-1")
  //     .find("h4.mb-0 div:first-child")
  //     .invoke("text")
  //     .then((t) => {
  //       connected = t.trim();
  //     });
  //   cy.then(() => {
  //     cy.log(`Total Connected Call: ${connected}`);
  //   });

  //   cy.contains(".number-of-employee .card-body p", /^Number Of Employees$/i)
  //     .parents(".flex-grow-1")
  //     .find("h4.mb-0 div:first-child")
  //     .invoke("text")
  //     .then((t) => {
  //       employees = t.trim();
  //     });
  //   cy.then(() => {
  //     cy.log(`Number Of Employees: ${employees}`);
  //   });

  //   // After the three reads, log once
  //   cy.then(() => {
  //     cy.log(
  //       `Total Call Duration: ${duration} | Total Connected Call: ${connected} | Number Of Employees: ${employees}`
  //     );
  //   });
  // });

  // it("Overall Calls Volumes: table with totals (also console.log)", () => {
  //   cy.contains("h4.card-title", /^Overall Calls Volumes$/i)
  //     .should("be.visible")
  //     .closest(".card")
  //     .as("overallCard");

  //   cy.get("@overallCard").find("svg, canvas").should("exist");

  //   const parsePoint = (label) => {
  //     const m = String(label || "").match(/^(.+?),\s*([\d.]+)\./);
  //     return m
  //       ? { time: m[1], value: Number(m[2]) }
  //       : { time: "N/A", value: NaN };
  //   };

  //   cy.get("@overallCard").then(($card) => {
  //     const doc = $card[0];
  //     const q = (sel) => [...doc.querySelectorAll(sel)];
  //     const incoming = q(".highcharts-series-0 .highcharts-point").map((p) =>
  //       parsePoint(p.getAttribute("aria-label"))
  //     );
  //     const outgoing = q(".highcharts-series-1 .highcharts-point").map((p) =>
  //       parsePoint(p.getAttribute("aria-label"))
  //     );
  //     const rejected = q(".highcharts-series-2 .highcharts-point").map((p) =>
  //       parsePoint(p.getAttribute("aria-label"))
  //     );
  //     const missed = q(".highcharts-series-3 .highcharts-point").map((p) =>
  //       parsePoint(p.getAttribute("aria-label"))
  //     );

  //     const len = Math.min(
  //       incoming.length,
  //       outgoing.length,
  //       rejected.length,
  //       missed.length
  //     );
  //     const rows = [];
  //     for (let i = 0; i < len; i++) {
  //       rows.push({
  //         time: incoming[i].time,
  //         in: incoming[i].value,
  //         miss: missed[i].value,
  //         out: outgoing[i].value,
  //         rej: rejected[i].value,
  //       });
  //     }

  //     // Filter bad rows and compute totals
  //     const valid = rows.filter(
  //       (r) =>
  //         r.time !== "N/A" &&
  //         Number.isFinite(r.in) &&
  //         Number.isFinite(r.miss) &&
  //         Number.isFinite(r.out) &&
  //         Number.isFinite(r.rej)
  //     );

  //     const sum = (k) => valid.reduce((a, r) => a + r[k], 0);

  //     // Map to display objects with full column names for console.table
  //     const displayRows = valid.map((r) => ({
  //       Time: r.time,
  //       "Incoming calls": r.in,
  //       "Missed calls": r.miss,
  //       "Outbound calls": r.out,
  //       "Rejected calls": r.rej,
  //     }));
  //     const totals = {
  //       Time: "Total",
  //       "Incoming calls": sum("in"),
  //       "Missed calls": sum("miss"),
  //       "Outbound calls": sum("out"),
  //       "Rejected calls": sum("rej"),
  //     };

  //     // 1) Pretty console table with full headers and forced order
  //     console.table(displayRows.concat(totals), [
  //       "Time",
  //       "Incoming calls",
  //       "Missed calls",
  //       "Outbound calls",
  //       "Rejected calls",
  //     ]); // custom headers and selected columns are supported by console.table [web:160][web:164][web:155]

  //     // 2) Markdown for cy.log, same full headers and order
  //     cy.log(
  //       "| Time | Incoming calls | Missed calls | Outbound calls | Rejected calls |"
  //     );
  //     cy.log("| :--- | ---: | ---: | ---: | ---: |");
  //     displayRows.forEach((r) => {
  //       cy.log(
  //         `| ${r["Time"]} | ${r["Incoming calls"]} | ${r["Missed calls"]} | ${r["Outbound calls"]} | ${r["Rejected calls"]} |`
  //       );
  //     });
  //     cy.log(
  //       `| ${totals["Time"]} | ${totals["Incoming calls"]} | ${totals["Missed calls"]} | ${totals["Outbound calls"]} | ${totals["Rejected calls"]} |`
  //     );
  //   });
  // });

  // it("Metric cards (Top Caller/Dialer/Highest Duration/Top Answered) and print data", () => {
  //   const metrics = [
  //     { key: "top-caller", label: "Top Caller" },
  //     { key: "top-dialer", label: "Top Dialer" },
  //     { key: "highest-duration", label: "Highest Call Duration" },
  //     { key: "top-answered", label: "Top Answered" },
  //   ];
  //   metrics.forEach((m) => {
  //     cy.get(`[data-cy="metric-${m.key}"]`)
  //       .should("be.visible")
  //       .within(() => {
  //         cy.contains(m.label, { matchCase: false });
  //         cy.get('[data-cy="metric-name"]')
  //           .invoke("text")
  //           .then((name) => {
  //             cy.get('[data-cy="metric-value"]')
  //               .invoke("text")
  //               .then((val) => {
  //                 cy.log(`${m.label}: ${name.trim()} (${val.trim()})`);
  //               });
  //           });
  //       });
  //   });
  // });

  // it("Agent Performance table: print rows, filter by status buttons (red=inactive, green=active), and View All", () => {
  //   const table = '[data-cy="table-agent-performance"]';

  //   // Table visible and print first 5 rows
  //   cy.get(table).should("be.visible");
  //   cy.get(`${table} tbody tr`).each(($tr, idx) => {
  //     if (idx < 5) {
  //       const rowText = $tr.text().replace(/\s+/g, " ").trim();
  //       cy.log(`Row ${idx + 1}: ${rowText}`);
  //     }
  //   });

  //   // Active/Inactive filter buttons
  //   cy.get('[data-cy="btn-active-users"]').should("be.visible").click();
  //   cy.get(`${table} tbody tr`).each(($tr) =>
  //     cy.log(`Active row: ${$tr.text().replace(/\s+/g, " ").trim()}`)
  //   );

  //   cy.get('[data-cy="btn-inactive-users"]').should("be.visible").click();
  //   cy.get(`${table} tbody tr`).each(($tr) =>
  //     cy.log(`Inactive row: ${$tr.text().replace(/\s+/g, " ").trim()}`)
  //   );

  //   // View All
  //   cy.get('[data-cy="btn-view-all"]').should("be.visible").click();
  //   cy.get(`${table} tbody tr`)
  //     .its("length")
  //     .then((len) => cy.log(`Total rows after View All: ${len}`));
  // });

  // it("Most Active Hour By Calls chart and legend (print series labels if visible)", () => {
  //   cy.get('[data-cy="chart-active-hours"]').should("be.visible");
  //   cy.get(
  //     '[data-cy="chart-active-hours"] svg, [data-cy="chart-active-hours"] canvas'
  //   ).should("exist");
  //   cy.get('[data-cy="chart-active-hours"]').within(() => {
  //     cy.contains("Outgoing Call", { matchCase: false });
  //     cy.contains("Incoming Call", { matchCase: false });
  //     cy.contains("Missed Call", { matchCase: false });
  //     cy.contains("Rejected Call", { matchCase: false });
  //     cy.contains("Not Picked Call", { matchCase: false });
  //   });
  // });
});
