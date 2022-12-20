let loginElements = require("../fixtures/elements/login.json");
let homeElements = require("../fixtures/elements/home.json");
let listElements = require("../fixtures/elements/list.json");
let searchElements = require("../fixtures/elements/search.json");
let productElements = require("../fixtures/elements/product.json");

const preserveCookies = [
  "session-token",
  "session-id",
  "session-id-time",
  "sst-acbtr"
];

before(() => {
  cy.preserveCookies(preserveCookies);
});

after(() => {
  cy.clearCookies();
});

describe("Add and Delete Item to Existed List", () => {
  const listName = "Test Automation";
  const computerDropdownValue = "Computers";
  const searchKeyword = "msi";

  before(() => {
    cy.loginToWebsite(loginElements, homeElements);
  });

  it(`Visit Amazon Home page`, () => {
    cy.visit("/");
    cy.title().should("include", "Amazon");
  });
  it(`Hover mouse to your account navigation`, () => {
    cy.get(homeElements.yourAccountButton)
      .trigger("mouseover");
    cy.get(homeElements.createListButton)
      .should("be.visible");
  });
  it(`Select ${computerDropdownValue} option on Category dropdown box`, () => {
    cy.get(homeElements.searchCategoryDropdown)
      .select(computerDropdownValue, {force : true});
    cy.get(homeElements.searchCategoryDropdownSelected)
      .should("include.text", computerDropdownValue); 
  });
  it(`Type ${searchKeyword} keyword to search input`, () => {
    cy.typeTextToGivenInput(homeElements.searchBox, searchKeyword);
  });
  it(`Click on search submit button`, () => {
    cy.get(homeElements.searchButton)
      .click();
    cy.get(searchElements.searchedKeyword)
      .should("be.visible")
      .and("include.text", searchKeyword);
  });
  it(`Click on second page button`, () => {
    cy.get(searchElements.secondPagePagination)
      .first()
      .scrollIntoView()
      .click();
    cy.get(searchElements.paginationSelectedPage)
      .invoke("attr", "aria-label")
      .should("include", "2");
    cy.get(searchElements.productImages).each(($productImage, index) => {
      // Wait for only first 7 product images to be loaded.
      if (index > 8)
        return 1;
      cy.wrap($productImage)
        .should("have.prop", "naturalWidth")
        .and("be.greaterThan", 0);
    })
  });
  it(`Click on second product on Search Page`, () => {
    cy.get(searchElements.searchProductsTitles)
      .eq(1)
      .invoke("text")
      .as("selectedProductText");
    cy.get(searchElements.searchProductsCards)
      .eq(1)
      .click();
    cy.get("@selectedProductText").then($searchPageProductText => {
      cy.get(productElements.productTitle)
        .should("be.visible")
        .and("include.text", $searchPageProductText);
    });
  });
  it(`Click on add to list button on Product Page`, () => {
    cy.get(productElements.addToListButton)
      .should("be.visible")
      .click();
    cy.get(productElements.addToListPopUp)
      .should("be.visible");
  });
  it(`Check that the titles are equal on Product Page and Add to List Pop Up`, () => {
    cy.get(productElements.addToListPopUpProductName)
      .invoke("text")
      .then($productName => {
        cy.get(productElements.productTitle)
          .as("productTitle")
          .should("include.text", $productName);
      });
  });
  it(`Click on View your list button on Pop Up`, () => {
    cy.get(productElements.viewYourListButton)
      .click();
    cy.get(listElements.listName)
      .should("be.visible")
      .and("have.text", listName);
  });
  it(`Hover mouse to More button on List Page`, () => {
    cy.get(listElements.moreButton)
      .trigger("mousedown", "center");
    cy.get(listElements.manageListButton)
      .should("not.be.visible");
  });
  it(`Click on Delete last added items button`, () => {
    cy.get(listElements.deleteItemInList)
      .each(($item => {
        // Delete last added all items.
        $item.trigger("click");
      }))
    cy.contains("Deleted")
      .first()
      .should("be.visible");
  });
  it(`Reload page and check that the List is empty`, () => {
    cy.reload();
    cy.get(listElements.emptyListSection)
      .should("be.visible");
  });
});