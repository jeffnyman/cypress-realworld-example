describe("Authentication Process: Sign Up and Log In", () => {
    let random_string = Math.random().toString(36).substring(2)
    let username = `test_${random_string}`
    let email = `test_${random_string}@example.com`
    let password = "Password1"

    beforeEach(() => {
        cy.visit("http://localhost:4100")
    })

    it("allows valid sign up of a new user", () => {
        // To perform assertions against the XHR object, you need the
        // Cypress server. Then, with the server, we look for all
        // POST requests that hit a user request URL that has the
        // text "users" in it.
        cy.server()
        cy.route("POST", "**/users").as("new_user")

        cy.get(".nav-link").contains("Sign up").click()
        cy.get("[placeholder='Username']").type(username)
        cy.get("[placeholder='Email']").type(email)
        cy.get("[placeholder='Password']").type(password)
        cy.get("button").contains("Sign up").click()

        cy.wait("@new_user")
        cy.get("@new_user").should((xhr) => {
            expect(xhr.status).to.eq(200)
            expect(xhr.request.body.user.username).to.eq(username)
            expect(xhr.request.body.user.email).to.eq(email)
        })
    })

    it("allows login with user who signed up", () => {
        cy.get(".nav-link").contains("Sign in").click()
        cy.get("[placeholder='Email']").type(email)
        cy.get("[placeholder='Password']").type(password)
        cy.get("button").contains("Sign in").click()
        cy.get(".user-pic").should("be.visible")
    })
})
