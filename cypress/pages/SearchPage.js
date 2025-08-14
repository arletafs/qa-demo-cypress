import { search } from '../locators/searchPage.locators'
import { listing } from '../locators/listingPage.locators'
import { carCard } from '../locators/carCard.locators'
import pagination from './PaginationAndSorting'
import 'cypress-wait-until';

class SearchPage {

    openSearchPage(defaultFilter = []) {
        cy.visit(Cypress.config('searchPage'))

        // Wait until cars are returned
        this.listingList()

        // Accept cookies if prompted
        cy.acceptCookies()

        // If default filter is provided, apply it
        if (defaultFilter.length > 0) {
            defaultFilter.forEach(filter => {
                this.searchTag().should('include.text', filter)
            })
        }
    }

    sdkSearch() {
        return cy.get(search.sdk).shadow()
    }

    sdkListing() {
        return cy.get(listing.sdk).shadow()
    }

    searchTag() {
        return this.sdkSearch().find(search.searchTag)
    }

    listingList() {
        return this.sdkSearch().find(search.listingCard)
    }

    clearFilter() {
        this.sdkSearch().find(search.clearFilter).click()
    }

    openFirstListing() {
        this.sdkSearch().find(search.listingCard).first().click()
    }

    byReference(keyword = '12345') {

        // Enter keyword
        this.sdkSearch().find(search.freeText)
            .clear({force: true}).type(keyword, {force: true})

        // Verify applied filters are shown as tags
        this.searchTag().should('include.text', keyword)
    }

    byText(keyword = 'A200') {
        
        // Enter keyword
        this.sdkSearch().find(search.freeText)
            .clear({ force: true }).type(keyword, { delay: 200 })

        // Split keyword by spaces and verify each word appears in tags
        const keywords = keyword.split(' ')
        keywords.forEach(word => {
            this.searchTag().should('include.text', word)
        })

        // Verify cars are returned correctly
        this.sdkSearch().find(search.listingCard)
            .each($card => {
                expect($card.text().toLowerCase()).to.include(keyword.toLowerCase())
            })

        // Go to next page if there are more than 1 page
        this.sdkSearch().then(($searchContainer) => {
            if ($searchContainer.find(search.paginationNext).length > 0) {
                pagination.paginationNext()

                // Verify search tag is retained after pagination
                keywords.forEach(word => {
                    this.searchTag().should('include.text', word)
                })

                // Verify cars are returned correctly after pagination
                this.sdkSearch().find(search.listingCard)
                .each($card => {
                    expect($card.text().toLowerCase()).to.include(keyword.toLowerCase())
                })
            }
        })
    }

    byMake(make = 'BMW') {

        // Select make
        this.sdkSearch().find(search.carMake).click()
            .contains(make).click()

        // Verify applied filters are shown as tags
        this.searchTag().should('include.text', make)

        // Verify cars are returned correctly
        this.sdkSearch().find(carCard.listingCardName)
            .each($card => {
                expect($card.text()).to.include(make)
            })
            
        // Go to next page if there are more than 1 page
        this.sdkSearch().then(($searchContainer) => {
            if ($searchContainer.find(search.paginationNext).length > 0) {
                pagination.paginationNext()

                 // Verify search tag is retained after pagination
                this.searchTag().should('include.text', make)

                // Verify cars are returned correctly after pagination
                this.sdkSearch().find(carCard.listingCardName)
                    .each($card => {
                        expect($card.text()).to.include(make)
                    })
                }
        })
    }

    byMakeIndex(index = 0) {

        // Select make
        this.sdkSearch().find(search.carMake).click()
        this.sdkSearch().find(search.carMakeDropdown).eq(index).click()
    }

    byFamily(make = 'BMW', families = ['1-Serie', '2-Serie'], models = ['1', '2', 'M']) {

        // Convert given families and models as arrays even when a string is passed
        if (!Array.isArray(families)) {
            families = [families]
        }

        if (!Array.isArray(models)) {
            models = [models]
        }

        // Select make as a pre condition
        this.byMake(make)
        this.searchTag().should('include.text', make)

        // Open car model dropdown
        this.sdkSearch().find(search.carModel).click()

        // Select families
        families.forEach((family) => {
            this.sdkSearch().find(search.carModel).contains(family).click()

            // Verify applied filters are shown as tags
            this.searchTag().should('include.text', family)
        });

        // Verify cars are returned correctly
        this.sdkSearch().find(carCard.listingCardName)
            .each($card => {
                const text = $card.text()

                // Verify car cards should include make and either models as specified (e.g.: BMW 1, BMW 2, BMW M)
                const found = models.some(model => text.includes(`${make} ${model}`))
                expect(found, `Expected to find one of the following cars: ${models.map(model => `${make} ${model}xx`).join(', ')} but found: ${text}`).to.be.true
            })

        // Go to next page if there are more than 1 page
        this.sdkSearch().then(($searchContainer) => {
            if ($searchContainer.find(search.paginationNext).length > 0) {
                pagination.paginationNext()

                // Verify search tag is retained after pagination
                families.forEach((family) => {
                    this.sdkSearch().find(search.carModel).contains(family).click()
        
                    // Verify applied filters are shown as tags
                    this.searchTag().should('include.text', family)
                });

                // Verify cars are returned correctly after pagination
                this.sdkSearch().find(carCard.listingCardName)
                    .each($card => {
                        const text = $card.text()
                        const found = models.some(model => text.includes(`${make} ${model}`))
                        expect(found, `Expected to find one of the following cars: ${models.map(model => `${make} ${model}xx`).join(', ')} but found: ${text}`).to.be.true
                    })
            }
        })
    }

    byModel(make = 'BMW', models = ['118d', '118i']) {

        // Convert given model(s) as array even when string is passed
        if (!Array.isArray(models)) {
            models = [models]
        }

        // Select make as a pre condition
        this.byMake(make)

        // Open Car model dropdown
        this.sdkSearch().find(search.carModel).click()

        // Select models
        models.forEach((model) => {
            this.sdkSearch().contains(model).click({ force: true })

            // Verify applied filters are shown as tags
            this.searchTag().should('include.text', model)
        });

        // Assertions - search result
        this.sdkSearch().find(carCard.listingCardName)
            .each($card => {
                const text = $card.text()
                const found = models.some(model => text.includes(model))

                // Verify car cards should include make and either models as specified
                expect(found, `Expected to find one of the following models: ${models.join(', ')} but found: ${text}`).to.be.true
            })

        // Go to next page if there are more than 1 page
        this.sdkSearch().then(($searchContainer) => {
            if ($searchContainer.find(search.paginationNext).length > 0) {
                pagination.paginationNext()

                // Verify search tag is retained after pagination
                this.searchTag().should('include.text', models.join(', '))

                // Verify cars are returned correctly after pagination
                this.sdkSearch().find(carCard.listingCardName)
                    .each($card => {
                        const text = $card.text()
                        const found = models.some(model => text.includes(model))

                        // Verify car cards should include make and either models as specified
                        expect(found, `Expected to find one of the following models: ${models.join(', ')} but found: ${text}`).to.be.true
                    })
            }
        })
    }

    byYear(from = '2020', to = '2022', translation) {

        // Select from and to dates
        this.sdkSearch().find(search.yearFrom).click()
            .contains(from).click()
        this.sdkSearch().find(search.yearTo).click()
            .contains(to).click()

        // Verify applied filters are shown as tags for AAM
        if (Cypress.config("targetSite") == "aam") {
            this.searchTag().should('include.text', from)
            this.searchTag().should('include.text', to)
        } else {

            // Verify applied filters are shown as tags for other targetsites
            const text = translation.FILTER_PANEL_COMPONENT_TRANSLATIONS.year_range.replace('{{min}}', from).replace('{{max}}', to)
            this.searchTag().should('include.text', text)
        }

        // Verify cars are returned correctly
        this.sdkSearch().find(carCard.listingCardYear)
            .each($card => {
                const carYear = parseInt($card.text().trim(), 10)
                const fromDate = parseInt(from.trim(), 10)
                const toDate = parseInt(to.trim(), 10)

                // Check that the year falls within the expected range
                expect(carYear, `The year ${carYear} should be between ${fromDate} and ${toDate}`).to.be.at.least(fromDate).and.at.most(toDate)
            })
    }

    byKilometrage(km = '10000') {

        // Wait until kilometrage field is enabled
        this.sdkSearch().find(search.kilometrage).should('not.have.attr', 'disabled')

        // Enter kilometrage
        this.sdkSearch().find(search.kilometrage).type(km, { force: true })

        // Verify applied filters are shown as tags
        this.searchTag().find('span').invoke('text').then((text) => {
            expect(text.replace(/\D/g, '')).to.contain(km)
        })

        // Verify cars are returned correctly
        this.sdkSearch().find(carCard.listingCardKilometrage)
            .each($card => {
                const carKm = parseInt($card.text().replace(/\D/g, ''), 10)
                const maxKm = parseInt(km, 10)

                // Check that the kilometrage falls within the expected range
                expect(carKm, `The kilometrage ${carKm} should be less than ${km}`).to.be.lte(maxKm)
            })
    }

    byFuelType(fuelType = 'Benzin', keyword = '', translation) {
        
        const fuel = translation.Common.FuelTypes[fuelType]
        const key = translation.Common.FuelTypes[keyword]

        // Open fuel type dropdown
        this.sdkSearch().find(search.fuelType).click()

        // Select fuel types
        this.sdkSearch().find(search.fuelType).contains(fuel).click()

        // Verify applied filters are shown as tags
        this.searchTag().should('include.text', fuel)

        // Verify cars are returned correctly
        this.sdkSearch().find(carCard.listingCardFuel)
            .each($card => {
                expect($card.text()).to.include(key)
        })

        // Verify car card should show correct icon when fuel type is "Electric" or "Hybrid"
        this.sdkSearch().find(search.listingCard)
            .each($card => {
                const fuelTypeLowerCase = fuelType.toLowerCase();
                const greenTaxFeature = $card.find(carCard.listingCardFeatureGreenTax)
                const hybridFeature = $card.find(carCard.listingCardFeatureHybrid)

                if (fuelType === 'El' || fuelType === 'Electricity') {
                    expect(greenTaxFeature).to.exist
                }
                else if (fuelTypeLowerCase.includes('hybrid')) {
                    expect(hybridFeature).to.exist
                }
                else {
                    expect(greenTaxFeature).to.not.exist
                    expect(hybridFeature).to.not.exist
            }
        })        
    }

    byTransmission(car = 'a200', transmission = 'Automatisk', variants = ['aut', 'matic']) {

        // Convert given car-variants as arrays even when a string is passed
        if (!Array.isArray(variants)) {
            keys = [variants]
        }

        // Enter some keyword to narrow down the search
        this.sdkSearch().find(search.freeText).type(car)
        this.searchTag().contains(car)
        cy.wait(500)

        // Open transmission dropdown
        this.sdkSearch().find(search.transmission).click()

        // Select transmission
        this.sdkSearch().find(search.transmission).contains(transmission).click()
        this.searchTag().should('include.text', transmission)

        // AAM/Barchetti: Verify cars are returned correctly, by looking at the transmission in the car card
        if (Cypress.config("targetSite") === "aam" || Cypress.config("targetSite") === "barchetti") {
            this.sdkSearch().find(carCard.listingCardTransmision)
                .each($card => {
                    expect($card.text()).to.include(transmission)
                })
        }

        // Seez/Starmark: Verify cars are returned correctly, by looking at the variant in the car card
        else if (Cypress.config("targetSite") === "seez" || Cypress.config("targetSite") === "starmark") {
            this.sdkSearch().find(carCard.listingCardVariant)
                .each($card => {
                    const text = $card.text().toLowerCase()
                    const found = variants.some(variant => text.includes(variant))
                    expect(found, `Expected to find one of the following keyword in car variant: ${variants.join(', ')} but found: ${text}`).to.be.true
                })
        }
    }

    byBodyType(car = 'mercedes', type = 'Cabriolet', variants = ['cabriolet']) {

        // Convert given car-variants as arrays even when a string is passed
        if (!Array.isArray(variants)) {
            keys = [variants]
        }

        // Enter some keyword to narrow down the search
        this.sdkSearch().find(search.freeText).type(car)
        this.searchTag().contains(car) // Wait until tag appears

        // Select body type
        this.sdkSearch().find(search.bodyType).contains(type).click()

        // Verify applied filters are shown as tags
        this.searchTag().should('include.text', type)

        // Verify cars are returned correctly, by looking at the variant in the car card
        this.sdkSearch().find(carCard.listingCardVariant)
            .each($card => {
                const text = $card.text().toLowerCase()
                const found = variants.some(variant => text.includes(variant))
                expect(found, `Expected to find one of the following keyword in car variant: ${variants.join(', ')} but found: ${text}`).to.be.true
            })
    }

    byEngineSize(size = '1.5') {

        // Click engine size dropdown
        this.sdkSearch().find(search.engine).click()

        // Select engine size
        this.sdkSearch().find(search.engine).contains(size).click()
        this.searchTag().should('include.text', size)

        if (Cypress.config("targetSite") === "seez") {
            // Open the first car to see the engine size
            this.openFirstListing()
            cy.formatToFloat(size).then((maxSize) => {
                cy.get(listing.technicalEngineSize).invoke('text').then((text) => {
                    cy.formatToFloat(text).then((carEngineSize) => {
                        expect(carEngineSize).to.be.lte(maxSize)
                    })
                })
            })

            // Go back to search page
            this.openSearchPage()
        } 
        
        else { this.clearFilter() }
    }

    byDriveType(type = 'F', keyword = 'F WD', translation) {

        // Click drive type dropdown
        this.sdkSearch().find(search.driveType).click()

        // Select drive type
        const text = translation.DRIVE_TYPE_FILTER_TRANSLATIONS[`drive_type_${type}`]
        this.sdkSearch().find(search.driveType).contains(text).click()
        this.searchTag().should('include.text', text)

        if (Cypress.config("targetSite") === "seez") {
            // Open the first car to see the drive type
            this.openFirstListing()
            cy.get(listing.technicalDriveType).should('include.text', keyword)

            // Go back to search page
            this.openSearchPage()
        } 
        
        else { this.clearFilter() }
    }

    byColor(color = 'black', translation) {

        // Select color
        const text = translation.FILTER_PANEL_COMPONENT_TRANSLATIONS[color]
        
        this.sdkSearch().find(search.color).scrollIntoView().contains(text).click()

        // Verify applied filters are shown as tags
        this.searchTag().should('include.text', text)

        // Seez/Starmark: Verify correct cars are returned, by opening the first car and see color in the listing page
        if (Cypress.config("targetSite") === "seez" || Cypress.config("targetSite") === "starmark") {
            this.sdkSearch().find(search.listingCard).first().click()
            cy.get(listing.generalColor).should('include.text', translation.FILTER_PANEL_COMPONENT_TRANSLATIONS[color])

            // Go back to search page
            this.openSearchPage()
        }
        else if (Cypress.config("targetSite") === "aam" || Cypress.config("targetSite") === "barchetti") {
            this.sdkSearch().find(carCard.listingCardColor)
                .each($card => {
                    expect($card.text().toLowerCase()).to.include(translation.FILTER_PANEL_COMPONENT_TRANSLATIONS[color].toLowerCase())
                })
        }

        else { this.clearFilter() }
    }

    byNumberOfDoors(car = 'mercedes', number = '2', keywords = ['cabriolet', 'coupe', 'coupé']) {

        // Convert given keywords as arrays even when a string is passed
        if (!Array.isArray(keywords)) {
            keys = [keywords]
        }

        // Enter some keyword to narrow down the search
        this.sdkSearch().find(search.freeText).type(car)

        // Open number of doors dropdown
        this.sdkSearch().find(search.numberOfDoors).click()

        // Select number of doors
        this.sdkSearch().find(search.numberOfDoors).find(`[data-id='${number}']`).click()

        // Verify applied filters are shown as tags
        this.searchTag().contains(car)
        this.searchTag().should('include.text', number)

        // Verify correct cars are returned, by looking at the keyword in the car card
        this.sdkSearch().find(search.listingCard)
            .each($card => {
                const text = $card.text().toLowerCase()
                const found = keywords.some(keyword => text.includes(keyword))
                expect(found, `Expected to find one of the following keyword in car card: ${keywords.join(', ')} but found: ${text}`).to.be.true
            })
    }

    byCertified(certified = false, translation) {

        if (certified) {

            // Select certified
            this.sdkSearch().find(search.certified).click()

            // Verify applied filters are shown as tags
            this.searchTag().should('include.text', translation.FILTER_PANEL_COMPONENT_TRANSLATIONS.certified)

            // Verify correct cars are returned
            this.sdkSearch().find(carCard.listingCard)
            .each($card => {
                cy.get($card).find(carCard.certifiedTag).should('exist')
            })
        } else {

            // Select non-certified
            this.sdkSearch().find(search.nonCertified).click()

            // Verify applied filters are shown as tags
            this.searchTag().should('include.text', translation.FILTER_PANEL_COMPONENT_TRANSLATIONS.nonCertified)

            // Verify correct cars are returned
            this.sdkSearch().find(carCard.listingCard)
            .each($card => {
                cy.get($card).find(carCard.certifiedTag).should('not.exist')
            })
        }
    }

    byIsNoviceDrivable(translation) {

        // Select isNoviceDrivable
        this.sdkSearch().find(search.isNoviceDrivable).click()

        // Verify applied filters are shown as tags
        this.searchTag().should('include.text', translation.FILTER_PANEL_COMPONENT_TRANSLATIONS.neopatentati)

        // Verify correct cars are returned
        this.sdkSearch().find(carCard.listingCard)
        .each($card => {
            cy.get($card).find(carCard.listingCardIsNoviceDrivable).should('exist')
            cy.get($card).find(carCard.listingCardIsNoviceDrivable).should('include.text', translation.FILTER_PANEL_COMPONENT_TRANSLATIONS.neopatentati)
        })
    }

    seeImageNext() {

        // Only run this tests when listing has images
        this.sdkSearch().find(carCard.listingCardImageNext).then((elements) => {

            if (elements.length > 0) {
        
                // On the first listing card, store the main image value for later comparison
                this.sdkSearch().find(carCard.listingCardImageMain).first().invoke('attr', 'src').then((previousImgUrl) => {

                    // Click Next on image slider
                    this.sdkSearch().find(carCard.listingCardImageNext).first().click()

                    // Wait for 1 second for image to switch
                    cy.wait(1000)

                    // Verify main image should change
                    this.sdkSearch().find(carCard.listingCardImageMain).first().invoke('attr', 'src').then((currentImgUrl) => {
                        expect(currentImgUrl).to.not.eq(previousImgUrl)
                    })
                })
            }
        })
    }

    seeImagePrevious() {

        // Only run this tests when listing has images
        this.sdkSearch().find(carCard.listingCardImageNext).then((elements) => {

            if (elements.length > 0) {

                // On the first listing card, store the main image value for later comparison
                this.sdkSearch().find(carCard.listingCardImageMain).first().invoke('attr', 'src').then((previousImgUrl) => {

                    // Click Previous on image slider
                    this.sdkSearch().find(carCard.listingCardImagePrevious).first().click()

                    // Wait for 1 second for image to switch
                    cy.wait(1000)

                    // Verify main image should change
                    this.sdkSearch().find(carCard.listingCardImageMain).first().invoke('attr', 'src').then((currentImgUrl) => {
                        expect(currentImgUrl).to.not.eq(previousImgUrl)
                    })
                })
            }
        })
    }

    saveSearch(name) {

        // Click Save Search button
        this.sdkSearch().find(search.saveSearch).click()

        // Enter the search name, then click save
        this.sdkSearch().find(search.saveSearchInputName).type(name)
        this.sdkSearch().find(search.saveButton).click()
    }

    verifyMultipleFilters(keyword, fuelType, translation) {
        
        // Verify applied filters are shown as tags
        this.searchTag().should('include.text', keyword)
        this.searchTag().should('include.text', translation.Common.FuelTypes[fuelType])
        
        const fuel = translation.Common.FuelTypes[fuelType]
        // Verify cars are returned correctly - filter by text
        this.listingList()
            .each($card => {
                expect($card.text().toLowerCase()).to.include(keyword.toLowerCase())
            })

        // Verify cars are returned correctly - filter by fuel type
        this.sdkSearch().find(carCard.listingCardFuel)
            .each($card => {
                expect($card.text()).to.include(fuel)
            })
    }

    verifyReservedTag(translation) {

            // Verify reserved tag is present in the car card
            this.sdkSearch().find(search.listingCard)
                .find(carCard.reservedTag)
                .should('include.text', translation.LISTING_CARD_COMPONENT_TRANSLATIONS.reserved)
    }

    goToWholesalePage() {
        cy.visit(Cypress.config('searchPageWholesale'));
    }

    contactUs() {
        
        // Click Contact button on the empty state page
        cy.get(search.emptyStateContact).click();

        // Wait until lead form is loaded
        cy.get('seez-sdk-lead-form');
    }

    likeCar() {

        // Click like button on the first car card
        this.sdkSearch().find(carCard.listingCardFavorite).first().click()
    }

    verifySearchCount(count) {
        cy.get(search.searchCount).should('include.text', count)
    }

}

export default new SearchPage()