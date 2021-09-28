import {render} from 'lit';
import { Primary } from './title.stories';

describe('pup-title', () => {
    test('displays title text', () => {
        const container = window.document.createElement('div');
        render(Primary({ slot: 'test' }), container);
        expect(container.textContent).toBe('test')
    });
})
