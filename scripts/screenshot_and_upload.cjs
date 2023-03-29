#!/usr/bin/node

const cloudinary = require('cloudinary').v2;
const { createServer } = require('vite');
const { chromium } = require('playwright');

require('dotenv').config()
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

(async () => {
  const server = await createServer();
  await server.listen();

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`http://localhost:5173?lat=${process.env.LATITUDE}&lon=${process.env.LONGITUDE}`);
  await page.locator('.eink_dashboard').screenshot({ path: 'weather.jpg', quality: 100 })

  await cloudinary.uploader.destroy("eink_weather", {invalidate: true});
  await cloudinary.uploader.upload('weather.jpg', {public_id: "eink_weather"});
  const url = cloudinary.url("eink_weather", {
    width: 800,
    height: 480
  });
  console.log(url);

  await browser.close();
  await server.close();
})();
