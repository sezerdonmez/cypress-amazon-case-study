import "./commands";
import "cypress-mochawesome-reporter/register";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});
