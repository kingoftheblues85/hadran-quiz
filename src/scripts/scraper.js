/**
 * THIS SCRIPT WILL SCRAPE ZICHRU FOR SIMANIM DATA
 * 
 */

const puppeteer = require('puppeteer');
const fs = require('fs')

// import puppeteer from "puppeteer";
// import fs from 'fs';

// Define the URL to the website to be scraped
const WEBSITE = "https://www.zichru.com/login"
const TRACTATE = "sotah"
const START_DAF = 2
const END_DAF = 49

// Replace with your own login credentials
const USERNAME = "aaronlevy85@gmail.com";
const PASSWORD = "Tiku78247806!";

const chromeOptions = {
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: false,
  slowMo: 5,
  defaultViewport: null,
  args: ['--disable-blink-features=AutomationControlled'],
}

const main = async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch(chromeOptions)

  // Open a new page
  const page = await browser.newPage();

  await page.goto(WEBSITE, {
    waitUntil: "domcontentloaded",
  });

  // Fill in the login credentials
  await page.type('input[name="email"]', USERNAME);
  await page.type('input[name="password"]', PASSWORD);

  // Wait for the user to solve the captcha manually and submit the form
  console.log('Please solve the captcha manually');

  await page.waitForNavigation({ waitUntil: 'networkidle0' });
  console.log('wait is complete')

  const data = [];

  for (let daf = START_DAF; daf <= END_DAF; daf++) {
    // Load the page with the data you want to scrape
    await page.goto(`https://www.zichru.com/${TRACTATE}-daf-${daf}`);

    // Wait for the page to load
    await page.waitForTimeout(1000);

    const scrapedData = await page.evaluate((daf) => {
      const dafData = []
      const titles = document.querySelectorAll('h3');
      const paragraphs = document.querySelectorAll('section');
  
      for (let i = 0; i < titles.length; i++) {
        const p = {};
        p.id = i;
        p.title = titles[i].innerText.trim().replace(/^\d+\.\s(.*)$/gm, "$1");
        p.paragraph = paragraphs[i].innerText.trim().replace(/[\r\n]+/g, "");
        dafData.push(p)
      }

      return { daf: daf, data: dafData };

    }, daf);

    data.push(scrapedData)
  }

  console.log(data);

  // Close Puppeteer:
  await browser.close();

  // Convert the data object to a JSON string
  const jsonData = JSON.stringify(data, null, 2);

  // Write the JSON string to a file
  fs.writeFileSync(`${TRACTATE}_data.json`, jsonData);

  console.log('Data saved to data.json');
  
};


main();

