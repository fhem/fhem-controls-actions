const getDataFromPath = require('../src/func');

test('gen controls content', () => {
  const data =  getDataFromPath('./__tests__', '.pm');
  expect(data).toContain('UPD  33     ./__tests__/mock.pm')
 // console.log(data);
});