import { Page } from "@playwright/test";
import HomePage from "./HomePage";

export class LoginPage {
    private readonly userNameInputSelector = "#username";
    private readonly passwordInputSelector = "#password";
    private readonly loginBtnSelector = "#Login";

    constructor(private page: Page) {}

    async navigateToLoginPage() {
        await this.page.goto("/"); 
    }

    async fillUserName(username: string) {
        await this.page.locator(this.userNameInputSelector).fill(username);
    }

    async fillPassword(password: string) {
        await this.page.locator(this.passwordInputSelector).fill(password);
    }

    async clickLoginBtn() {
        await this.page.locator(this.loginBtnSelector).click();
        return new HomePage(this.page);
    }
}
