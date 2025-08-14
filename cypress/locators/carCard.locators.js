function getSelectors() {

    // Common selectors for all target sites
    const commonSelectors = {
        listingCard: '.listingCard ',
        listingCardImageMain: '.listingCard .images img',
        listingCardImagePrevious: '.listingCard .prev',
        listingCardImageNext: '.listingCard .next',
        listingCardFeatureGreenTax: '.feature.electric',
        listingCardFeatureHybrid: '.feature.hybrid',
        listingCardName: '.listingCard .name',
        listingCardVariant: '.listingCard .variant',
        listingCardYear: '.listingCard .year',
        listingCardKilometrage: '.listingCard .mileage',
        listingCardFuel: '.listingCard .fuelType',
        listingCardTransmision: '.listingCard .transmission',
        listingCardColor: '.listingCard .color',
        listingCardLocation: '.listingCard .location',
        listingCardIsNoviceDrivable: '.isNoviceDrivable',
        listingCardPriceRetail: '.listingCard .prices .retail',
        listingCardPriceFinancing: '.listingCard .prices .emi',
        listingCardPriceLease: '.listingCard .prices .lease',
        listingCardFavorite: '.listingCard .favorite',
        compareBtt: '.compare',
        reservedTag: '.status.reserved',
        certifiedTag: '.certified-badge',

        // Lease related selectors
        leaseBusiness: '.businessLeasing',
        leasePrivate: '.privateLeasing',
        leaseDownPayment: '.leasing-info div:first()',
        leaseResidualValue: '.leasing-info div:eq(1)',
        kmIncluded: '.leasing-info div:eq(1)',
        leaseDuration: '.leasing-info div:eq(2)',
        leaseVat: '.leasing-info .vat',
      };
      

    // AAM-specific selectors
    if (Cypress.config("targetSite") === "aam") {
        return {
            ...commonSelectors,
            // 
        };
    }

    // Barchetti-specific selectors
    else if (Cypress.config("targetSite") === "barchetti") {
        return {
            ...commonSelectors,
            //
        };
    }
    
    // Starmark-specific selectors
    else if (Cypress.config("targetSite") === "starmark") {
        return {
            ...commonSelectors,

            carModel: '.multiselect.modelFamilySelect',
            //
        };
    }

    // Seez-specific selectors
    else if (Cypress.config("targetSite") === "seez") {
        return {
            ...commonSelectors,
            //
        };
    }

    // BAG-specific selectors
    else if (Cypress.config("targetSite") === "bag") {
        return {
            ...commonSelectors,
            //
        };
    }

    // Terminalen-specific selectors
    else if (Cypress.config("targetSite") === "terminalen") {
        return {
            ...commonSelectors,
            //
        };
    }
}

export const carCard = getSelectors();
