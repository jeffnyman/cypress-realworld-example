describe("Authentication Process: Sign Up and Log In", () => {
    let random_string = Math.random().toString(36).substring(2)

    it("allows valid sign up of a new user", () => {
        cy.visit("http://localhost:4100")
        cy.get(".nav-link").contains("Sign up").click()
        cy.get("[placeholder='Username']").type(`test_${random_string}`)
        cy.get("[placeholder='Email']").type(`test_${random_string}@example.com`)
        cy.get("[placeholder='Password']").type("Password1")
        cy.get("button").contains("Sign up").click()
    })
})
