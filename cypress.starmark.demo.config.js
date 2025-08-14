const { defineConfig } = require("cypress");
const { tagify } = require('cypress-tags') ;
const { cloudPlugin } = require("cypress-cloud/plugin");

module.exports = defineConfig({
  env: {
    viewportWidth: 1000,
    viewportHeight: 660,
    seezpad_username: "arleta+superuser3@seez.co",
    seezpad_password: "xxxxxx",
    buyer_username: "cypress+starmark@seez.co",
    buyer_password: "xxxxxx"
  },
  e2e: {
    environment: 'demo',
    targetSite: "starmark",
    baseUrl: 'https://starmark-demo.seez.dk/',
    searchPage: 'https://starmark-demo.seez.dk/soegeresultater/',
    searchPageWholesale: 'https://starmark-demo.seez.dk/soegeresultater/engros',
    currency: 'kr',
    currencyStyled: 'DKK',
    api_token_url: 'https://xxx',
    api_url: 'https://xxx',
    language: "da",
    setupNodeEvents(on, config) {
      on('file:preprocessor', tagify(config));
      return cloudPlugin(on, config);
    },
    target_site_id: 2,
    lease_ref: '553402',
    cms_api: "https://xxx",
    clientId: "sm",
    defaultListing: 'listing_starmark_retail',
    myOrdersLink: 'min/ordrer',
    companyName: 'Starmark',
    termsLink: '',
    privacyLink: '',
    defaultCommandTimeout: 30000,
    financingPartner: "santander",
    local: "da-DK",
    customerCountryOrigin: "local",
    flagUrl: "https://flagcdn.com/dk.svg",
    viewAllEnabled: true,
    defaultBrandId: 23
  },
  video: true,
  videoCompression: 15,
});
