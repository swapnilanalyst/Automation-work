// cypress/allRouts/apiConfig.js

// ✅ All env/config yahin maintain karo
const config = {
  ENV: Cypress.env('ENV') || "dev",  // ENV Cypress config se ya default "dev"
  baseUrls: {
    dev: "http://devbackend.salesninjacrm.com",
    live: "https://service.salesninjacrm.com",
  },
  // ✅ Har role ke liye alag login endpoint
  loginEndpoints: {
    admin: "/organization/organization-login",
    employee: "/employee/login",
    roleBasedEmployee: "/employee/login",  // same endpoint as employee
  },
  // ✅ Baaki endpoints common yahan rakh do
  endpoints: {
    dashboardPieChart: "/call-reports/get-dashboard-piechart",
    agentPerformance: "/call-reports/get-employees-performance",
    summaryBlocks: "/call-reports/get-top-performer",
    getEmployeeNames: "/organization/get-employee-names"
    // ...add more as needed
  },
};

/**
 * ✅ Koi bhi endpoint chahiye to yeh function use karo
 * Example: getApiUrl("summaryCard")
 */
function getApiUrl(endpointKey) {
  const env = Cypress.env('ENV') || config.ENV;
  const baseUrl = config.baseUrls[env];
  const path = config.endpoints[endpointKey];
  if (!baseUrl) throw new Error(`❌ Invalid ENV: ${env}`);
  if (!path) throw new Error(`❌ Invalid endpoint: ${endpointKey}`);
  return `${baseUrl}${path}`;
}

/**
 * ✅ Role-wise login API lane ke liye
 * Example: getLoginApiUrl("admin")
 */
function getLoginApiUrl(role) {
  const env = Cypress.env('ENV') || config.ENV;
  const baseUrl = config.baseUrls[env];
  const loginPath = config.loginEndpoints[role];
  if (!baseUrl) throw new Error(`❌ Invalid ENV: ${env}`);
  if (!loginPath) throw new Error(`❌ Invalid role for login endpoint: ${role}`);
  return `${baseUrl}${loginPath}`;
}

/**
 * ✅ Kabhi env runtime pe change karni ho to use karo
 */
function setEnv(env) {
  if (!config.baseUrls[env]) throw new Error(`❌ Invalid ENV: ${env}`);
  config.ENV = env;
}

// ✅ Export functions taaki Cypress test me import kar sako
module.exports = {
  getApiUrl,
  getLoginApiUrl,
  setEnv,
};
