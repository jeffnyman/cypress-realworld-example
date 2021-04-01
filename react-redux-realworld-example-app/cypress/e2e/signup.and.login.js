describe("Authentication Process: Sign Up and Log In", () => {
    let random_string = Math.random().toString(36).substring(2)

    it("allows valid sign up of a new user", () => {
        // To perform assertions against the XHR object, you need the
        // Cypress server. Then, with the server, we look for all
        // POST requests that hit a user request URL that has the
        // text "users" in it.
        cy.server()
        cy.route("POST", "**/users").as("new_user")

        cy.visit("http://localhost:4100")
        cy.get(".nav-link").contains("Sign up").click()
        cy.get("[placeholder='Username']").type(`test_${random_string}`)
        cy.get("[placeholder='Email']").type(`test_${random_string}@example.com`)
        cy.get("[placeholder='Password']").type("Password1")
        cy.get("button").contains("Sign up").click()

        cy.wait("@new_user")
        cy.get("@new_user").should((xhr) => {
            expect(xhr.status).to.eq(200)
            expect(xhr.request.body.user.username).to.eq(`test_${random_string}`)
            expect(xhr.request.body.user.email).to.eq(`test_${random_string}@example.com`)
        })
    })
})
