const name = 'Miko';
const age = 23;
const hasHobbies = true;

function summarizeUser(name, age, hasHobbies) {
  return `${name} is ${age} years old, and they ${hasHobbies ? 'do' : 'don\'t'} have hobbies.`
}

console.log(summarizeUser(name, age, hasHobbies));