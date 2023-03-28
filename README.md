# Eink Dashboard
Very hacked together, auto updating, eink dashboard.

Eventually, the way this will work:
- chron job on desktop that requests current/forecasted weather data, renders the dash in the browser, takes a screenshot of that and uploads it to cloudinary.
- chron job on inky frame 7" that requests image from cloudinary and renders it to the display.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server with mock data:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To start server and make request to open weather API on page load:

```bash
npm run build
```
