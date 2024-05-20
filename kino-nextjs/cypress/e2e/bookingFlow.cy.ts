describe('Test so screenings exist and is clickable', () => {
  let movieId: string;
  it('Populates DB with screening then goes to localhost:3000/ and clicks on "Se mer"-button', () => {
    //cy.task('populateScreening')
    cy.visit('http://localhost:3000');
    cy.get(':nth-child(1) > .pl-3 > [data-cy="movie-button"]').click();
  })
  it('Adds screening to database for movie then checks for screening on todays date and clicks on "Boka"-button', () => {
    cy.wait(1000)
    cy.location().then((loc) => {
      movieId = loc.pathname.replace('/', '');
      cy.task('populateScreening', movieId);
    })
    cy.reload();
    cy.get('[data-cy="screening_date"]').should('have.value' ,new Date().toISOString().substring(0, 10))
    cy.get('[data-cy="screening_button"]').click();
  })
  /*it('Expect to be on bookingpage for correct screening and movie', () => {
    cy.wait(1000)
    cy.location().then((loc) => {
      const screeningId = loc.search.split('=')[1]
      cy.task('validateScreening', {screeningId, movieId}).then((screening) => {
        assert(screening, 'Screening and movie do not match.');
      });
    });  
})*/
it('Chooses one adult ticket and checks total price', () => {
  cy.get('[data-cy="totalPrice"]').contains('Totalt pris: 0 kr')
  cy.get('[data-cy="adultTicket"]').contains('Ordinarie');
  cy.get('[data-cy="adultTicket__price"]').contains('125 Kr')
  cy.get('[data-cy="adultTicket__button__increment"]').click();
  cy.get('[data-cy="totalPrice"]').contains('Totalt pris: 125 kr')
})

it('Removes one adult ticket and checks total price', () => {
  cy.get('[data-cy="totalPrice"]').contains('Totalt pris: 125 kr')
  cy.get('[data-cy="adultTicket"]').contains('Ordinarie');
  cy.get('[data-cy="adultTicket__price"]').contains('125 Kr')
  cy.get('[data-cy="adultTicket__button__decrement"]').click();
  cy.get('[data-cy="totalPrice"]').contains('Totalt pris: 0 kr')
})

it('Ensures all seats are rendered on seat-chart', () => {
  cy.get('[data-cy="seatChart"]')
  .find('[data-cy="seatRow"]')
  .should('have.length', 5)
  .find('.seat')
  .should('have.length', 25)
})

it('Chooses one adult ticket and selects a seat then deselects it.', () => {
  cy.get('[data-cy="adultTicket__button__increment"]').click();
  cy.get('[data-cy="0-0"]')
  .click()
  .should('have.class', 'selected')
  .should('not.have.class', 'available')
  .click()
  .should('have.class', 'available')
  .should('not.have.class', 'selected');
})

it('Tries to book without writing an email-adress and expect to have error.', () => {
  cy.get('[data-cy="bookingButton"]').click();
  cy.get('[data-cy="errorMessage"]').should('be.visible'/*'Du måste fylla i din mail för att boka.'*/)
})

it('Types in an invalid email-adress and expect to have error.', () => {
  cy.wait(3500)
  cy.get('[data-cy="emailInput"]').type('testEmail.com');
  cy.get('[data-cy="bookingButton"]').click();
  cy.get('[data-cy="errorMessage"]').should('be.visible'/*'Vänligen fyll i en korrekt e-postadress.'*/)
  cy.get('[data-cy="emailInput"]').type('testEmail.com').clear();
})


it('Removes testscreening from database', () => {
  cy.location().then((loc) => {
    const screeningId = loc.search.split('=')[1]
    cy.task('removeScreening', screeningId);
})
})
});