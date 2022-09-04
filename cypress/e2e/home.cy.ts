/// <reference types="cypress" />

describe("empty spec", () => {
  it("should be able to fill and submit", () => {
    cy.visit("/");
    cy.get("input[name=originCity]").type("pa");
    cy.contains("Paris").click();

    cy.get("input[name='destinationCities[0]']").type("ma");
    cy.contains("Marseille").click();

    cy.contains("Add destination").click();
    cy.get("input[name='destinationCities[1]']").type("ly");
    cy.contains("Lyon").click();

    cy.get("input[name=passengerCount]").type("{backspace}3");

    const now = new Date();
    const localDate = now.toLocaleDateString();
    const isoDate = new Date(localDate).toISOString();

    cy.get("input[name=date]").type(localDate);

    cy.location().should((loc) => {
      expect(loc.hash).to.eq(
        `#/?originCity=Paris&destinationCities=Marseille&destinationCities=Lyon&date=${encodeURIComponent(
          isoDate,
        )}&passengerCount=3`,
      );
    });
    cy.contains("Submit").click();

    cy.location().should((loc) => {
      expect(loc.hash).to.eq(
        `#/result?originCity=Paris&destinationCities=Marseille&destinationCities=Lyon&date=${encodeURIComponent(
          isoDate,
        )}&passengerCount=3`,
      );
    });
  });
});
