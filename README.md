# git-credentials-envvar
Enables git to use credentials provided by environment variables. Useful for single-use environments, e.g. containerised utilities.

# Installation

#### Requirements

 - Node.js (it is written in javascript)
 - NPM (for quick installation, otherwise clone the repo, mark ```cli.js``` as executable and symlink to somewhere in your ```$PATH```)

#### Install the binary:
```$> npm install -g git-credential-envvar```

#### Set GIT to use the credential helper:
```$> git config --global credential.helper envvar```

# Usage:
The ```git-credentials-envar``` credential helper will tell GIT to use the username and password specified in the environment variables ```GITCREDENTIALUSERNAME``` and ```GITCREDENTIALPASSWORD```.

Therefore these variables can be specfied across a whole system, or for a specific git command. See the following examples:

### System wide credentials
Git will use the same credentials for every host on every git command
```
$> export GITCREDENTIALUSERNAME=myuser
$> export GITCREDENTIALPASSWORD=mypass
$> git clone http://mygithost.com/repo.git
```

### Command-specific credentials

```$> GITCREDENTIALUSERNAME=myuser GITCREDENTIALPASSWORD=mypass git clone http://mygithost.com/repo.git```

If the credential-helper does not find these environment variables, it will print a warning message, and prompt the user for a username and password:
```
Could not find requried environment variable GITCREDENTIALUSERNAME and/or GITCREDENTIALPASSWORD
Username for 'https://mygithost.com': 
```

# Testing
Once the credential-helper is installed, following the Installation instructions above, you can test the results by using the ```git credential fill``` command:
```
$> git credential fill
protocol=https
host=mygithost.com

```
Press enter to leave a blank line, the credential-helper should then output:
```
$> git credential fill
protocol=https
host=mygithost.com

protocol=https
host=mygithost.com
username=myuser
password=mypass
```
