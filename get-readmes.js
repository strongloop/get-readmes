var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));
require('./lib.js');

// Defaults
var VERBOSE = false;
var REPOS = '.';
var OUTPATH = './readmes';

// Process command-line options
if (argv.repos ) {
  REPOS = argv.repos;
}
REPOS = REPOS + '/repos.json';

if (argv.out ) {
  OUTPATH = argv.out;
}

// Create output dir if it does not exist
if (!fileOrDirExists(OUTPATH, true)) {
  fs.mkdirSync(OUTPATH);
  console.log('Creating directory ', OUTPATH);
}

// Load repos.json at specified path, if it exists; if not, throw error and exit.
var repoList;
if (fileOrDirExists(REPOS)) {
  repoList = require(REPOS);
} else {
  console.log("ERROR: Cannot access ", REPOS);
  process.exit(1);
}

// Iterate through repos in JSON file and download the READMEs
var nRepos = repoList.repos.length;
for (i=0; i < nRepos ; i++ ) {
  // console.log("org = " + repoList.repos[i].org  + " repo = " + repoList.repos[i].repoName )
  //writeReadme(repoList.repos[i].org, repoList.repos[i].repoName , OUTPATH);
  processReadme(repoList.repos[i], OUTPATH)
}
