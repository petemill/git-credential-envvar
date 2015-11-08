"use strict";
module.exports = function() {

  //we only support the 'get' command, not 'set' or 'erase'
  //  for more explanation of these arguments, see: http://git-scm.com/book/en/v2/Git-Tools-Credential-Storage
  let inCommand = process.argv[process.argv.length-1];
  if (inCommand.toLowerCase() !== 'get') {
    process.exit();
  }

  process.stdin.pipe(require('split')()).on('data', processLine);
  let hardcodedUsername = process.env.GITCREDENTIALUSERNAME;
  let hardcodedPassword = process.env.GITCREDENTIALPASSWORD;
  if (!hardcodedUsername || !hardcodedPassword) {
    console.error('Could not find required environment variable GITCREDENTIALUSERNAME and/or GITCREDENTIALPASSWORD');
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
