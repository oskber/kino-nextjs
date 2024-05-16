describe('Test so screenings exist and is clickable', () => {

  it('Populates DB with screening then goes to localhost:3000/ and clicks on "Se mer"-button', () => {
    //cy.task('populateScreening')
    cy.visit('http://localhost:3000');
    cy.get(':nth-child(1) > .pl-3 > [data-cy="movie-button"]').click();
  })
  it('Checks for screening on todays date and clicks on "Boka"-button', () => {
    cy.get('[data-cy="screening_date"]').should('have.value' ,new Date().toISOString().substring(0, 10))
    cy.get('[data-cy="screening_button"]')
    cy.location().then((loc) => {
      console.log(loc.search)
    })
  })
})