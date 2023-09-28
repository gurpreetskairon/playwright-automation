import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // navigare to the application
  await page.goto("https://jupiter.cloud.planittesting.com/");
});
test.afterEach(async ({ page }) => {
  await page.close();
});

//########################################################################//
//   Test case 3:
//      1. Buy 2 Stuffed Frog, 5 Fluffy Bunny, 3 Valentine Bear.
//      2. Go to the cart page.
//      3. Verify the subtotal for each product is correct.
//      4. Verify the price for each product.
//      5. Verify that total = sum(sub totals).
//########################################################################//
test("Testcase 1: Validate error messages for Mandatory fields", async ({
  page,
}) => {});
