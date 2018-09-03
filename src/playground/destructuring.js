// Obect destructureng

/* const person = {
  name: 'Diego',
  age: 26,
  location: {
    city: 'Philadelphia',
    temp: 92
  }
}

const { name: firstName = 'Anonimous', age, } = person;
const { temp: temperature, city } = person.location 

if (city && temperature) {
  console.log(`It's  ${temperature} in ${city}`);
}
console.log(`${firstName} is ${age}`)

 */
const book = {
  title: 'Ego is the Enemy',
  author: 'Ryan Holiday',
  publisher: {
    name: 'Penguin'
  }
}

const { name: publisherName = 'Self-Published' } = book.publisher;

console.log(publisherName); // Penguin, default Self-Published

//
// Array destructuring
//

const address = ['1299 S Juniper Street', 'Philadelphia', 'Pensilvania', '19147'];

const [, city = 'Bogota', ,zip] = address

console.log(`Your are in ${address[1]} ${address[2]}`);

console.log(`Your are in ${city} ${zip}`);

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];

const [drink,, mediumSizePrice] = item

console.log(`A medium ${drink} consts ${mediumSizePrice}.`)

console.log(``)















