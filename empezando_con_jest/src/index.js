const cities = ['Madrid', 'Paris', 'Berlin', 'Lisboa']

const randomString = () => {
  const index = Math.floor(Math.random() * cities.length)
  return cities[index]
}

module.exports = {
  randomString
}