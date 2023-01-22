/* 
  Hay muchos métodos para usar como matchers
    ** Truthiness **
      - toBeNull
      - toBeDefined
      - toBeTruthy
    ** Numbers **
      - toBeGreaterThanOrEqual
      - toBeLessThanOrEqual
      - toEqual
    ** Strings **
      - toMatch -> Match con regexp
    ** Arrays **
      - toContain -> Contiene un elemento
    ... más en jestjs.io
*/

test('Debe contener un texto', () => {
  expect('mundo').toMatch(/mundo/)
})

test('Debe contener una banana', () => {
  expect(['Perro', 'Banana', 'fruta']).toContain('Banana')
})

test('Es mayor que 23', () => {
  expect(25).toBeGreaterThan(23)
})

test('Es verdadero', () => {
  expect(true).toBeTruthy()
})

/* beforeEach(() => { 
  console.log('Se ejecuta antes de cada prueba')
 })
beforeAll(() => { 
  console.log('Se ejecuta antes de todas las prueba')
 })
afterEach(() => { 
  console.log('Se ejecuta despues de cada prueba')
 })
afterAll(() => { 
  console.log('Se ejecuta despues de todas las prueba')
}) */