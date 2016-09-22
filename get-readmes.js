#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
require('./lib.js');

var defaults = {
  repos : '.',
  out : 'readmes'
};
var argv = require('minimist')(process.argv.slice(2), {default : defaults});

//make paths relative to CWD unless they're absolute paths
var REPOS = path.resolve(process.cwd(), argv.repos, 'repos.json');
var OUTPATH = path.resolve(process.cwd(), argv.out);

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
