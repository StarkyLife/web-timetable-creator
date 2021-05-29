import {
    defineStep,
    Given,
    Then,
    When,
} from 'cypress-cucumber-preprocessor/steps';

Given('пользователь открыл пустое расписание', () => {
    cy.visit('/new');
});

defineStep('(он )добавит/добавил предмет c названием {string}', (subjectName: string) => {
    cy.get('[data-test-id="new-subject"]').type(`${subjectName}{enter}`);
});

When('он сохранит и переоткроет текущее расписание', () => {
    throw new Error('Not implemented!');
});
When('он удалит предмет c названием {string}', () => {
    throw new Error('Not implemented!');
});

Then('{string} должна быть в списке предметов', (subjectName: string) => {
    cy.get('[data-test-id="subjects-list"]').contains(subjectName);
});
Then('{string} должна отсутствовать в списке предметов', () => {
    throw new Error('Not implemented!');
});
