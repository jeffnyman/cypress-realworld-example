class Home {
    visit() {
        cy.visit("http://localhost:4100")
        return this
    }

    user_navigates_to_signs_up() {
        cy.get(".nav-link").contains("Sign up").click()
    }

    user_navigates_to_sign_in() {
        cy.get(".nav-link").contains("Sign in").click()
    }
}

export default Home;
