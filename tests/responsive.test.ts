import { Responsive } from '@libs';
import test from 'node:test';

test('responsive teste ', () => {
  expect(Responsive('320', '430', 1299)).toBe(true);
});
