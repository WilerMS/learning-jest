/* 
  Para testear una función simplemente 
  se ejecuta la función en el expect
*/

const reverseString = (string) => {
  return string.split('').reverse().join('')
}

test('Da la vuelta a el string Hola', () => {
  expect(reverseString('Hola')).toBe('aloH')
})