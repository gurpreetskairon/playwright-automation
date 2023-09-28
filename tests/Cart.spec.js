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
}) => {
  let productData = new Map();
  productData.set("Stuffed Frog", [2]);
  productData.set("Fluffy Bunny", [5]);
  productData.set("Valentine Bear", [3]);

  // click on the Contact menu to go to Contact page
  await page.locator("#nav-shop a").click();

  for (const product of productData.keys()) {
    productData
      .get(product)
      .push(
        await page.locator(`//h4[text() = '${product}']/..//span`).textContent()
      );

    // add # of products to cart
    for (let i = 0; i < productData.get(product)[0]; i++) {
      await page.locator(`//h4[text() = '${product}']/..//a`).click();
    }
  }

  // go to cart page
  await page.locator("#nav-cart").click();
  await page.waitForSelector("tr.cart-item");
  let rows = await page.locator("tr.cart-item").count();

  let expectedTotal = 0;
  for (let row = 1; row <= rows; row++) {
    const product = await page
      .locator(`tr.cart-item:nth-child(${row})>td:first-child`)
      .textContent();

    // compare the price of the product are same as selected in the Shop screen
    const value = productData.get(product.trim());
    expect(
      await page
        .locator(`tr.cart-item:nth-child(${row})>td:nth-child(2)`)
        .textContent()
    ).toEqual(value[1]);

    // compare the quantity of the product are same as selected in the Shop screen
    expect(
      await page
        .locator(`tr.cart-item:nth-child(${row})>td:nth-child(3)>input`)
        .inputValue()
    ).toEqual(value[0].toString());

    // validate the subtotal of each product
    const expectedSubtotal = value[0] * Number(value[1].slice(1));
    expectedTotal += expectedSubtotal;
    expect(
      await page
        .locator(`tr.cart-item:nth-child(${row})>td:nth-child(4)`)
        .textContent()
    ).toEqual(`$${expectedSubtotal}`);
  }

  // validate the Total amount
  expect(await page.locator(".total").textContent()).toEqual(
    `Total: ${expectedTotal}`
  );
});
