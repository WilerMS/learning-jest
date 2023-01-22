/* 
  Para testear una promesa se debe ejecutar la promesa
  y comprobar el valor esperado con:
    - Promise.then()
    - Async/Await
*/

const reverseString = (string) => {
  return new Promise((resolve, reject) => {
    if (!Boolean(string)) {
      reject('Error')
    }
    resolve(string.split('').reverse().join(''))
  })
}

// Usando then y catch para esperar las respuestas
test('Da la vuelta a el string Hola', async () => {
  return reverseString('Hola')
    .then((res) => {
      expect(res).toBe('aloH')
    })
})

test('Da la vuelta a el string Hola', async () => {
  const string = await reverseString('Hola')
  expect(string).toBe('aloH')
})