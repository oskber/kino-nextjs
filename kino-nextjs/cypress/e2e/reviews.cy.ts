describe('visits homepage', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000');
  });
});
describe('clicks on a movie and adds a review', () => {
  it('clicks the button on a movie on homepage', () => {
    cy.get(':nth-child(1) > .pl-3 > [data-cy="movie-button"]').click();
  });
  it('adds name, comment and 3-star rating and submits review. Checks if comment contains message', () => {
    cy.get('[data-cy="name-input"]').type('Test');
    cy.get('[data-cy="comment-input"]').type('success-1122334455');
    cy.get(':nth-child(3) > [data-cy="rating"]').click();
    cy.get('[data-cy="review-submit-button"]').click();
    cy.task('findReview', 'success-1122334455').then((review) => {
      assert(review, 'Review not found in the database');
    });
  });
  describe('removes review from database and updates page', () => {
    it('removes review from database and updates page', () => {
      cy.task('removeTestReviews');
      cy.reload();
    });
  });
});
