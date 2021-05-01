import { When, Then } from 'cypress-cucumber-preprocessor/steps';

When('go to app page', () => {
    cy.visit('/');
});
Then('see the title', () => {
    cy.contains('Список расписаний');
});
