import fs from 'fs'

// Function to read data from a file
export function readDataFromFile(filePath, callback) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
}

// Function to write data to a file
export function writeDataToFile(filePath, data, callback) {
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
}

