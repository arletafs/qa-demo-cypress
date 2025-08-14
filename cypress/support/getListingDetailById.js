
// This is a command to fetch test data listing
Cypress.Commands.add('getListingDetailById', (listingId) => {
  const apiUrl = Cypress.config('api_url');

  // Login as superuser in seezpad
  cy.loginAsDealer().then((accessToken) => {
    // Send a request to query some listings 
    cy.request({
      method: 'POST',
      url: `${apiUrl}/api`,
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: {
        "query": `query {
          listing(id: ${listingId}) {
            id
            vehicleId
            name
            model {
              id
              name
              family {
                id
                name
                brand {
                  id
                  name
                }
              }
            }
            bodyType {
              name
            }
            targetSite {
              name
              logo
              brandingHighlightColor
            }
            variant
            year
            currency
            kilometrage
            dealership {
              id
              name
              description
              logoUrl
              financing {
                logo
              }
            }
            images
            color
            hp
            transmission {
              name
            }
            fuelType {
              id
              name
            }
            registrationDate
            state
            reservedBy
            equipment {
              design
              comfort
              safety
              uncategorized
            }
            referenceNumber
            acceleration
            numAirbags
            numGears
            numCylinders
            weight
            loadCapacity
            maxAttachment
            numDoors
            fuelConsumption
            range
            description
            locatedAt {
              plainAddress
            }
            typeName
            leasePrice {
              value
              currency
              type
              lease {
                duration
                downPayment
                residualValue
                type
                audience
              }
            }
            wholesaleLeasePrice {
              value
              currency
              type
              lease {
                duration
                downPayment
                residualValue
                type
                audience
              }
            }
            retailPrice {
              value
              currency
              type
              disclaimer
            }
            wholesalePrice {
              value
              currency
              type
            }
            emiPrice {
              value
              currency
              type
              emi {
                loanAmount
                apr
                disclaimer
                paymentTerms
              }
            }
            videos
            greenTax
            batteryConsumption
            certified
            interiorMaterial
            interiorColor
            rimSize
            warranty
            engineSize
            numSeats
            reservation { id }
          }
        }        
        `
      }
    }).then((response) => {
      return response.body.data.listing;
    })
  });
});