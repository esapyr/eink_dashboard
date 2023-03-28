/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  use: { channel: 'chrome' },
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: 'tests'
};

export default config;
