class SignIn {
    sign_in_with_valid_credentials(email, password) {
        cy.get("[placeholder='Email']").type(email)
        cy.get("[placeholder='Password']").type(password)
        cy.get("button").contains("Sign in").click()
        cy.get(".user-pic").should("be.visible")
    }
}

export default SignIn;
