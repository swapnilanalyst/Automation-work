// cypress/pages/DashboardPage.js

import { getApiUrl, getLoginApiUrl } from "../allRouts/apiConfig";

class DashboardData {
  // --- Admin data validation test (data + UI match) ---
  verifyAdminDashboardData() {
    // Step 1: Login & Get Token
    cy.log("🔑 Step 1: Login & Get Token from API");
    cy.request("POST", getLoginApiUrl("admin"), {
      email: Cypress.env("dev").admin.email,
      password: Cypress.env("dev").admin.password,
    }).then((loginResp) => {
      const token = loginResp.body.data.token;

      // Step 2: Get Employee IDs
      cy.log("👥 Step 2: Get Employee IDs from API");
      cy.request({
        method: "GET",
        url: getApiUrl("getEmployeeNames"),
        headers: { Authorization: `Bearer ${token}` },
      }).then((empResp) => {
        const employeeIds = empResp.body.data.map((e) => e._id);
        if (!employeeIds.length) {
          cy.log("❌ Koi employee ID nahi mili!").then(() => {
            throw new Error("No employee IDs found in API response");
          });
        } else {
          cy.log("✅ Employee IDs: " + employeeIds.join(", "));
        }

        // Step 3: Get Card/Pie Chart Data
        cy.log("📊 Step 3: Get Cards Data (summary, pie) from API");
        cy.request({
          method: "POST",
          url: getApiUrl("dashboardPieChart"),
          headers: { Authorization: `Bearer ${token}` },
          body: {
            startDate: "2025-06-01",
            endDate: "2025-07-11",
            employeeIds,
          },
        }).then((cardResp) => {
          function toHHMMSS(sec) {
            if (!sec || isNaN(sec)) return "00:00:00";
            const h = String(Math.floor(sec / 3600)).padStart(2, "0");
            const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
            const s = String(sec % 60).padStart(2, "0");
            return `${h}:${m}:${s}`;
          }

          const apiData = cardResp.body.data;

          // Step 4: UI vs API — Card Validation
          cy.log("✅ Step 4: Compare UI & API Cards Value");

          // Total Call Duration (formatting!)
          cy.get(".sn-avg-unique-mumber-call .card")
            .eq(0)
            .find("h4 div")
            .first() // Yeh "00:00:00" wale div ko pakdega
            .should("have.text", toHHMMSS(apiData.totalCallDuration));

          // Total Connected Call
          cy.get(".sn-avg-unique-mumber-call .card")
            .eq(1)
            .find("h4 div")
            .first()
            .should("have.text", String(apiData.totalConnectedCalls));

          // Number Of Employees
          cy.get(".sn-avg-unique-mumber-call .card")
            .eq(2)
            .find("h4 div")
            .first()
            .should("have.text", String(apiData.numberOfEmpLoyees));
        });

        // Step 5: Summary Blocks Data
        cy.log("🏆 Step 5: Compare Summary Blocks");
        cy.request({
          method: "POST",
          url: getApiUrl("summaryBlocks"),
          headers: { Authorization: `Bearer ${token}` },
          body: { employeeIds },
        }).then((summaryResp) => {
          const summary = summaryResp.body.data;
          // Name (hyphen for null)
          const getSafeName = (obj) =>
            obj && obj.fullName ? obj.fullName : "-";
          // Count (0 for null)
          const getSafeCount = (obj) =>
            obj && typeof obj.count === "number" ? obj.count.toString() : "0";

          // Duration ko "Xh Ym Zs" format mein convert karo
          const formatDuration = (seconds) => {
            if (!seconds || isNaN(seconds)) return "0h 0m 0s";
            const h = Math.floor(seconds / 3600);
            const m = Math.floor((seconds % 3600) / 60);
            const s = Math.floor(seconds % 60);
            return `${h}h ${m}m ${s}s`;
          };

          const blockKeys = [
            "topCaller",
            "topDialer",
            "highestCallDuration",
            "topAnswered",
          ];

          blockKeys.forEach((key, i) => {
            cy.get("p.top-caller-title-top")
              .eq(i)
              .parents(".sn-top-performance-card-new-design")
              .within(() => {
                cy.get("h5.mb-0.text-black").should(
                  "have.text",
                  getSafeName(summary[key])
                );
                if (key === "highestCallDuration") {
                  // Duration special format
                  cy.get("h6.fw-semibold span").should(
                    "have.text",
                    formatDuration(summary[key]?.count)
                  );
                } else {
                  cy.get("h6.fw-semibold span").should(
                    "have.text",
                    getSafeCount(summary[key])
                  );
                }
              });
          });
        });

        // Step 6: Agent Performance Table (Data Level)
        cy.log("👨‍💼 Step 6: Validate Agent Performance Table");
        cy.request({
          method: "POST",
          url: getApiUrl("agentPerformance"),
          headers: { Authorization: `Bearer ${token}` },
          body: {
            startDate: "2025-06-01",
            endDate: "2025-07-11",
            employeeIds,
          },
        }).then((perfResp) => {
          const perfList = perfResp.body.data;
          perfList.forEach((agent, idx) => {
            cy.get(`.rdt_TableBody .rdt_TableRow`)
              .eq(idx)
              .within(() => {
                cy.get("span")
                  .eq(2)
                  .should("contain", agent.team[0] || "");
                cy.get("span").eq(3).should("contain", agent.uniqueClient);
                cy.get("span").eq(4).should("contain", agent.totalDuration);
                cy.get("span").eq(6).should("contain", agent.totalCall);
                // aur bhi columns yahan validate kar sakte ho
              });
          });
        });
      });
    });
  }
}

export default new DashboardData();
