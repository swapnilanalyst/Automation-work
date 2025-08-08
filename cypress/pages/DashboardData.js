// cypress/pages/DashboardPage.js

import { getApiUrl, getLoginApiUrl } from "../allRouts/apiConfig";

class DashboardData {
  // --- Admin data validation test (data + UI match) ---
  verifyAdminDashboardData() {
    // Step 1: Login & Get Token
    cy.log("🔑 Step 1: Login & Get Token from API");
    cy.request("POST", getLoginApiUrl("admin"), {
      email: Cypress.env("live").admin.email,
      password: Cypress.env("live").admin.password,
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
        }

        const limit = employeeIds.length;
        const page = 1;

        cy.log("✅ Employee IDs: " + employeeIds.join(", "));
        cy.log(`📄 Pagination — Page: ${page}, Limit: ${limit}`);

        // Step 3: Get Card/Pie Chart Data
        cy.log("📊 Step 3: Get Cards Data (summary, pie) from API");
        const todayB = new Date().toISOString().split("T")[0];
        cy.request({
          method: "POST",
          url: getApiUrl("dashboardPieChart"),
          headers: { Authorization: `Bearer ${token}` },
          body: {
            startDate: todayB,
            endDate: todayB,
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

        cy.wait(3000);

        // Step 5: Summary Blocks Data
        cy.log("🏆 Step 5: Compare Summary Blocks");
        const today = new Date();
        const start = new Date(today.setHours(0, 0, 0, 0)).getTime();
        const end = new Date(today.setHours(23, 59, 59, 999)).getTime();
        cy.request({
          method: "POST",
          url: getApiUrl("summaryBlocks"),
          headers: { Authorization: `Bearer ${token}` },
          body: { startRange: start, endRange: end, employeeIds },
        }).wait(500).then((summaryResp) => {
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
            const expectedName = getSafeName(summary[key]);
            const expectedCount = getSafeCount(summary[key]);
            const expectedDuration = formatDuration(summary[key]?.count);

            cy.get("p.top-caller-title-top")
              .eq(i)
              .parents(".sn-top-performance-card-new-design")
              .within(() => {
                // Name actual le lo UI se
                cy.get("h5.mb-0.text-black").should("have.text", expectedName);

                if (key === "highestCallDuration") {
                  // Duration value check karo (actual UI se)
                  cy.get("h6.fw-semibold span")
                    .invoke("text")
                    .then((actualDuration) => {
                      cy.log(
                        `[${i}] [${key}] Duration: Expected = "${expectedDuration}" | Actual = "${actualDuration}"`
                      );
                      expect(actualDuration).to.equal(expectedDuration);
                    });
                } else {
                  // Count value check karo (actual UI se)
                  cy.get("h6.fw-semibold span")
                    .invoke("text")
                    .then((actualCount) => {
                      cy.log(
                        `[${i}] [${key}] Count: Expected = "${expectedCount}" | Actual = "${actualCount}"`
                      );
                      expect(actualCount).to.equal(expectedCount);
                    });
                }
              });
          });
        });

       cy.log("👨‍💼 Step 6: Validate Agent Performance Table");
       const todayD = new Date().toISOString().split("T")[0];

        cy.request({
          method: "POST",
          url: `${getApiUrl("agentPerformance")}?pg=${page}&lm=${limit}`,
          headers: { Authorization: `Bearer ${token}` },
          body: {
              startDate: todayD,
              endDate: todayD,
            employeeIds,
          },
        }).then((perfResp) => {
          const perfList = perfResp.body.data;
          cy.log("📊 Total Agents Found: " + perfList.length);

          perfList.forEach((agent, idx) => {
            const uiIndex = idx % 10;
            const srNoExpected = (page - 1) * limit + (idx + 1);

            cy.wait(1000);
            cy.log(`🧾 Row #${srNoExpected}: ${agent.fullName}`);
            console.log(`Agent API Data [#${srNoExpected}]:`, agent);

            cy.get(".rdt_TableBody .rdt_TableRow").contains('button', 'Select All').click().eq(uiIndex)
            .within(() => {
              cy.get("div.rdt_TableCell").then(($cells) => {
                const getSanitizedText = (el) =>
                  el.text().trim() === "-" ? "0" : el.text().trim();
                const getText = (i) =>
                  getSanitizedText($cells.eq(i)).replace(/\s+/g, " ");

                // 1. Sr. No.
                expect(getText(0)).to.eq(srNoExpected.toString());

                // 2. Agent Name
                const name = $cells.eq(1).find("h5").text().trim();
                expect(name).to.eq(agent.fullName);

                // 3. Team Name
                const expectedTeamText = agent.team.map(t => t.replace(/\s+/g, "")).join("").trim();
                const uiTeamText = getText(2).replace(/\s+/g, "").trim();
                expect(uiTeamText).to.contain(expectedTeamText);
                // Team (trimmed and formatted)

                // 4. Unique Clients
                expect(getText(3)).to.eq((agent.uniqueClient ?? 0).toString());

                // 5. Total Calls
                expect(getText(6)).to.eq((agent.totalCall ?? 0).toString());

                // 6. Connected Calls
                expect(getText(7)).to.eq((agent.connectedCalls ?? 0).toString());

                // 7. Incoming
                expect(getText(8)).to.eq((agent.totalIncomingCall ?? 0).toString());

                // 8. Outgoing
                expect(getText(9)).to.eq((agent.totalOutgoingCall ?? 0).toString());

                // 9. Missed
                expect(getText(10)).to.eq((agent.totalMissedCall ?? 0).toString());

                // 10. Never Attended
                expect(getText(11)).to.eq((agent.neverAttended ?? 0).toString());

                // 11. Rejected
                expect(getText(12)).to.eq((agent.totalRejectedCall ?? 0).toString());

                // 12. Not Picked by Client
                expect(getText(13)).to.eq((agent.totalNotPickedUpByClient ?? 0).toString());
              });
            });

            // // ➡️ Click "Next Page" after every 10 agents
            // if ((idx + 1) % 10 === 0 && idx < perfList.length) {
            //   cy.get("#pagination-next-page").click();
            // cy.wait(500); // brief wait to trigger load

            // cy.get(".rdt_TableRow").eq(0).within(() => {
            //   cy.get(".rdt_TableCell").eq(0)
            //     .should("be.visible")
            //     .should("contain", ((page) * limit + 1));
            // }); // e.g., "11"
            // }
          });  
        });

      });
    });
  }
}

export default new DashboardData();
