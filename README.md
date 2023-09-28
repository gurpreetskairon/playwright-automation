# Playwright Test Automation Project

This is a Playwright test automation project designed to automate the testing of web applications using Playwright, a powerful open-source automation framework for web browsers. With Playwright, you can write end-to-end tests for web applications in multiple browsers, such as Chromium, Firefox, and WebKit, making it a versatile tool for web application testing.

## Getting Started

Follow these instructions to get the project up and running on your local machine for testing purposes.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js: Make sure you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone this repository to your local machine using the following command:

```bash
   git clone https://github.com/your-username/playwright-test-automation.git
```

2. Change your working directory to the project folder:

```bash
   cd playwright-test-automation
```

3. Install the project dependencies using npm:

```bash
   npm install
```

### Configuration

Before running the tests, you need to configure the browsers you want to use and specify the URLs of the web applications you want to test. Configuration files can be found in the `config` folder.

- **config.json**: Modify this file to specify which browsers to use and their launch options.

- **urls.json**: Add the URLs of the web applications you want to test in this file.

## Writing Tests

You can start writing your tests in the `tests` folder. Playwright allows you to write tests in JavaScript or TypeScript.

Sample test (JavaScript):

```javascript
const { test, expect } = require("@playwright/test");

test("Example test", async ({ page }) => {
  await page.goto("https://example.com");
  await expect(page.locator("h1")).toHaveText("Example Domain");
});
```

For more information on writing tests with Playwright, refer to the [Playwright documentation](https://playwright.dev/docs/intro).

## Running Tests

You can run your tests using the following command:

```bash
npx playwright test
```

This command will execute all the tests in the `tests` folder using the configurations defined in the `config` folder.

To run a specific test, say Login.spec.js, execute the following command.

```bash
npx playwright test Login.spec.js
```

By default, Playwright will execute tests on all the browsers. In order to run the tests on a specific browser, we could specify the browser name in the command. The following command run the tests only on Chromium browser.

```bash
npx playwright test --project=chromium
```

By default, Playwright executes the tests in headless mode. In order to run the tests in a headed mode, use the following command.

```bash
npx playwright test --headed
```

To run the tests in the debug mode, add the --debug option to the command as shown follows:

```bash
npx playwright test --debug
```

## Reporting

Playwright provides built-in support for generating test reports in various formats. You can configure the report format and destination in the `playwright.config.js` file.
