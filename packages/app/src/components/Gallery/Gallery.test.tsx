import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Gallery } from './Gallery';

describe('Gallery', () => {
    afterEach(cleanup);
    test('renders the gallery web component', () => {
        const { container } = render(<Gallery images={['x', 'y', 'z']} />);
        const el = container.querySelector('pup-lazy-loaded-gallery');
        expect(el).toBeInTheDocument();
    });
})

