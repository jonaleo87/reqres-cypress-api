import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    screenshotOnRunFailure: false,
  },
  env: {
    baseUrl: process.env.baseUrl || "https://reqres.in",
  },
});
