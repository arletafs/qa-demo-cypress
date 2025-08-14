import search from '../pageObjects/SearchPage';
import Header from '../pageObjects/Header';

describe('As a user I shoud be able to open search page', () => {

    it(['starmark'], 'so that I can search cars based on my filters', () => {
        
        // Get translation content from CMS
        cy.getTranslations().then((translation) => {

            // Get listing as a test data
            cy.getListings().then((listing) => {

                // Search by car name via text
                const defaultFilter = ['Mercedes'];
                search.openSearchPage(defaultFilter);
                search.byText(listing.name.replace('+', ''));

                // Verify search count
                const searchByTextName = {
                    status: ["reserved", "available"],
                    published: true,
                    freeText: listing.name.replace('+', ''),
                    prices: ['retail', 'lease'],
                    brands: [Cypress.config('defaultBrandId')],
                    sort: 'created_date',
                }
                
                cy.getAllListings(searchByTextName).then((listings) => {
                    search.verifySearchCount(listings.pageInfo.total);
                })

                // Search by variant via text
                search.clearFilter();
                search.byText('AMG Line');

                // Verify search count
                const searchByTextVariant = {
                    status: ["reserved", "available"],
                    published: true,
                    freeText: 'AMG Line',
                    prices: ['retail', 'lease'],
                    brands: [Cypress.config('defaultBrandId')],
                    sort: 'created_date',
                }
                
                cy.getAllListings(searchByTextVariant).then((listings) => {
                    search.verifySearchCount(listings.pageInfo.total);
                })

                // Search by make
                search.clearFilter();
                search.byMake('Mercedes');

                // Verify search count
                const searchByMake = {
                    status: ["reserved", "available"],
                    published: true,
                    prices: ['retail', 'lease'],
                    brands: [Cypress.config('defaultBrandId')],
                    sort: 'created_date',
                }
                
                cy.getAllListings(searchByMake).then((listings) => {
                    search.verifySearchCount(listings.pageInfo.total);
                })

                // Search by family
                search.clearFilter();
                search.byFamily('Mercedes', ['A-Klasse', 'B-Klasse'], ['A', 'B']);

                // Search by model
                search.clearFilter();
                search.byModel('Mercedes', ['A200']);

                // Search by year
                search.clearFilter();
                search.byYear('2020', '2022', translation);

                // Search by kilometrage
                search.clearFilter();
                search.byKilometrage('10000');

                // Search by fuel type = Diesel
                search.clearFilter();
                search.byFuelType('Diesel', 'Diesel', translation);

                // Search by fuel type = Benzin
                search.clearFilter();
                search.byFuelType('Benzin', 'Benzin', translation);

                // Search by fuel type = Hybrid (Benzin)
                search.clearFilter();
                search.byFuelType('Hybrid (Benzin)', 'Hybrid (Benzin)', translation);

                // Search by fuel type = Hybrid (Diesel)
                search.clearFilter();
                search.byFuelType('Hybrid (Diesel)', 'Hybrid (Diesel)', translation);

                // Search by fuel type = Electricity
                search.clearFilter();
                search.byFuelType('Electricity', 'El', translation);

                // Search by engine size
                search.clearFilter();
                search.byEngineSize('2.0');

                // Search by drive type = 4 WD
                search.byDriveType('4', '4 WD', translation);

                // Search by color
                search.byColor('white', translation);
            })
        })
    })

    it(['starmark'], 'so that I can search car models that containing a plus sign', () => {
        
        search.openSearchPage();
        search.byModel('Mercedes', ['EQE350+']);
    })

    it(['aam'], 'so that I can view the page in other language', () => {
        
        // Get Arabic translation content from CMS
        cy.getTranslations().then((arabicTranslation) => {

            // Apply search
            search.openSearchPage();

            // Get English translation content from CMS
            cy.getTranslations('en').then((englishTranslation) => {

                // Apply search
                Header.switchLanguage("en");
                search.byCertified(true, englishTranslation);
                search.clearFilter();
                search.byCertified(false, englishTranslation);
            })
        })
    })

    it(['barchetti'], 'so that I can view the page in other language', () => {
        
        // Get translation content from CMS
        cy.getTranslations().then((translation) => {

            // Get listing as a test data
            cy.getListings().then((listing) => {

                // Apply search
                search.openSearchPage();
                search.byText(listing.brand.name);
                search.clearFilter();
                search.byMake(listing.brand.name);
                search.clearFilter();
                search.byModel(listing.brand.name, [listing.model.name]);
                search.clearFilter();
                search.byYear('2020', '2022', translation);
                search.clearFilter();
                search.byKilometrage('10000');
                search.clearFilter();
                search.byFuelType('Hybrid', 'Hybrid', translation);
                search.clearFilter();
                search.byEngineSize('2.0');
                search.byColor('white', translation);
                search.clearFilter();
                search.byIsNoviceDrivable(translation);
            })
        })
    })
    
})
