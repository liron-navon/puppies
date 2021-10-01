import { getTestUrl } from "../../test-utils/test-server";

describe('pup-title', () => {
    beforeAll(async () => {
        await page.goto(getTestUrl('pup-title', 'primary'));
    })

    it('should load title', async () => {
        const response = await page.evaluate(async () => {
            const title = document.body.querySelector('pup-title');
            return {
                shadow: title.shadowRoot.innerHTML,
                title: title.textContent
            };
        })

        const { title, shadow } = response
        expect(shadow).toContain('<h1><slot></slot></h1>');
        expect(title).toEqual('hello world');
    })
})