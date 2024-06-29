// logintest.spec.ts
import { test, expect } from "@playwright/test"; // Import Playwright test utilities
import { LoginPage } from "../pages/LoginPage";
import { config } from 'dotenv'; 

// Load environment variables from specified .env file
config({ path: "../../.env" }); // Adjust path as per your project structure

// Check if environment variables are set
if (!process.env.USERNAME || !process.env.PASSWORD) {
    throw new Error('Environment variables USERNAME and PASSWORD must be set.');
}

test('should log in successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.fillUserName("dkboob@gamil.com");
    await loginPage.fillPassword(process.env.PASSWORD!);
    const homePage = await loginPage.clickLoginBtn();
    await homePage.expectServiceTitleToBeVisible();
});
