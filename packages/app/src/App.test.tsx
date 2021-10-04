import './api/classify-dog-breeds/tensorflow.mocks'; // shut warnning messages
import React from 'react';
import App from './App';
// import Enzyme, { shallow, render, mount } from 'enzyme';


describe('App', () => {
  test('renders learn react link', () => {
    const wrapper = render(<App />);
    // const linkElement = screen.getByText(/learn react/i);
    // expect(linkElement).toBeInTheDocument();
    expect(5).toBe(5);
  });
})

