const printHelp = require('./help.js');

function argvParse(printError) {
  const paramsNames = ['port', 'mysql-pass'];
  const args = process.argv.slice(2);

  if(args.includes('help')) {
    printHelp();
    return;
  }

  function param(name, defaultValue, validate) {
    let value = defaultValue;
    return {
      set(val){
        try {
          value = validate(val);
        }
        catch(err) {
          printError(err);
        }
      },
      get() {
        return {
          [name]: value
        }
      }
    }
  }

  const [portMin, portMax] = [1024, 65535];
  const randomPort = portMin + Math.floor(Math.random() * (portMax - portMin));
  const sqlPass = 'veryStrongPassword';

  const params = {
    port: param('port', randomPort, function validate (value) {
      if (isNaN(value)) {
        throw new Error('Port value must be a number');
      }
      else if (value < portMin) {
        throw new Error('Port value is too low. Minimum: ' + portMin);
      }
      else if(value > portMax) {
        throw new Error('Port value is too high. Maximum: ' + portMax);
      }

      return value;
    }),
    'mysql-pass': param('sqlPass', sqlPass, function validate (value) {
        return value;
      })
  };

  for (let arg of args) {
    let error = false;
    if(!arg.includes('=')){
      printError(`Syntax error: \'${arg}\' must be \'${arg}={value}\'`);
      error=true;
    }
    if(!paramsNames.includes(arg.split('=')[0])) {
      printError('Parameter is not known: \'' + arg.split('=')[0] + '\'');
      error=true;
    }

    const [name, value] = arg.split('=');
    if(!error) {
      params[name].set(value);
    }
  }


  return paramsNames.reduce((o, paramName) => ({...o, ...params[paramName].get()}), {});
}

module.exports = argvParse;
