function getSelectors() {

    // Common selectors for all target sites
    const commonSelectors = {
        sdk: "seez-sdk-listing-details",
        bookTestDrive: '[data-test-id="test_drive_button"]',
        financingBy: ".financingBy",
        carImageMain: ".mainImage",
        carImageThumbs: ".thumbnails img",
        carImageThumb1: ".thumbnails img:first()",
        carImageThumb2: ".thumbnails img:eq(1)",
        carImageThumb3: ".thumbnails img:eq(2)",
        carImageThumb4: ".thumbnails img:eq(3)",
        carName: ".header h2",
        carVariant: ".header p",
        carYear: ".header p",
        carImagePrevious: ".prev",
        carImageNext: ".next",
        carImageToggle: ".toggle",
        specKilometrage: "#kilometrage span",
        specFuel: "#fuelType span",
        specEngineSize: "#engineSize span",
        specDisplacement: ".mainDetails ul li:eq(4) span",
        specColor: "#carColor span",
        specInteriorColor: "#interiorColor span",
        specSeatMaterial: "#seatMaterial span",
        specWarranty: "#warranty span",
        specGear: "#transmission span",
        specBodyType: "#bodyType span",
        specReference: "#referenceNumber span",
        specHp: "#horsePower span",
        specCylinders: "#engineSize span",
        reservedTag: '',
        inspectionReport: `.inspectionReport`,
        
    };


    // AAM-specific selectors
    if (Cypress.config("targetSite") === "aam") {
        return {
            ...commonSelectors,
            carPrice: ".selectedPrice",
            emiPrice: ".financingDetails .emi",
            carDescription: ".descriptionList",
            serviceKilometrage: ".collapsablePanel:eq(1) .specsGrid li:first() span:eq(1)",
            serviceLast: ".collapsablePanel:eq(1) .specsGrid li:eq(1) span:eq(1)",
            serviceNext: ".collapsablePanel:eq(1) .specsGrid li:eq(2) span:eq(1)",
            technicalPerformance: `.techSpecs li:has( > span:contains("Horsepower")) span`,
            technicalNumberGear: `.techSpecs li:has( > span:contains("Gears")) span`,
            technicalNumberCylinder: `.techSpecs li:has( > span:contains("Cylinders")) span`,
            technicalDriveType: `.techSpecs li:has( > span:contains("Drive Type")) span`,
            dimensionsWeight: `.dimensions li:has( > span:contains("Weight")) span`,
            dimensionsNumberDoor: `.dimensions li:has( > span:contains("Number of doors")) span`,
            dimensionsNumberSeat: `.dimensions li:has( > span:contains("Number of Seats")) span`,
            dimensionsRimsize: `.dimensions li:has( > span:contains("Rim Size")) span`,
            leadButton: ".buttons .contact",
            bookTestDrive: ".testDrive",
            buyOnline: '.buy',
            // 
        };
    }

    // Barchetti-specific selectors
    else if (Cypress.config("targetSite") === "barchetti") {
        return {
            ...commonSelectors,
            carPrice: ".selectedPrice",
            carDiscountedPrice: ".newPrice",
            carBeforeDiscounted: ".oldPrice",
            discount: ".discountTag",
            emiPrice: ".financingDetails .emi",
            carDescription: ".description",
            technicalPerformance: `.techSpecs li:has( > span:contains("Potenza")) span`,
            technicalNumberGear: `.techSpecs li:has( > span:contains("Numero di marce")) span`,
            technicalNumberCylinder: `.techSpecs li:has( > span:contains("Cilindri")) span`,
            dimensionsNumberDoor: `.dimensions li:has( > span:contains("Numero di porte")) span`,
            dimensionsNumberSeat: `.dimensions li:has( > span:contains("Numero di posti")) span`,
            environmentFuelConsumption: `.environment li:has( > span:contains("Consumo di carburante")) span`,
            equipmentStandard: `section:has( > h3:contains("Equipaggiamento standard ")) .equipmentList`,
            equipmentOptional: `section:has( > h3:contains("Attrezzatura opzionale ")) .equipmentList`,
            leadButton: ".contactUs .contact",
            buyOnline: '.buy',
            bookTestDrive: ".testDrive",

        };
    }

    // Starmark-specific selectors
    else if (Cypress.config("targetSite") === "starmark") {
        return {
            ...commonSelectors,
            carName: '[data-test-id="listing_details_name"]',
            carVariant: '.variant',
            carYear: '.variant',
            carKilometrage: '.variant',
            carPrice: '.retailPrice',
            emiPrice: '.financingPrice',
            leasePrice: '.leasingPrice',
            mainDetails: '[data-test-id="listing_details_main_specs"]',
            specColor: '[data-test-id="listing_details_main_specs"] span:contains("Farve") + p',
            specKilometrage: '[data-test-id="listing_details_main_specs"] span:contains("Kilometertal") + p',
            specHp: '[data-test-id="listing_details_main_specs"] span:contains("Hestekræfter") + p',
            specGear: '[data-test-id="listing_details_main_specs"] span:contains("Gear") + p',
            specRegDate: '[data-test-id="listing_details_main_specs"] span:contains("1. registrering") + p',
            specFuel: '[data-test-id="listing_details_main_specs"] span:contains("Brændstof") + p',
            generalYear: '.specs dt:contains("Årgang") + dd',
            generalColor: '.specs dt:contains("Farve") + dd',
            generalKilometrage: '.specs dt:contains("Kilometertal") + dd',
            generalRange: '.specs dt:contains("Elektrisk rækkevidde") + dd',
            generalRegDate: '.specs dt:contains("Registrering") + dd',
            generalFuel: '.specs dt:contains("Brændstof") + dd',
            generalReference: '.specs dt:contains("Referencenummer") + dd',
            generalFuelCons: '.specs dt:contains("Km/liter") + dd',
            generalGreenTax: '.specs dt:contains("Grøn ejerafgift") + dd',
            technicalHp: '.specs dt:contains("HK") + dd',
            technicalAcceleration: '.specs dt:contains("Acceleration (0-100 km/t)") + dd',
            technicalTopspeed: '.specs dt:contains("Tophastighed") + dd',
            // technicalNumberAirbag: '.specs details:eq(1) dl dd:eq(3)',
            technicalNumberGear: '.specs dt:contains("Antal gear") + dd',
            technicalTorque: '.specs dt:contains("Torque") + dd',
            technicalNumberCylinder: '.specs dt:contains("Antal cylindre") + dd',
            dimensionsWeight: '.specs dt:contains("Totalvægt") + dd',
            dimensionsAttachment: '.specs dt:contains("Maks. anhængervægt") + dd',
            dimensionsLoad: '.specs dt:contains("Lastvolumen") + dd',
            dimensionsNumberDoor: '.specs dt:contains("Antal døre") + dd',
            equipments: '.specs .toggle:eq(3) > *',
            equipmentWholesale: '.specs div p',
            specs: '[class="specs"]',
            downpayment: '#downpayment',
            emi: '[class="blue-text"]',
            terms: '[class="paymentTerms"]',
            financingPartner: '[class="financingBy"]',
            buyButton: '[data-test-id="listing_details_buy_button"]',
            buyOnline: '[data-test-id="listing_details_buy_button"]',
            likeButton: '[data-test-id="listing_details_favorite"]',
            carImageMain: '[data-test-id="listing_details_main_image"]',
            carImageThumbs: ".thumbs .thumb img",
            carImageThumb1: '[data-test-id="listing_images_thumb_0"]',
            carImageThumb2: '[data-test-id="listing_images_thumb_1"]',
            carImageThumb3: '[data-test-id="listing_images_thumb_2"]',
            reservedTag: '.reservedTag .reserved',
            leadButton: '[data-test-id="listing_details_buy_button"]',

            // Leasing locators
            leaseAudience: '.leasingHeader div:first() h2',
            leasePrice: '.leasingHeader',
            leaseDownPayment: '.leasingDetails li:first() .value',
            leaseResidualValue: '.leasingDetails li:eq(1) .value',
            leaseDuration: '.leasingDetails li:eq(2) .value',
            leaseVat: '.leasingDetails li:eq(3) .value',

            // Wholesale listing
            wholesale_price: '[class="leasingPrice"]',
        };
    }

    // Seez-specific selectors
    else if (Cypress.config("targetSite") === "seez") {
        return {
            ...commonSelectors,
            carImageMain: ".imageSlider img",
            carImageThumbs: ".rightImagesWrapper img",
            carImageThumb1: ".rightImagesWrapper img:first()",
            carImageThumb2: ".rightImagesWrapper img:eq(1)",
            carImageThumb3: ".rightImagesWrapper img:eq(2)",
            carName: '.carInfo div',
            carVariant: '.carInfo p',
            carYear: '.carInfo span',
            carKilometrage: '.carInfo span:eq(1)',
            carInfo: '[class="carInfo"]',
            specKilometrage: '.specGrid .specBox:first() div ',
            specRegDate: '.specGrid .specBox:eq(1) div ',
            specFuel: '.specGrid .specBox:eq(2) div ',
            specHp: '.specGrid .specBox:eq(3) div ',
            specFuelCons: '.specGrid .specBox:eq(4) div ',
            specRange: '.specGrid h5:contains("Elektrisk rækkevidde") + p', // for bag
            specGear: '.specGrid .specBox:eq(5) div ',
            carEquipment: '.equipmentWrapper',
            carPrice: '[class="pricewithCaption"]',
            emiPrice: '[class="priceFinance"]',
            mainDetails: '[class="leftContent"]',
            specs: '[class="specs"]',
            downpayment: '#downpayment',
            emi: '[class="blue-text"]',
            terms: '[class="paymentTerms"]',
            financingPartner: '[class="financingBy"]',
            buyButton: '#desktop-btn',
            likeButton: '.actionList li:eq(1)',
            buyOnline: '.priceInfo:first() .desktopBtn:first()',
            mainInfo: '[class="specGrid"]',
            dealerInfo: '[class="dealerBanner"]',
            details: '[class="specsToggleList"]',
            generalYear: '.specsToggleList dt:contains("Årgang") + dd',
            generalColor: '.specsToggleList dt:contains("Farve") + dd',
            generalKilometrage: '.specsToggleList dt:contains("Kilometertal") + dd',
            generalRange: '.specsToggleList dt:contains("Elektrisk rækkevidde") + dd',
            generalRegDate: '.specsToggleList dt:contains("Registrering") + dd',
            generalFuel: '.specsToggleList dt:contains("Brændstof") + dd',
            generalReference: '.specsToggleList dt:contains("Referencenummer") + dd',
            generalFuelCons: '.specsToggleList dt:contains("Batteriforbrug") + dd',
            generalGreenTax: '.specsToggleList dt:contains("Grøn ejerafgift") + dd',
            generalBodyType: '.specsToggleList details:first() dl div:eq(5) dd',
            generalCategory: '.specsToggleList details:first() dl div:eq(6) dd',
            generalDemo: '.specsToggleList dt:contains("Demo bil") + dd', //starmark
            generalImport: '.specsToggleList dt:contains("Importeret") + dd', //starmark
            generalDemo_bag: '.specsToggleList details:first() dl div:eq(9) dd', //bag
            generalImport_bag: '.specsToggleList details:first() dl div:eq(10) dd', //bag
            serviceKilometrage: '.specsToggleList details:eq(1) dl div:first() dd',
            serviceNext: '.specsToggleList details:eq(1) dl div:eq(1) dd',
            serviceLast: '.specsToggleList details:eq(1) dl div:eq(2) dd',
            technicalPerformance: '.specsToggleList details:eq(2) dl div:first() dd',
            technicalTopspeed: '.specsToggleList details:eq(2) dl div:eq(1) dd',
            technicalAcceleration: '.specsToggleList details:eq(2) dl div:eq(2) dd',
            technicalCoupling: '.specsToggleList details:eq(2) dl div:eq(3) dd',
            technicalNumberGear: '.specsToggleList dt:contains("Antal gear") + dd',
            technicalNumberAirbag: `.specsToggleList dt:contains("Antal airbags") + dd`,
            technicalNumberCylinder: '.specsToggleList dt:contains("Antal cylindre") + dd',
            technicalEngineSize: '.specsToggleList dt:contains("Slagvolumen") + dd',
            technicalDriveType: '.specsToggleList dt:contains("Hjultræk") + dd',
            dimensionsWeight: '.specsToggleList details:eq(3) dl div:first() dd',
            dimensionsNetWeight: '.specsToggleList details:eq(3) dl div:eq(1) dd',
            dimensionsLoad: '.specsToggleList details:eq(3) dl div:eq(2) dd',
            dimensionsLength: '.specsToggleList details:eq(3) dl div:eq(3) dd',
            dimensionsHeight: '.specsToggleList details:eq(3) dl div:eq(4) dd',
            dimensionsWidth: '.specsToggleList details:eq(3) dl div:eq(5) dd',
            dimensionsAttachment: '.specsToggleList details:eq(3) dl div:eq(6) dd',
            dimensionsNumberSeat: '.specsToggleList details:eq(3) dl div:eq(7) dd',
            dimensionsAttachmentUnbraked: '.specsToggleList details:eq(3) dl div:eq(8) dd',
            dimensionsNumberDoor: '.specsToggleList details:eq(3) dl div:eq(9) dd',
            economySafety: '.specsToggleList details:eq(4) dl div:first() dd',
            economyNox: '.specsToggleList dt:contains("N0x udledning") + dd',
            economyCo2: '.specsToggleList dt:contains("Co2 udledning") + dd',
            economyGreenTax: '.specsToggleList dt:contains("Årlig grøn ejerafgift") + dd',
            economyHalfYearTax: '.specsToggleList dt:contains("Halvårlig grøn ejerafgift") + dd',
            economyFuelCons: '.specsToggleList details:eq(4) dl div:eq(5) dd', //bag
            equipmentTech: '.specsToggleList details:eq(5) ul li:first()',
            equipmentDesign: '.specsToggleList details:eq(6) ul li:first()',
            equipmentSafety: '.specsToggleList details:eq(7) ul li:first()',
            brandDetail: '[class="brandSEO"]',
            images: '[class="imageGrid fade-in"]',
            reservedTag: '.reservedTag .reserved',
            //
        };
    }

    // BAG-specific selectors
    else if (Cypress.config("targetSite") === "bag") {
        return {
            ...commonSelectors,
            carImageThumbs: ".thumb img",
            carImageThumb1: ".thumb img:first()",
            carImageThumb2: ".thumb img:eq(1)",
            carImageThumb3: ".thumb img:eq(2)",
            carImageThumb4: ".thumb img:eq(3)",
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

export const listing = getSelectors();
