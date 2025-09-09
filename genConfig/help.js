function printHelp () {
  console.log(
"                       ____                           _\n",
"    ___ _ ____   __  / ___| ___ _ __   ___ _ __ __ _| |_ ___  _ __\n",
"   / _ \\ '_ \\ \\ / / | |  _ / _ \\ '_ \\ / _ \\ '__/ _` | __/ _ \\| '__|\n",
"  |  __/ | | \\ V /  | |_| |  __/ | | |  __/ | | (_| | || (_) | |\n",
" (_)___|_| |_|\\_/    \\____|\\___|_| |_|\\___|_|  \\__,_|\\__\\___/|_|\n",
    );
  console.log("Use: \n \
  node genenv.js\n \
  | default values:\n \
  |   port: random in range 1024 - 65535\n \
  |   mysql-pass: veryStrongPassword\n \
  node genenv.js port=3000\n \
  node genenv.js mysql-pass=3000\n \
  node genenv.js port=3000 mysql-pass=strongestPass");
}

module.exports = printHelp;
