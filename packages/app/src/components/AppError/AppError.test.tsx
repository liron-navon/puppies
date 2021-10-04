import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { AppError, ErrorType } from './AppError';

describe('AppError', () => {
    afterEach(cleanup);
    test('renders nothing when error is FaildToClassify', () => {
        const { container } = render(<AppError error={ErrorType.FaildToClassify} />);
        const el = container.firstChild;
        expect(el?.textContent).toContain('Faied to classify the image, please try a different image.');
    });
    test('renders nothing when error is FailedToFetchImages', () => {
        const { container } = render(<AppError error={ErrorType.FailedToFetchImages} />);
        const el = container.firstChild;
        expect(el?.textContent).toContain('Failed to fetch images, please check your network connection and try again.');
    });
    test('renders nothing when error is NotADog', () => {
        const { container } = render(<AppError error={ErrorType.NotADog} />);
        const el = container.firstChild;
        expect(el?.textContent).toContain('This isn\'t an image of a dog');
    });
    test('renders nothing when error is None', () => {
        const { container } = render(<AppError error={ErrorType.None} />);
        const el = container.firstChild;
        expect(el).toBe(null);
    });
})

