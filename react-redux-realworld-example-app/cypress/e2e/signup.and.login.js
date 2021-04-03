import Home from '../support/pages/home'
import SignUp from '../support/pages/sign_up'
import SignIn from '../support/pages/sign_in'

describe("Authentication Process: Sign Up and Log In", () => {
    let random_string = Math.random().toString(36).substring(2)
    let username = `test_${random_string}`
    let email = `test_${random_string}@example.com`
    let password = "Password1"

    const home = new Home()
    const sign_up = new SignUp()
    const sign_in = new SignIn()

    beforeEach(() => {
        home.visit()
    })

    it("allows valid sign up of a new user", () => {
        cy.intercept("POST", "**/users").as("new_user")

        home.user_navigates_to_signs_up()
        sign_up.sign_up_with_valid_credentials(username, email, password)

        cy.wait("@new_user")
        cy.get("@new_user").should((xhr) => {
            expect(xhr.response.statusCode).to.eq(200)
            expect(xhr.request.body.user.username).to.eq(username)
            expect(xhr.request.body.user.email).to.eq(email)
        })
    })

    it("allows login with user who signed up", () => {
        cy.intercept("GET", "**/tags", { fixture: "popular_tags.json" })

        home.user_navigates_to_sign_in()
        sign_in.sign_in_with_valid_credentials(email, password)

        cy.get(".tag-list").should("contain", "automation").and("contain", "cypress")
    })

    it("allows viewing of user feed when signed in", () => {
        cy.intercept("GET", "**/articles/feed*", { fixture: "mock_feed.json" }).as("articles")

        home.user_navigates_to_sign_in()
        sign_in.sign_in_with_valid_credentials(email, password)

        cy.wait("@articles")
    })
})
