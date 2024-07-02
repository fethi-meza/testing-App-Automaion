import { Page } from "@playwright/test";
import HomePage from "./HomePage";
import logger from "../utils/LoggerUtils"

export class LoginPage {
    private readonly userNameInputSelector = "#username";
    private readonly passwordInputSelector = "#password";
    private readonly loginBtnSelector = "#Login";

    constructor(private page: Page) {}

    async navigateToLoginPage() {
        await this.page.goto("/"); 
        logger.info("Navigated to login.salesforce.com");
    }

    async fillUserName(username: string) {
        await this.page.locator(this.userNameInputSelector).fill(username);
        logger.info("Filled username");
    }

    async fillPassword(password: string) {
        await this.page.locator(this.passwordInputSelector).fill(password);
        logger.info("Filled pasword");
    }

    async clickLoginBtn() {
        await this.page.locator(this.loginBtnSelector).click();
        return new HomePage(this.page);
    }
}
