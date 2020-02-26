import React from 'react';
import renderer from 'react-test-renderer';
import LoadingScreen from '../screens/LoadingScreen'
import sum from '../screens/sum'


test('pure function returns the same output for the same input', () => {
  expect(sum(2, 2)).toBe(4);
});

