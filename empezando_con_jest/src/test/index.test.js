const { randomString } = require('..')

describe('Probando funcionalidades de randomString', () => {

  test('Se espera que devuelva un string', () =>  {
    expect(typeof (randomString())).toBe('string')
  })

  test('Comprobar que una ciudad no existe', () => {
    expect(randomString()).not.toMatch(/Jamaica/)
  })

})
