
describe('Test so bookingflow works correctly', () => {
  let movieId: string;
  let screeningId: string;
  it('Visits localhost:3000 and comes to homepage then clicks on the "Se mer"-button on the first movie.', () => {
    cy.visit('http://localhost:3000');
    cy.reload();
    cy.get('[data-cy="movie-button"]').first().click();
  });

  it('Adds screening to database for movie then checks for screening on todays date and clicks on "Boka"-button', () => {
    cy.location('pathname', {timeout: 60000})
    .should('match', /[\w\d]+/);
    cy.location().then((loc) => {
      movieId = loc.pathname.replace('/', '');
      cy.task('populateScreening', movieId);
    });
    cy.reload();
    cy.get('[data-cy="screening_date"]').should(
      'have.value',
      new Date().toISOString().substring(0, 10),
    );
    cy.get('[data-cy="screening_button"]').first().click();
  });

  it('Saves screeningId for later in test', () => {
    cy.location('pathname', {timeout: 60000})
    .should('include', '/seats');
    cy.location().then((loc) => {
      screeningId = loc.search.split('=')[1];
    });
  });

  it('Expect to be on seats page with a screening- and movie-id', () => {
    cy.url().should(
      'be.equal',
      `http://localhost:3000/${movieId}/seats?screeningId=${screeningId}`,
    );
  })

  it('Chooses one adult ticket and checks total price', () => {
    cy.get('[data-cy="totalPrice"]').contains('Totalt pris: 0 kr');
    cy.get('[data-cy="adultTicket"]').contains('Ordinarie');
    cy.get('[data-cy="adultTicket__price"]').contains('125 Kr');
    cy.get('[data-cy="adultTicket__button__increment"]').click();
    cy.get('[data-cy="totalPrice"]').contains('Totalt pris: 125 kr');
  });

  it('Removes one adult ticket and checks total price', () => {
    cy.get('[data-cy="totalPrice"]').contains('Totalt pris: 125 kr');
    cy.get('[data-cy="adultTicket"]').contains('Ordinarie');
    cy.get('[data-cy="adultTicket__price"]').contains('125 Kr');
    cy.get('[data-cy="adultTicket__button__decrement"]').click();
    cy.get('[data-cy="totalPrice"]').contains('Totalt pris: 0 kr');
  });

  it('Chooses one senior ticket and checks total price', () => {
    cy.get('[data-cy="totalPrice"]').contains('Totalt pris: 0 kr');
    cy.get('[data-cy="seniorTicket"]').contains('Senior');
    cy.get('[data-cy="seniorTicket__price"]').contains('100 Kr');
    cy.get('[data-cy="seniorTicket__button__increment"]').click();
    cy.get('[data-cy="totalPrice"]').contains('Totalt pris: 100 kr');
  });

  it('Removes one senior ticket and checks total price', () => {
    cy.get('[data-cy="totalPrice"]').contains('Totalt pris: 100 kr');
    cy.get('[data-cy="seniorTicket"]').contains('Senior');
    cy.get('[data-cy="seniorTicket__price"]').contains('100 Kr');
    cy.get('[data-cy="seniorTicket__button__decrement"]').click();
    cy.get('[data-cy="totalPrice"]').contains('Totalt pris: 0 kr');
  });

  it('Chooses one child ticket and checks total price', () => {
    cy.get('[data-cy="totalPrice"]').contains('Totalt pris: 0 kr');
    cy.get('[data-cy="childTicket"]').contains('Barn');
    cy.get('[data-cy="childTicket__price"]').contains('75 Kr');
    cy.get('[data-cy="childTicket__button__increment"]').click();
    cy.get('[data-cy="totalPrice"]').contains('Totalt pris: 75 kr');
  });

  it('Removes one child ticket and checks total price', () => {
    cy.get('[data-cy="totalPrice"]').contains('Totalt pris: 75 kr');
    cy.get('[data-cy="childTicket"]').contains('Barn');
    cy.get('[data-cy="childTicket__price"]').contains('75 Kr');
    cy.get('[data-cy="childTicket__button__decrement"]').click();
    cy.get('[data-cy="totalPrice"]').contains('Totalt pris: 0 kr');
  });

  it('Ensures all seats are rendered on seat-chart', () => {
    cy.get('[data-cy="seatChart"]')
      .find('[data-cy="seatRow"]')
      .should('have.length', 5)
      .find('.seat')
      .should('have.length', 25);
  });

  it('Chooses one adult ticket and selects a seat then deselects it.', () => {
    cy.get('[data-cy="adultTicket__button__increment"]').click();
    cy.get('[data-cy="0-0"]')
      .click()
      .should('have.class', 'selected')
      .should('not.have.class', 'available')
      .click()
      .should('have.class', 'available')
      .should('not.have.class', 'selected');
    cy.get('[data-cy="adultTicket__button__decrement"]').click();
  });

  it('Selects a seat in seat-chart then clicks on "Ångra"-button and expects seat to be unselected.', () => {
    cy.get('[data-cy="adultTicket__button__increment"]').click();
    cy.get('[data-cy="0-0"]').click().should('have.class', 'selected');
    cy.get('[data-cy="undoButton"]').click();
    cy.get('[data-cy="0-0"]')
      .should('have.class', 'available')
      .should('not.have.class', 'selected');
    cy.get('[data-cy="adultTicket__button__decrement"]').click();
  });

  it('Chooses one adult and one senior ticket and checks total price', () => {
    cy.get('[data-cy="adultTicket__button__increment"]').click();
    cy.get('[data-cy="seniorTicket__button__increment"]').click();
    cy.get('[data-cy="totalPrice"]').contains('Totalt pris: 225 kr');
    cy.get('[data-cy="adultTicket__button__decrement"]').click();
    cy.get('[data-cy="seniorTicket__button__decrement"]').click();
  });

  it('Chooses one adult and one child ticket and checks total price', () => {
    cy.get('[data-cy="adultTicket__button__increment"]').click();
    cy.get('[data-cy="childTicket__button__increment"]').click();
    cy.get('[data-cy="totalPrice"]').contains('Totalt pris: 200 kr');
    cy.get('[data-cy="adultTicket__button__decrement"]').click();
    cy.get('[data-cy="childTicket__button__decrement"]').click();
  });

  it('Chooses one senior and one child ticket and checks total price', () => {
    cy.get('[data-cy="seniorTicket__button__increment"]').click();
    cy.get('[data-cy="childTicket__button__increment"]').click();
    cy.get('[data-cy="totalPrice"]').contains('Totalt pris: 175 kr');
    cy.get('[data-cy="seniorTicket__button__decrement"]').click();
    cy.get('[data-cy="childTicket__button__decrement"]').click();
  });

  it('Tries to choose more than one seat when only having chosen one ticket.', () => {
    cy.get('[data-cy="adultTicket__button__increment"]').click();
    cy.get('[data-cy="0-0"]').click().should('have.class', 'selected');
    cy.get('[data-cy="0-1"]')
      .should('have.class', 'available')
      .click()
      .should('not.have.class', 'selected');
    cy.get('[data-cy="0-0"]').click();
    cy.get('[data-cy="adultTicket__button__decrement"]').click();
  });

  it('Tries to go forward with booking without having chosen a ticket and expect to have error..', () => {
    cy.get('[data-cy="bookingButton"]').click();
    cy.get('[data-cy="errorMessage"]').should(
      'be.visible' /*Du måste välja minst en biljett av någon typ.*/,
    );
  });

  it('Tries to go forward with booking without having chosen a seat and expect to have error.', () => {
    cy.wait(3001)
    cy.get('[data-cy="bookingButton"]').click();
    cy.get('[data-cy="errorMessage"]').should(
      'be.visible' /*'Du har inte valt samma antal platser som antal biljetter!'*/,
    );
  });

  it('Tries to book without writing an email-adress and expect to have error.', () => {
    cy.wait(3001);
    cy.get('[data-cy="bookingButton"]').click();
    cy.get('[data-cy="errorMessage"]').should(
      'be.visible' /*'Du måste fylla i din mail för att boka.'*/,
    );
  });

  it('Types in an invalid email-adress and expect to have error.', () => {
    cy.wait(3001);
    cy.get('[data-cy="emailInput"]').type('testEmail.com');
    cy.get('[data-cy="bookingButton"]').click();
    cy.get('[data-cy="errorMessage"]').should(
      'be.visible' /*'Vänligen fyll i en korrekt e-postadress.'*/,
    );
    cy.get('[data-cy="emailInput"]').type('testEmail.com').clear();
  });

  it('Makes a correct booking and expects to go to confirmation page for correct movie.', () => {
    cy.get('[data-cy="adultTicket__button__increment"]').click();
    cy.get('[data-cy="0-0"]').click();
    cy.get('[data-cy="emailInput"]').type('testEmail@test.com');
    cy.get('[data-cy="bookingButton"]').click();
    cy.wait(1000);
      cy.url().should(
        'be.equal',
        `http://localhost:3000/${movieId}/seats/confirmation`,
      );
  });

  it('Clicks on "Hem" in navigation to go back to starting page then go to seats again to check that the correct seat is booked.', () => {
    cy.get('[data-cy="confirmation__home"]').click();
    cy.get('[data-cy="movie-button"]').first().click();
    cy.get('[data-cy="screening_button"]').first().click();
    cy.get('[data-cy="0-0"]')
      .should('have.class', 'booked')
      .should('be.disabled');
  });

  it('Removes testscreening from database', () => {
      console.log(screeningId)
      cy.task('removeScreening', screeningId);
  });
});
