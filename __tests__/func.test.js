const getDataFromPath = require('../src/func');

test('gen controls content for pm file', () => {
  const data =  getDataFromPath('./__tests__', '.pm');
  expect(data).toContain('UPD 2020-12-30_03:02:16 33     ./__tests__/mock.pm')
  expect(data).not.toContain('UPD 2021-01-05_22:45:33 36     ./__tests__/mock.pm.bck')

  // console.log(data);
});

test('gen controls content for pm and pm.bck file', () => {
  const data =  getDataFromPath('./__tests__', '.pm|.bck');
  expect(data).toContain('UPD 2020-12-30_03:02:16 33     ./__tests__/mock.pm')
  expect(data).toContain('UPD 2021-01-05_22:45:33 36     ./__tests__/mock.pm.bck')
  //console.log(data);
});


test('gen controls content for inexistent extension', () => {
  const data =  getDataFromPath('./__tests__', '.ol');
  expect(data).not.toContain('UPD 2020-12-30_03:02:16 36     ./__tests__/mock.ol')
  //console.log(data);
});

test('gen controls content for inexistent extension', () => {
  const data =  getDataFromPath('./__tests__', 'pm.bck');
  expect(data).toContain('UPD 2021-01-05_22:45:33 36     ./__tests__/mock.pm.bck')
  //console.log(data);
});