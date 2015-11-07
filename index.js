"use strict";
module.exports = function() {

  process.stdin.pipe(require('split')()).on('data', processLine)
  let hardcodedUsername = process.env.GITCREDENTIALUSERNAME;
  let hardcodedPassword = process.env.GITCREDENTIALPASSWORD;
  if (!hardcodedUsername || !hardcodedPassword) {
    console.error('Could not find requried environment variable GITCREDENTIALUSERNAME and/or GITCREDENTIALPASSWORD');
    process.exit(1);
  }

  let inHost, inProtocol, inPath;

  function processLine (line) {

    //when line has content, it will be of the form key=value
    if (line) {
      let lineComponents = line.split('=');
      let key = lineComponents[0];
      let value = lineComponents[1];
      switch (key) {
        case 'host':
          inHost = value;
          break;
        case 'protocol':
          inProtocol = value;
          break;
        case 'path':
          inPath = value;
          break;
        default:
          console.error(`key: '${key}' not supported`);
          process.exit(1);
      }
    }
    //when line has no content, we are to print the output
    else {
      if (inProtocol)
        console.log(`protocol=${inProtocol}`);
      if (inHost)
        console.log(`host=${inHost}`);
      if (inPath)
        console.log(`path=${inPath}`);
      console.log(`username=${hardcodedUsername}`);
      console.log(`password=${hardcodedPassword}`);
      process.exit();
    }
  }
};
