import { test, expect } from "@playwright/test"; 
import { LoginPage } from "../pages/LoginPage";
import { config } from 'dotenv'; 
import{encrypt ,decrypt} from '../utils/CryptojsUtil'
import{encryptEnvFile ,decryptEnvFile} from'../utils/EncryptEnvFile'


config({ path: "../../.env" });

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
test.skip("simple test encrypt and dcrypte",async ({ page }) => {
//    const paintText = "hi-how-are-you";
//    const encrptedText = encrypt(paintText);
//    console.log("salt",process.env.SALT);
//    console.log("encrptedText",encrptedText);
//    const decrptedText = decrypt(encrptedText);
//    console.log("decrptedText",decrptedText);

   encryptEnvFile()
   


})
