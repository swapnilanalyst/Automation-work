const { defineConfig } = require("cypress");
const fs = require("fs");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  // ✅ Use only Mochawesome as reporter
  reporter: "cypress-mochawesome-reporter", // 🔁 FIXED: Removed cypress-multi-reporters

  reporterOptions: {
    reportDir: "cypress/reports/mochawesome",
    overwrite: false,
    html: true,
    json: true,
  },

  e2e: {
    pageLoadTimeout: 120000,

    setupNodeEvents(on, config) {
      const envData = JSON.parse(fs.readFileSync("./cypress.env.json", "utf8"));
      const envName = envData.ENV || "dev";
      const envConfig = envData[envName];

      if (!envConfig?.baseUrl) {
        throw new Error(`baseUrl missing for "${envName}" environment`);
      }

      config.baseUrl = envConfig.baseUrl;
      config.env = { ...config.env, ...envData };

      on("task", {
        logToTerminal(message) {
          console.log(message);
          return null;
        },
        logTable(data) {
          console.table(data);
          return null;
        },
      });

      // ✅ Mochawesome setup
      require("cypress-mochawesome-reporter/plugin")(on);

      // ✅ Allure plugin setup (but NOT as a reporter!)
      allureWriter(on, config); // 🔁 FIXED: Use as plugin, not in reporterOptions

      return config;
    },
  },
});
