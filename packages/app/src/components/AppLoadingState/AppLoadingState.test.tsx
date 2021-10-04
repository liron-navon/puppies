import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { AppLoadingState, LoadingState } from './AppLoadingState';

describe('AppLoadingState', () => {
    afterEach(cleanup);
    test('renders nothing when loading is Downloading', () => {
        const { container } = render(<AppLoadingState state={LoadingState.Downloading} />);
        const el = container.firstChild;
        expect(el?.textContent).toContain('Downloading...');
    });
    test('renders nothing when loading is Analyzing', () => {
        const { container } = render(<AppLoadingState state={LoadingState.Analyzing} />);
        const el = container.firstChild;
        expect(el?.textContent).toContain('Analyzing...');
    });
    test('renders nothing when loading is Done', () => {
        const { container } = render(<AppLoadingState state={LoadingState.Done} />);
        const el = container.firstChild;
        expect(el).toBe(null);
    });
})

