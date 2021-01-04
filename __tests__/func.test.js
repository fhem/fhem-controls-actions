/* eslint-env node */

const getDataFromPath = require('../src/func');

test('gen controls content for pm file', () => {
  const data =  getDataFromPath('./__tests__', '.pm');
  expect(data).toContain('UPD 2020-12-30_03:02:16 33     ./__tests__/mock.pm')
  console.log(data);
});

test('gen controls content for inexistent extension', () => {
  const data =  getDataFromPath('./__tests__', '.ol');
  expect(data).not.toContain('UPD 2020-12-30_03:02:16 33     ./__tests__/mock.pm')
  console.log(data);
});