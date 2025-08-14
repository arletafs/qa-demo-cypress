Cypress.Commands.add('getListings', (customSearchParams) => {
    
    const apiUrl = Cypress.config('api_url');

    let searchParams;

    if (customSearchParams) {

      // Use custom search params if provided
      searchParams = customSearchParams;

    }
      else {

        // Default search params for starmark
        if (Cypress.config('targetSite') === 'starmark') {

            searchParams = {
                status: ["reserved", "available"],
                published: true,
                freeText: 'Mercedes',
                targetSiteId: Cypress.config('target_site_id'),
                showroomId: null,
                priceType: 'retail',
                minPrice: 10000,
                maxPrice: 2000000,
            }
        }

        // Default search params for aam
        else if (Cypress.config('targetSite') === 'aam') {

            searchParams = {
              status: ["reserved", "available"],
              published: true,
              freeText: null,
              targetSiteId: Cypress.config('target_site_id'),
              showroomId: null,
              priceType: 'retail',
              minPrice: 1000,
              maxPrice: 2000000
          }
        }

        // Default search params for barchetti
        else if (Cypress.config('targetSite') === 'barchetti') {

            searchParams = {
              status: ["reserved", "available"],
              published: true,
              freeText: null,
              targetSiteId: Cypress.config('target_site_id'),
              showroomId: Cypress.config('showroom'),
              priceType: 'emi',
              minPrice: 50,
              maxPrice: 10000,
          }
        }  
        
        // Default search params for bag
        else if (Cypress.config('targetSite') === 'bag') {

            searchParams = {
              status: ["reserved", "available"],
              published: true,
              freeText: null,
              targetSiteId: Cypress.config('target_site_id'),
              showroomId: null,
              priceType: 'retail',
              minPrice: 1000,
              maxPrice: 2000000,
          }
        }

        // Default search params for bag
        else if (Cypress.config('targetSite') === 'terminalen') {

            searchParams = {
              status: ["reserved", "available"],
              published: true,
              freeText: null,
              targetSiteId: Cypress.config('target_site_id'),
              showroomId: null,
              priceType: 'retail',
              minPrice: 1000,
              maxPrice: 2000000,
          }
        }  

        // Default search params for karvil
        else if (Cypress.config('targetSite') === 'karvil') {

          searchParams = {
            status: ["reserved", "available"],
            published: true,
            freeText: null,
            targetSiteId: Cypress.config('target_site_id'),
            showroomId: null,
            priceType: 'retail',
            minPrice: 1000,
            maxPrice: 2000000,
        }
      }  
    }
  
    // Login as admin of Seezar Dashboard
    cy.loginAsDealer().then((accessToken) => {

        // Initialize variables payload
        let variablesPayload = {};

        // Add status only if provided
        if (searchParams.status !== null) {
            variablesPayload.status = searchParams.status;
        }

        // Add published only if provided
        if (searchParams.published !== null) {
            variablesPayload.published = searchParams.published;
        }
    
        // Add freeText only if provided
        if (searchParams.freeText !== null) {
            variablesPayload.freeText = searchParams.freeText;
        }
    
        // Add targetSiteIds only if provided
        if (searchParams.targetSiteId !== null) {
            variablesPayload.targetSiteIds = [searchParams.targetSiteId];
        }
    
        // Add showroomIds only if provided
        if (searchParams.showroomId !== null) {
            variablesPayload.locationIds = [searchParams.showroomId];
        }
    
        // Add price.type only if provided
        if (searchParams.priceType !== null && searchParams.minPrice === null && searchParams.maxPrice === null) {
            variablesPayload.prices = { type: searchParams.priceType };    }
    
        // Add minPrice and maxPrice only if provided
        if (searchParams.priceType !== null && searchParams.minPrice !== null && searchParams.maxPrice !== null) {
            variablesPayload.priceType = searchParams.priceType;
            variablesPayload.priceMin = searchParams.minPrice;
            variablesPayload.priceMax = searchParams.maxPrice;
        }

        // Query 20 listings, exclude referenceNumber when target site is Barchetti (because Barchetti cars do not have reference)
        let query = `query listings($payload: ListingFiltersInput) { listings (page: 1 perPage: 10 filter: $payload) { nodes { 
            id
            bodyType { name }
            brand { name } 
            color 
            dealership { name } 
            fuelType { name } 
            hp 
            kilometrage 
            model { name } 
            name  
            transmission { name } 
            variant 
            vin 
            year
            ${(Cypress.config('targetSite') === "barchetti") ? '' : 'referenceNumber'}
            ${(Cypress.config('targetSite') === "bag" || Cypress.config('targetSite') === "terminalen") ? 'externalId' : ''}
        }}}`;

        // Send the request
        cy.request({
            method: 'POST',
            url: `${apiUrl}/api`,
            headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            },
            body: {
                "query": query,
                "variables": { "payload": variablesPayload }
              }
        }).then((response) => {
  
        // Process the response data
        processResponseData(response.body, apiUrl, accessToken);
      });
    });
  });
  
  // Function to fetch listing details for the selected listing ID
  function fetchListingDetails(listingId, apiUrl, accessToken) {
    return cy.request({
      method: 'POST',
      url: `${apiUrl}/api`,
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: {
        "query": `query listingDetails($listingId: ID) { listing(id: $listingId){
          id 
          acceleration 
          batteryConsumption 
          bodyType 
          { name } 
          brand { name } 
          co2Emission 
          color 
          interiorColor
          couplingDevice 
          dealership { name description } 
          description 
          driveType 
          emiPrice { value }
          engineSize 
          equipment { comfort design optional safety standard uncategorized } 
          externalId
          fullColor
          fuelConsumption 
          fuelType { name } 
          greenTax 
          height 
          hp 
          images
          inspectionDate 
          interiorColor
          kilometrage
          leasePrice { value lease { audience downPayment duration residualValue type yearlyKmtrage }}
          length 
          licensePlate 
          loadCapacity 
          maxAttachment 
          maxAttachmentUnbraked 
          mileageAtService 
          model { name } 
          name 
          nextInspectionDate 
          noxEmission 
          numAirbags 
          numCylinders 
          numDoors 
          numGears 
          numSeats 
          safetyRating 
          range 
          registrationDate 
          registrationType 
          referenceNumber 
          retailPrice { value } 
          locatedAt { plainAddress name phone } 
          rimSize
          topSpeed 
          transmission { name } 
          usedVehicleImport 
          variant 
          vin
          warranty
          wasDemo 
          weight 
          width
          wholesalePrice { value }
          year
          interiorMaterial
          warranty
          torque
          rimSize
          vehicleId
          inspectionReport { label }
          published
          status
          promotions { discount discounted_price}
  
        }}`,
        "variables": { "listingId": listingId }
      }
    }).then((response) => {

      const listing = response.body.data.listing;
  
      //console.log('listingData:', JSON.stringify(listing, null, 2));
  
      return listing;
    });
  }
  
// Function to iterate on the listings, return true when not null, return false when it's null
function hasNoNullValues(obj, path = '') {
    return Object.entries(obj).every(([key, value]) => {
      const newPath = path ? `${path}.${key}` : key;
  
      // Check if the path is 'images', if it's an array and not empty
      /*
      if (newPath === 'images') {
        if (!Array.isArray(value) || value.length === 0) {
  
          // Return false when array is empty
          return false;
        }
  
        // Return true when image array contains at least one url
        return true;
      }*/
  
      // Return false when value is null
      if (value === null || value === "") {
        return false;
      }
  
      // Return false when referenceNumber contains '(' (e.g. "351275 (Helge)")
      if (newPath === 'referenceNumber') {
        if (value.includes("(")) {
          return false;
        }
      }

      // Return false when referenceNumber contains space
      if (newPath === 'referenceNumber') {
        if (value.includes(" ")) {
          return false;
        }
      }
  
      // Return false when referenceNumber contains bad data
      if (newPath === 'referenceNumber') {
        if (value == "552160" || value == "549793" || value == "554798" || value == "559429" || value == "958751" || value == "561475" || value == "566122" || value == "566914") {
          return false;
        }
      }
      

      // Return false when vin contains bad data
      if (newPath === 'vin') {
        if (value == "SJW74C94RZ145640") {
          return false;
        }
      }
  
      if (typeof value === 'object') {
        return hasNoNullValues(value, newPath);
      }
  
      return true;
    });
  }
  
// Function to process response data
function processResponseData(responseData, apiUrl, accessToken) {
if (responseData?.data?.listings?.nodes) {
    for (const listing of responseData.data.listings.nodes) {
    if (hasNoNullValues(listing)) {

        // Fetch listing details when a valid listing is found
        fetchListingDetails(listing.id, apiUrl, accessToken);

        break; // Exit the loop once a listing with all valid values is found
    }
    }
}
}