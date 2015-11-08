"use strict";
module.exports = function() {

  //we only support the 'get' command, not 'set' or 'erase'
  //  for more explanation of these arguments, see: http://git-scm.com/book/en/v2/Git-Tools-Credential-Storage
  let inCommand = process.argv[process.argv.length-1];
  if (inCommand.toLowerCase() !== 'get') {
    process.exit();
  }
  //get incoming stream, we need to receive the pipe from stdin rather than use readline since git streams it to us in a way that only this mechanism is compatible
  process.stdin.pipe(require('split')()).on('data', processLine);
  //process the environment variables we require to provide the credentials as output
  let hardcodedUsername = process.env.GITCREDENTIALUSERNAME;
  let hardcodedPassword = process.env.GITCREDENTIALPASSWORD;
  //validate and exit if we do not have what is required
  if (!hardcodedUsername || !hardcodedPassword) {
    //let the user know. this message is bubbled up to the git command so the user will see it.
    console.error('Could not find required environment variable GITCREDENTIALUSERNAME and/or GITCREDENTIALPASSWORD');
    process.exit(1);
  }
  //processes each incoming line of input
  function processLine (line) {

    //when line has content, it will be of the form key=value
    //when line has no content, we are to print the output
    if (!line) {
      console.log(`username=${hardcodedUsername}`);
      console.log(`password=${hardcodedPassword}`);
      process.exit();
    }
  }
};
