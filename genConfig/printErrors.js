function printBunchErrors() {
  const errors = [];
  return {
    addError(error) {
      errors.push(error);
    },
    printErrors() {
      errors.forEach(error => {
        console.log(error);
      });
      console.log('\nCheck \'node genenv.js help\' for information.\n')
    }
  }
}

module.exports = printBunchErrors();

