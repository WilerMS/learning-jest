<h1 align="center">TESTING CON JEST</h1>
<p align="center">Jest es un framework de testing de JavaScript enfocado a la simplicidad a la hora de testear aplicaciones.</p>
<p align="center"><img src="https://user-images.githubusercontent.com/70902862/213944396-419c64a6-c204-49c6-9de4-d7004f04c6ad.jpg"/></p> 

## Tabla de contenidos:

- [Tabla de contenidos:](#tabla-de-contenidos)
- [Introducciónnn](#introducciónnn)
- [Instalando Jest](#instalando-jest)
- [Primeros pasos](#primeros-pasos)
  - [Matchers](#matchers)
  - [Funciones](#funciones)
  - [Promesas](#promesas)
- [Jest con React Testing Library](#jest-con-react-testing-library)
  - [Configuración](#configuración)
  - [Testeando componentes](#testeando-componentes)

## Introducciónnn

TODO: Introducción a los tests y los tipos que existen.

## Instalando Jest
Para instalar la librería usamos el comando:
```console
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

##  Primeros pasos

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

  ### Matchers

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

### Funciones

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

### Promesas

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

##  Jest con React Testing Library

Jest se puede también utilizar con aplicaciones de react. Para poder usarlo necesitaremos disponer de otra librería que nos permita montar los componentes de react para poder testearlos correctamente.

### Configuración

En estos ejemplos se usa `enzyme` y `enzyme-adapter-react-16`, ya que la aplicación está en react 16. Estos necesitan de una configuración para poder ser usados:

- Instalamos las siguientes dependencias:
```console
  npm install --save-dev jest enzyme enzyme-adapter-react-16
  npm install --save-dev --save-exact jsdom jsdom-global
```
- Creamos la carpeta `src/test`, que es donde guardaremos nuestros test
- Creamos el archivo `src/test/setupTest.js` para crear un adaptador que le permitirá a jest montar los componentes de react.
```js
  // src/test/setupTest.js
  import { configure } from 'enzyme';
  import Adapter from 'enzyme-adapter-react-16';
  configure({ adapter: new Adapter() });
```
- Creamos la carpeta `src/mocks` para guardar los archivos de mocks (módulos que simulan funcionalidades que jest no puede entender, como los estilos css, las rutas de react-router o el estado de redux).
  - Creamos el archivo `src/mocks/styleMock.js` para exportar aquello que queremos hacer cuando se encuentre un css.
  ```js
    // src/mocks/styleMock.js
    module.exports = {};
  ```
- Añadimos al package.json la siguiente configuración:
```json
  "jest": {
    "setupFilesAfterEnv":[
      "<rootDir>/src/test/setupTest.js"
    ],
    "moduleNameMapper": {
      "\\.(styl|css)$": "<rootDir>/src/mocks/styleMock.js"
    }
  }
```
- Añadimos los scripts al package.json:
```json
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
```

### Testeando componentes

Para testear nuestros componentes de react haremos uso de unas funciones específicas para montar los componentes y buscar características en estos. Entre ellas están:

- **`mount`**: Sirve para montar un componente y buscar en estos distintas características.
```js
  test('Testeando con mount', () => {
    const component = mount(<Componente />)
    // Los metodos descritos a continuación son ficticios
    expect(component.method(selector).subMethod()).matcher(value)
  })
```
- **`shallow`**: Igual que mount pero este solo carga una cosa específica del componente y no todo el arbol.
```js
  test('Testeando con mount', () => {
    const component = shallow(<Component />)
    expect(component.method(selector).subMethod()).matcher(value)
  })
```

**Métodos para componentes**

TODO: HACER LISTA DE METODOS PARA COMPONENTES

**Uso de Mocks**
En ciertas ocaciones vamos a necesitar simular ciertas funcionalidades de la aplicación, entre estas pueden estar las rutas de react-router o el connect de un estado de redux.

Veamos un ejemplo de Mock en el que simulamos como incluir la store de redux y el history de react router en la aplicación:
```js
  import React from 'react';
  import { Router } from 'react-router-dom';
  import { Provider } from 'react-redux';
  import { createStore } from 'redux';
  import { createBrowserHistory } from 'history';

  import initialState from '../initialState';
  import reducer from '../reducers';

  const store = createStore(reducer, initialState);
  const history = createBrowserHistory();

  // Esto simula el montaje del componente tal y como se monta en la aplicación real
  const ProviderMock = props => (
    <Provider store={store}>
      <Router history={history}>
        {props.children}
      </Router>
    </Provider>
  );
```

Creado este Mock, podremos utilizarlo en nustros tests para testear distintas características de nuestros componentes:
```js
  describe('<Header />', () => {
    test('El componentes se renderiza', () => {
      const header = shallow(
        <ProviderMock>
          <Header />
        </ProviderMock>,
      );
      expect(header.length).toEqual(1);
    });
  });
```

**Simulando funciones (click, ...)**
