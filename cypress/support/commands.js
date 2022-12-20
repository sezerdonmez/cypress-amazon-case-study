import "cypress-wait-until";

Cypress.Commands.add("typeTextToGivenInput", (locator, text) => {
  cy.get(locator).clear().should("have.value", "");
  cy.get(locator).type(text).should("have.value", text);
});

Cypress.Commands.add("preserveCookies", (cookies) => {
  Cypress.Cookies.defaults({
    preserve: cookies,
  });
});

Cypress.Commands.add("loginToWebsite", (loginElements, homeElements) => {
  cy.visit("/");
  cy.get(homeElements.signInButton).first().click();
  cy.get(loginElements.signInText)
    .should("be.visible");
  cy.typeTextToGivenInput(loginElements.emailInput, Cypress.env("email"));
  cy.get(loginElements.continueButton)
    .click();
  cy.contains(Cypress.env("email"))
    .should("be.visible");
  cy.typeTextToGivenInput(loginElements.passwordInput, Cypress.env("password"));
  cy.get(loginElements.signInButton)
    .click();
  cy.get(homeElements.accountInfo)
    .should("be.visible")
    .and("include.text", Cypress.env("userName"));
});