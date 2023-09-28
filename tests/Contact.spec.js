import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // navigare to the application
  await page.goto("https://jupiter.cloud.planittesting.com/");
});
test.afterEach(async ({ page }) => {
  await page.close();
});

//########################################################################//
//   Test case 1:
//      1. From the home page, go to the contact page.
//      2. Click the submit button.
//      3. Verify error messages.
//      4. Populate mandatory fields.
//      5. Validate errors are gone.
//########################################################################//
test("Testcase 1: Validate error messages for Mandatory fields", async ({
  page,
}) => {
  // click on the Contact menu to go to Contact page
  await page.locator("//a[@href='#/contact']").click();
  await page.locator(".btn-contact").click();

  const forenameError = await page.locator("#forename-err").textContent();
  await expect(forenameError).toBe("Forename is required");

  const emailError = await page.locator("#email-err").textContent();
  await expect(emailError).toBe("Email is required");

  const messageError = await page.locator("#message-err").textContent();
  await expect(messageError).toBe("Message is required");

  await page.locator("#forename").fill("Gurpreet");
  await expect(await page.locator("#forename-err").count()).toEqual(0);

  await page.locator("#email").fill("gurpreet.singh@abc.com");
  expect(await page.locator("#email-err").count()).toEqual(0);

  await page.locator("#message").fill("This is a sample message.");
  expect(await page.locator("#message-err").count()).toEqual(0);
});

//########################################################################//
//   Test case 2:
//      1. From the home page go to contact page.
//      2. Populate mandatory fields.
//      3. Click submit button.
//      4. Validate successful submission message.
//   Note: Run this test 5 times to ensure 100% pass rate.
//########################################################################//

test("[Testcase_2]: Validate successful submission messages on providing all mandatory field values", async ({
  page,
}) => {
  // click on the Contact menu to go to Contact page
  await page.locator("//a[@href='#/contact']").click();

  await page.locator("#forename").fill("Gurpreet");

  await page.locator("#email").fill("gurpreet.singh@abc.com");

  await page.locator("#message").fill("This is a sample message.");

  await page.locator(".btn-contact").click();
  await page.waitForSelector(".alert-success");
  await expect(page.locator(".alert-success")).toBeVisible();
});
