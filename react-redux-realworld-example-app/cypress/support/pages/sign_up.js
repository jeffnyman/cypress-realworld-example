class SignUp {
    sign_up_with_valid_credentials(username, email, password) {
        cy.get("[placeholder='Username']").type(username)
        cy.get("[placeholder='Email']").type(email)
        cy.get("[placeholder='Password']").type(password)
        cy.get("button").contains("Sign up").click()
    }
}

export default SignUp;
