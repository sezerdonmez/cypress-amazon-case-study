let loginElements = require("../fixtures/elements/login.json");
let homeElements = require("../fixtures/elements/home.json");
let accountElements = require("../fixtures/elements/account.json");

const preserveCookies = [
  "session-token",
  "session-id"
];

before(() => {
  cy.preserveCookies(preserveCookies);
});

after(() => {
  cy.clearCookies();
});

describe("Success Login To Amazon Website", () => {
  it(`Visit Amazon Login page`, () => {
    cy.visit("/");
    cy.title().should("include", "Amazon");
    cy.get(homeElements.signInButton)
      .first()
      .should("be.visible")
      .click();
    cy.get(loginElements.signInText)
      .should("be.visible")
      .and("include.text", "Sign in");
  });
  it(`Type Email address to Email input`, () => {
    cy.typeTextToGivenInput(loginElements.emailInput, Cypress.env("email"));
  });
  it(`Click Continue button`, () => {
    cy.get(loginElements.continueButton)
      .click();
    cy.contains(Cypress.env("email"))
      .should("be.visible");
  });
  it(`Type Password to Password input`, () => {
    cy.typeTextToGivenInput(loginElements.passwordInput, Cypress.env("password"));
  });
  it(`Click Sign In button`, () => {
    cy.get(loginElements.signInButton)
      .click();
    cy.get(homeElements.accountInfo)
      .should("be.visible")
      .and("include.text", Cypress.env("userName"));
  });
  it(`Hover mouse to your account navigation`, () => {
    cy.get(homeElements.yourAccountButton)
      .trigger("mouseover");
    cy.get(homeElements.accountButton)
      .should("be.visible");
  });
  it(`Click on Account button`, () => {
    cy.get(homeElements.accountButton)
      .click();
    cy.get(accountElements.yourAccountTitle)
      .should("be.visible")
      .and("include.text", "Your Account");
  });
});