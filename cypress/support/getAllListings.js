Cypress.Commands.add('getAllListings', (searchParams) => {
    
    const apiUrl = Cypress.config('api_url');

    // Login as admin of Seezar Dashboard
    cy.loginAsDealer().then((accessToken) => {

        // Initialize variables payload
        let variablesPayload = {};

        // Add status only if provided
        if (searchParams.status) {
            variablesPayload.status = searchParams.status;
        }

        // Add published only if provided
        if (searchParams.published) {
            variablesPayload.published = searchParams.published;
        }
    
        // Add freeText only if provided
        if (searchParams.freeText) {
            variablesPayload.freeText = searchParams.freeText;
        }
    
        // Add prices.type only if provided
        if (searchParams.prices && searchParams.prices.length > 0) {
            variablesPayload.prices = [];
            for (const price of searchParams.prices) {

                if (searchParams.minPrice && searchParams.maxPrice) {
                    variablesPayload.prices.push({ type: price, minPrice: searchParams.minPrice, maxPrice: searchParams.maxPrice });
                } else if (searchParams.minPrice && !searchParams.maxPrice) {
                    variablesPayload.prices.push({ type: price, minPrice: searchParams.minPrice });
                } else if (!searchParams.minPrice && searchParams.maxPrice) {
                    variablesPayload.prices.push({ type: price, maxPrice: searchParams.maxPrice });
                } else if (!searchParams.minPrice && !searchParams.maxPrice) {
                    variablesPayload.prices.push({ type: price });
                }
            }
        }

        // Add brands only if provided
        if (searchParams.brands) {
            variablesPayload.brands = searchParams.brands;
        }

        // Add sort only if provided
        if (searchParams.sort) {
            variablesPayload.sort = searchParams.sort;
        }

        // Query 24 listings (same as the number of cards on the search page)
        let query = `query listings($payload: ListingFiltersInput) { listings (page: 1 perPage: 24 filter: $payload) { 
            nodes { 
                id
            }
            pageInfo {
                total
                page
                perPage
                pages
            }
        }}`;

        // Send the request
        cy.request({
            method: 'POST',
            url: `${apiUrl}/api`,
            headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "Client-Id": Cypress.config('clientId')
            },
            body: {
                "query": query,
                "variables": { "payload": variablesPayload }
              }
        }).then((response) => {

          console.log('request body', response.requestBody);
  
        return response.body.data.listings;
      });
    });
  });