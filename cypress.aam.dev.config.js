const { defineConfig } = require("cypress");
const { tagify } = require('cypress-tags');
const { cloudPlugin } = require("cypress-cloud/plugin");

module.exports = defineConfig({
  env: {
    viewportWidth: 1000,
    viewportHeight: 660,
    seezpad_username: "arleta+superuser3@seez.co",
    seezpad_password: "xxxxxx",
    buyer_username: "cypress+aam@seez.co",
    buyer_password: "xxxxxx"
  },
  e2e: {
    targetSite: "aam",
    baseUrl: 'https://aam.seez.dev/',
    searchPage: 'https://aam.seez.dev/search/',
    currency: 'QAR',
    currency_ar: 'ر.ق.',
    currencyStyled: 'QAR',
    api_token_url: 'https://xxx',
    api_url: 'https://xxx',
    language: "ar",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('file:preprocessor', tagify(config));
      return cloudPlugin(on, config);
    },
    target_site_id: 88,
    cms_api: "https://xxx",
    clientId: "aam",
    defaultListing: 'listing_aam',
    loanConfig: {
      minDownpaymentPercentageForLocal: 0.1,
      minDownpaymentPercentageForExpat: 0.2,
      standardRate: 6.80
    },
    supportPhone: '97440352222',
    supportEmail: 'preowned@aamotors.com',
    local: 'en-US',
    companyName: 'AAM',
    termsLink: '/terms',
    privacyLink: '/privacy',
    testDriveUrl: 'me/test-drives',
    defaultCommandTimeout: 30000,
    defaultReservationTime: 45,
    reservationExtendable: false,
    financingPartner: "aam",
    customerCountryOrigin: "international",
    flagUrl: "https://flagcdn.com/qa.svg",
    viewAllEnabled: false,
  },
  video: true,
  videoCompression: 15,
});
