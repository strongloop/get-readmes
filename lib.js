var GitHubApi = require("github");
var fs = require('fs');
var github = new GitHubApi({
  debug: false,
  headers: { "Accept-Charset": "ISO-8859-1,utf-8"}
});

/*
  Write out content of README.md file for latest release of org/module to path.
*/
processReadme = function(targetRepo, path) {
  var options = {};
  var fileName = path + "/" + targetRepo.repoName + ".md";
  options.user = targetRepo.org;
  options.repo = targetRepo.repoName;

  if (targetRepo.branch) {     // get readme for branch, if specified
    options.ref = targetRepo.branch;
    path = path + "/" + targetRepo.repoName + "-" + targetRepo.branch + ".md";
    writeOutReadme(options, path);

  } else {
    github.repos.getLatestRelease({ user: targetRepo.org, repo: targetRepo.repoName }, function(err, res) {
      if(err) { // Use master release
        //console.log("For " + targetRepo.org + "/" + targetRepo.repoName + " -- No latest release ");

      } else { // Use latest tagged release if it exists
        //console.log("For " + targetRepo.org + "/" + targetRepo.repoName  + " latest release is " + res.tag_name );
        options.ref = res.tag_name;

      }
      writeOutReadme(options, fileName);
    });
  }
} //processReadme

/**
*  Saves the README file to the specified directory path.
*  @param {Object} options options passed to [getReadme](http://mikedeboer.github.io/node-github/#api-repos-getReadme):
*  options.user, options.repo, and options.ref are used.
*  @param {String} readmeFile Full directory path and file name where the README will be written.
*/
writeOutReadme = function(options, readmeFile) {
  github.repos.getReadme(options, function(err, res) {
    if (err) {
      console.log("ERROR! Cannot get README.")
      console.log(err);

    } else {
      console.log("Writing " + readmeFile );
      //var file = path + "/" + options.repo + ".md"
      var s = new Buffer(res.content, 'base64').toString();
      //var fs = require('fs');
      fs.writeFile(readmeFile, s, function(err) {
          if(err) {
            return console.log(err);
          }
      });
    }
  })
}

/**
*  Check whether a file or directory exists.
* @param {String} path Path to the file or directory.
* @param {Boolean} isDir True if testing existence of a directory.
* False or don't supply otherwise.
*/
fileOrDirExists = function(path, isDir) {
  try {
    if (isDir) {
      return fs.statSync(path).isDirectory();
    } else {
      return fs.statSync(path).isFile();
    }
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.log(path + ": Does not exist...");
      return false;
    } else {
      throw e;
    }
  }
}
