Cypress.Commands.add('getCMS', () => {
  const apiUrl = Cypress.config('cms_api');

  // Login  as a superuser
  return cy.loginAsDealer().then((accessToken) => {

    // Send a query to CMS api
    return cy.request({
      method: 'POST',
      url: `${apiUrl}/api`,
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: {
        "query": `query { sections { id name publish parentId assets { keyName values { lang text }}}}`,
      }
    }).then((response) => {
      const rawData = response.body

      // Process the raw data into readable keys
      return convertToStructuredData(rawData)
    });
  });
});
  
  
function convertToStructuredData(rawData) {
  let structuredData = {};

  // Safely navigate through nested data, avoiding error when there is a null value
  const sections = rawData && rawData.data && rawData.data.sections ? rawData.data.sections : [];

  // Iterate each section of CMS
  sections.forEach(section => {

    // Store attributes
    const sectionName = section.name;
    const parentId = section.parentId;

    // If parentId exists, find the parent section by ID and gets its name
    // If no parent is found or if parentId is undefined, default to 'None'.
    const parentName = parentId ? (sections.find(s => s.id === parentId)?.name || 'None') : 'None';

    // Iterate over each asset within the section
    section.assets?.forEach(asset => {

      // When a key name contains space, it should be replace to _ (for example, "Hybrid (Diesel)" should be changed to Hybrid_(Diesel))
      const keyName = asset.keyName.replace(' ', '_');

      // Construct a baseKey using the parent name, section name, and asset's key name.
      const baseKey = `${parentName}_${sectionName}_${keyName}`;

      // Iterate over values in each asset
      asset.values?.forEach(value => {

        // Store languages and the respective texts
        const lang = value.lang;
        const text = value.text;

        // Assign the text to the appropriate language key within the nested structure of structuredData
        // If the base key doesn't exist, create an empty object
        if (!structuredData[baseKey]) {
          structuredData[baseKey] = {};
        }
        structuredData[baseKey][lang] = text;
      });
    });
  });

  return structuredData;
}
  
Cypress.Commands.add('saveCMSContent', () => {
    cy.getCMS().then(structuredData => {

      // Contruct a .js file to save translation data
      const fileContent = JSON.stringify(structuredData, null, 4)
      
      // Save the file in the /fixtures directory
      cy.writeFile('cypress/fixtures/translation.json', fileContent);
    });
  });
  
  