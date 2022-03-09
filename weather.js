const puppeteer = require('puppeteer');
const DataFrame = require('dataframe-js').DataFrame;
const month = 2;
const days = [2, 3];

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    for (day of days) {
        await page.goto(`https://www.wunderground.com/history/daily/vn/qu%E1%BA%ADn-t%C3%A2n-b%C3%ACnh/VVTS/date/2022-${month}-${day}`);
        await page.waitForTimeout(15000);

        // Wait for the required DOM to be rendered
        await page.waitForSelector('.mat-column-temperature');
        const temps = await page.$$eval('td.mat-column-temperature span.wu-value.wu-value-to', html_tag => {
            values = html_tag.map(el => Math.round(5/9 * (parseInt(el.getInnerHTML()) - 32), 0))
            return values;
        });
        const conditions = await page.$$eval('td.mat-column-condition span.ng-star-inserted', html_tag => {
            values = html_tag.map(el => el.getInnerHTML());
            return values;
        });
        const humids = await page.$$eval('td.mat-column-humidity span.wu-value.wu-value-to', html_tag => {
            values = html_tag.map(el => el.getInnerHTML());
            return values;
        });
        const winds = await page.$$eval('td.mat-column-windSpeed span.wu-value.wu-value-to', html_tag => {
            values = html_tag.map(el => el.getInnerHTML());
            return values;
        });
        const data = temps.map((e, i) => [e, humids[i], winds[i], conditions[i]]);
        const df = new DataFrame(data, columns=['temperature', 'Humidity', 'has_wind', 'weather_now']);
        df.toCSV(true, `./data/data-${month}-${day}.csv`);
    }
    
    await browser.close();
})();