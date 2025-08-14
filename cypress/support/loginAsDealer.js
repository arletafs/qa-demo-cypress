Cypress.Commands.add('loginAsDealer', () => {
    const seezPadEmail = Cypress.env('seezpad_username');
    const encodedEmail = encodeURIComponent(seezPadEmail);
    const baseUrl = Cypress.config('api_token_url');
  
    // Send a request to login as a seezpad superuser
    return cy.request({
      method: 'GET',
      url: `${baseUrl}/auth/otp?email=${encodedEmail}`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((loginResponse) => {
      if (loginResponse.body) {
        const otp = Cypress.env('seezpad_password');
  
        // Send a request to refresh a token
        return cy.request({
          method: 'POST',
          url: `${baseUrl}/auth/authenticate/`,
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            "email": seezPadEmail,
            "otp": otp,
            "marketing": true,
          },
        });
      }
    }).then((authResponse) => {
      const refreshToken = authResponse.body.refreshToken;
  
      // Send a request to get access token
      return cy.request({
        method: 'POST',
        url: `${baseUrl}/auth/refresh`,
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          "refreshToken": refreshToken,
        },
      });
    }).then((tokenResponse) => {
      return tokenResponse.body.accessToken;
    });
  });