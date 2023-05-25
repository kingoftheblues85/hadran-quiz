/**
 * THIS SCRIPT WILL CLEAM UP THE SCRAPED SIMANIM DATA
 * 
 */

import fs from 'fs';

const TRACTATE = "succah"
const IN_FILE = `C:\\Users\\office\\dev\\zichru\\${TRACTATE}_data.json`
const OUT_FILE = `C:\\Users\\office\\dev\\zichru\\${TRACTATE}_data_parsed.json`

fs.readFile(IN_FILE, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const parsedData = JSON.parse(data);

  // Do something with the parsed data

  // Loop through each object in the array
  for (let obj of parsedData) {
    // Loop through each data object in the current object's `data` array
    for (let obj of parsedData) {
      // Loop through each data object in the current object's `data` array
      for (let i = 0; i < obj.data.length; i++) {
        // Check if the current data object's `title` property contains the word "Siman"
        if (obj.data[i].title.includes("Siman")) {
          // If it does, create a new `Siman` property in the current object

          // Remove the text "Siman - " before appending the title
          const title = obj.data[i].title;
          const newTitle = title.replace(/^Siman - /, "");

          obj.siman = {
            title: newTitle,
            paragraph: obj.data[i].paragraph
          };
          // Remove the object with the title containing "Siman" from the `data` array
          obj.data.splice(i, 1);
          // Exit the loop since we only need to create the `Siman` property once
          break;
        }
      }
    }
  }


  console.log(parsedData);
  
  // Write the updated data back to the file
  fs.writeFile(OUT_FILE, JSON.stringify(parsedData, null, 2), err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Data written to file");
  });

});
