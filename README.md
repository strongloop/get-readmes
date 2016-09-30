# get-readmes
This module is a simple Node script to pull down module READMEs from any public repository
using the GitHub API.  The primary use case is for use with Jekyll to include documentation from external but related repositories.

**NOTE**: This script accesses GitHub APIs without authorization.  Since it uses only
"read" operations, no authorization is required; however, for unauthenticated requests, GitHub API rate limit is 60 requests per hour. For more information, see [https://developer.github.com/v3/#rate-limiting](https://developer.github.com/v3/#rate-limiting).

## Install dependencies

```
$ cd get-readmes
$ npm install
```

This module uses the Node GitHub API; see [http://mikedeboer.github.io/node-github](http://mikedeboer.github.io/node-github).

## Use

1. Create a JSON file containing list of repos for which you want to pull down READMEs.  A sample `repos.json` is provided.

1. Run the script:
```
$ node get-readmes [--out=<path-to-output-dir>] [--repos=<path-to-JSON-file>]
```

Options:

| Option&nbsp;&nbsp;&nbsp;&nbsp; | Description | Default value |
|-----------|---------|----------|
| `--repos`| Relative or absolute path to the JSON file containing list of repos.  Specify relative directory path _only_, not the file name, which is always `repos.json`.  | `./repos.json` |
|`--out` | Relative or absolute path to directory in which to save README files.  Tool will create the directory if it does not exist. Files are named `<repo-name>.md`. | `./readmes/` |

### Format of the repos.json file

The `repos.json` contains a `repos` array with entries for all the modules whose READMEs will be fetched and saved.  Each entry in the array has the following properties:
- `org` - Organization name.  Required.
- `repoName` - Repository name.  Required.
- `branch` (optional): Branch from which to fetch the README. If not specified, will fetch the README in the latest release, or if there is no tagged latest release, will get the README from the master branch.

For example:
```
{
  "repos" : [
  { "org": "strongloop", "repoName":  "loopback-example-database", "branch" : "mysql"},
  { "org": "strongloop", "repoName":  "loopback-example-database", "branch" : "oracle"},
  { "org": "strongloop", "repoName":  "loopback-getting-started"}
 ]
}
```

## TODO

Add a way to use OAuth2 tokens to avoid the rate limit.  See https://developer.github.com/v3/oauth/

## License

[MIT](LICENSE)
