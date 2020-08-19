const puppeteer = require('puppeteer');

(async () => {
    const startDate = '2020-08-28'
    const endDate = '2020-08-30'
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url ='https://wisconsin.goingtocamp.com/create-booking/results?resourceLocationId=-2147483643&mapId=-2147483515&searchTabGroupId=0&bookingCategoryId=0&startDate=' +
        startDate +
        'T00:00:00.000Z&endDate=' +
        endDate +
        'T00:00:00.000Z&nights=2&isReserving=true&equipmentId=-32768&subEquipmentId=-32768&partySize=4'
    console.log(url)
    await page.goto(url)
    await page.waitFor('#acknowledgement-input')
    await page.evaluate(() => {
        document.querySelector("#acknowledgement-input").parentElement.click();
    });
    await page.waitForSelector('.margin-top-10 > .ng-tns-c33-20 > #acknowledgement > .mat-checkbox-layout > .mat-checkbox-inner-container')
    await page.click('.margin-top-10 > .ng-tns-c33-20 > #acknowledgement > .mat-checkbox-layout > .mat-checkbox-inner-container')

    await page.waitForSelector('div > .btn-update-search > #actionSearch > .mat-button-wrapper > .ng-star-inserted')
    await page.click('div > .btn-update-search > #actionSearch > .mat-button-wrapper > .ng-star-inserted')

    await page.waitForSelector('.btn-search-results-toggle > #mat-button-toggle-2 > #mat-button-toggle-2-button > .mat-button-toggle-label-content > .fa')
    await page.click('.btn-search-results-toggle > #mat-button-toggle-2 > #mat-button-toggle-2-button > .mat-button-toggle-label-content > .fa')

    await page.waitForSelector('div > .btn-update-search > .btn-search > .mat-button-wrapper > .ng-star-inserted')
    await page.click('div > .btn-update-search > .btn-search > .mat-button-wrapper > .ng-star-inserted')

    await page.waitForSelector('div > .btn-update-search > #actionSearch > .mat-button-wrapper > .ng-star-inserted')
    await page.click('div > .btn-update-search > #actionSearch > .mat-button-wrapper > .ng-star-inserted')

    await page.waitForSelector('div > .btn-update-search > .btn-search > .mat-button-wrapper > .ng-star-inserted')
    await page.click('div > .btn-update-search > .btn-search > .mat-button-wrapper > .ng-star-inserted')

    await page.waitForSelector('#mat-button-toggle-2 > #mat-button-toggle-2-button > .mat-button-toggle-label-content > .fa > .svg-inline--fa')
    await page.click('#mat-button-toggle-2 > #mat-button-toggle-2-button > .mat-button-toggle-label-content > .fa > .svg-inline--fa')

    await page.waitForSelector('#resource-0 > div')

    for(let resourceSelectorCounter = 0; resourceSelectorCounter < 10; resourceSelectorCounter++){
        let resourceSelector = '#resource-' + String(resourceSelectorCounter) + ' > div';
        let availabilitySelector = '#availability-' + String(resourceSelectorCounter) + '> div';
        let response = await page.$(resourceSelector)
        if(response === null) {
            break;
        }
        let resource = await page.evaluate(selector => {
            return Promise.resolve(document.querySelector(selector).innerHTML)
        }, resourceSelector)
        let availability = await page.evaluate(selector => {
            return Promise.resolve(document.querySelector(selector).innerHTML)
        }, availabilitySelector)

        console.log(resource + '->' + availability)
    }
    await page.screenshot({path: 'search.png', fullPage: true});
    await browser.close();
})();
