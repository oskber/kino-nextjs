describe('visits homepage', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000');
  });

  it('clicks on movie button', () => {
    cy.get(':nth-child(1) > .pl-3 > [data-cy="movie-button"]').click();
  });
  it('adds comment', () => {
    cy.get('[data-cy="name-input"]').type('Test');
    cy.get('[data-cy="comment-input"]').type('success-1122334455');
    cy.get(':nth-child(3) > [data-cy="rating"]').click();
    cy.get('[data-cy="review-submit-button"]').click();
    cy.get('[data-cy="review-list"]').contains('success-1122334455');
  });
  it('removes comment from database and updates page', () => {
    cy.task('removeTestComments');
    cy.reload();
  });
});
