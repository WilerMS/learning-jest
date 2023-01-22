## Testing con JEST

### Instalando JEST

Jest es una librería de JavaScript que sirve para testear el código de las aplicaciones.

*Para instalar la librería usamos el comando:*
```zsh
  npm install --save-dev jest
```

Una vez instalado ya podemos comenzar a crear nuestros tests. En primer lugar, para ejecutar los test de forma correcta debemos:

1. Agregar los siguientes scripts:
```json
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage" // para usar esto, debe estar git inicializado
  }
```
2. Ejecutar uno de los siguientes comandos
  - `npm run test` para ejecutar los tests una vez.
  - `npm run test:watch` para ejecutar cada vez que se realiza un cambio en el código.
  - `npm run test:coverage` para crear un reporte e inspeccionar el alcance de nuestro código. *Se detallará más adelante*

###  Empezando con JEST

Lo primero que debemos hacer es crear una carpeta donde estén contenidos nuestros test, por lo general la creamos en `src/test`. En esta carpeta podemos crear los archivos de test con la siguiente nomeclatura `<nombre_del_archivo>.test.js`.

En jest disponemos de varias funciones que nos ayudarán con la creación y declaración de nuestros tests, entre ellas:

- **`describe`**: sirve para crear un scope para una funcionalidad específica, dentro de esta podemos definir cuantos test queramos para una misma funcionalidad.
- **`test`**: sirve para ejecuar un test sobre una funcionalidad específica
- **`expect`**: sirve para ejecuar un test sobre una funcionalidad específica

Explicados cada uno de los métodos necesarios, la función quedaría de la siguiente manera:
```js
  // string -> texto sobre la funcionalidad que ha de testearse dentro
  describe(string, () => {
    // scope en el que incluir aquellos test necesarios para esta funcionalidad

    // string -> texto para describir la funcionalidad específica a testear
    test(string, () => {
      // scope en el que incluir aquellos valores esperados

      expect(2+2).toBe(4); // Este test da success
      expect('Hola mundo').toMatch(/mundo/); // Este test da success
      expect(null).not.toBeNull(); // Este test falla
    })
  })  
```

#### Matchers

En la función anterior se usaron métodos como `toBe`, `toMatch` y `not.toBeNull`. Estos son denominados matchers y sirven para comprobar que el valor del parametro cumple algún tipo de lógica *(especificada por nosotros)*.

Existen muchos tipos de matchers, por lo que es imposible detallarlos todos. Sin embargo, vamos a explicar los que consideramos más importantes:

  - **toBe**: comprueba que el valor especificado es igual al retornado.
  - **toBeNull**: comprueba que el valor retornado es nulo.
  - **toBeUndefined**: comprueba que el valor retornado es undefined.
  - **toBeDefined**: comprueba que el valor retornado no es undefined.
  - **toBeTruthy**: comprueba que es true.
  - **toBeGreaterThanOrEqual**: comprueba que el valor especificado es mayor que el retornado.
  - **toBeLessThanOrEqual**: comprueba que el valor especificado es menor que el retornado.
  - **toMatch**: comprueba que un string pasa una regexp.
  - **toContain**:  comprueba que un array contiene un elemento.

A continuación, unos cuantos ejemplos que pueden ser interesantes.

```js
  const boolean = true
  const number = 23
  const text = 'Hola mundo'
  const array = ['Perro', 'Banana', 'fruta']

  describe('Descripción de tests de prueba', () => {

    test('Debe contener un texto', () => {
      expect(text).toMatch(/mundo/) // Success
    })

    test('Debe contener una banana', () => {
      expect(array).toContain('Banana') // Success
    })

    test('Es mayor que 23', () => {
      expect(number).toBeGreaterThan(23) // Failed
    })

    test('Es verdadero', () => {
      expect(boolean).toBeTruthy() // Success
    })
  })
```

#### Funciones

Cuando testeamos aplicaciones, lo más común es testear una función en específico. Para ello lo hacemos de la siguiente manera:

```js
  const reverseString = (string) => {
    return string.split('').reverse().join('')
  }
  test('Debería retornar el string al revés', () => {
      expect(reverseString('Hola')).toMatch('aloH') // Success
  })
```

También, puede darse el caso de querer ejecutar una función antes de empezar o después de acabar cada uno de los test, para ello tenemos las siguientes funciones:

```js
  beforeEach(() => { /* Se ejecuta antes de cada una de las pruebas. */ })
  beforeAll(() => { /* Se ejecuta antes de todas las pruebas. */ })
  afterEach(() => { /* Se ejecuta después de cada una de las pruebas. */ })
  afterAll(() => { /* Se ejecuta despues de todas las pruebas. */ })
```

#### Promesas

Otra de las funcionalidades a testear pueden ser las promesas, para testearlas debemos hacer lo siguiente:

```js
  const reverseString = (string) => {
    return new Promise((resolve, reject) => {
      if (!Boolean(string)) reject('Error')
      resolve(string.split('').reverse().join(''))
    })
  }

  describe('Testeando la promesa reverseString', () => {
    // Usando then para esperar las respuestas
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
  })
```

###  JEST con REACT



