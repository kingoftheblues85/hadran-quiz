/**
 * This code iterates over the keys of the data object using Object.keys(), 
 * which returns an array of all the keys in the object. 
 * 
 * It then uses reduce() to group the tractate names by seder for each seder
 * object in the data object. 
 * 
 * Finally, it returns an object that maps each seder to an object that 
 * groups the tractate names by seder.
 * 
 * @param (object) seder_data - Data to be sorted
 * @returns (object) result - Dictionary of Sedar objects
 * 
 */

// import fs from 'fs'; // for writing the data to a json file
// // import seder_data from "./seder_data.json" // the data
// import seder_data from './seder_data.json' assert { type: "json" };

// const tractatesBySeder = Object.keys(seder_data).reduce((result, seder) => {
//   const tractates = seder_data[seder];
//   const tractatesBySeder = tractates.reduce((sederResult, tractate) => {
//     const sederId = tractate.fields.seder;
//     const tractateName = tractate.fields.name;
//     if (!sederResult[sederId]) {
//       sederResult[sederId] = [];
//     }
//     sederResult[sederId].push(tractateName);
//     return sederResult;
//   }, {});
//   result[seder] = tractatesBySeder;
//   return result;
// }, {});

// console.log(tractatesBySeder);

// fs.writeFile('output.json', JSON.stringify(tractatesBySeder), (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log('File has been created');
// });







import fs from 'fs'; // for writing the data to a json file
import seder_data from '../data/seder_data.json' assert { type: "json" };

const newData = [];

// Loop through each item in the original data
Object.keys(seder_data).forEach(item => {
  console.log(item)
  // item.tractates.map(t => console.log(t.name))
  // Object.keys(item).tractate.map(tractate => (console.log(tractate)))
  // Create a new object with the desired structure
  const newItem = {
    value: item.id,
    label: item.name,
    group: item.category
  };

  // Add the new object to the array
  newData.push(newItem);
});

// Convert the new data to JSON and write it to a file
fs.writeFileSync('newData.json', JSON.stringify(newData));

fs.writeFile('output1.json', JSON.stringify(newData), (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('File has been created');
});