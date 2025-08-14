function getSelectors() {

    // Common selectors for all target sites
    const commonSelectors = {
        sdk: "seez-sdk-search",
        searchTag: ".filterTags",
        freeText: '[data-test-id="filter_freetext_field"]',
        carMake: '[data-test-id="car_make"]',
        carMakeDropdown: '[data-test-id="car_make"] ul li',
        carModel: '.multiselect.modelSelect',
        yearFrom: '[data-test-id="year_from"]',
        yearTo: '[data-test-id="year_to"]',
        kilometrage: '[data-test-id="milage"]',
        priceTypeRetail: '#retail-btn',
        priceTypeLease: '#lease-btn',
        paymentTypeCash: '.paymentType:first() button',
        paymentTypeFinancing: '.paymentType:eq(1) button',
        priceMin: '[test-id="min_budget"]',
        priceMax: '[test-id="max_budget"]',
        fuelType: '[data-test-id="fuel_type"]',
        transmission: '[data-test-id="transmission"]',
        bodyType: '.bodies',
        engine: '[data-test-id="engine_size"]',
        driveType: '[data-test-id="drive_type"]',
        color: '.colors',
        numberOfDoors: '[data-test-id="number_of_doors"]:first()',
        certified: '.category-item #certified',
        nonCertified: '.category-item #nonCertified',
        isNoviceDrivable: '.category-item #neopatentati',
        saveSearch: '[test-id="save_search"]',
        saveSearchInputName: '[test-id="save_name"]',
        saveButton: '[test-id="save_this_search"]',
        paginationPrevious: ".pages a[aria-label='Previous Page']",
        paginationNext: ".pages a[aria-label='Next Page']",
        paginationNumber: ".pages",
        pagination1: ".pages a[aria-label='Page1']",
        pagination2: ".pages a[aria-label='Page2']",
        pagination3: ".pages a[aria-label='Page3']",
        sorting: '.sorting',
        sortingMostAttractive: '[data-id="-attractiveness"]',
        sortingRecentlyAdded: '[data-id="-created_date"]',
        sortingLowestPrice: '[data-id="price"]',
        sortingHighestPrice: '[data-id="-price"]',
        sortingLowestKilometrage: '[data-id="mileage"]',
        sortingHighestKilometrage: '[data-id="-mileage"]',
        sortingNewest: '[data-id="-year"]',
        sortingOldest: '[data-id="year"]',
        listingsList: '.listingsList ',
        clearFilter: '.clearFilters',
        emptyState: 'div[slot="empty"]',
        emptyStateContact: 'div[slot="empty"] button',
        seoText: '.SEOText',
        filterHeading: 'h2.fixedHeading',
        listingCard: '.listingCard ',
        viewAll: '.viewAllBtn',
      };
      

    // AAM-specific selectors
    if (Cypress.config("targetSite") === "aam") {
        return {
            ...commonSelectors,
            notifyMeBtt: "div[slot='empty'] button"
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
            searchCount: 'h1.SEOText',
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

export const search = getSelectors();
