import { Page, expect } from "@playwright/test";

export default class HomePage {
    private readonly serviceTitleText = "Service"; 

    constructor(private page: Page) {}

    async expectServiceTitleToBeVisible() {
        await expect(this.page.locator(`text=${this.serviceTitleText}`)).toBeVisible({ timeout: 30000 });
    }
}
