# Redmine Githubot
Finds redmine ticket numbers in github pull requests and brings state information into redmine


### Configuration
Replace

\*\*token** - create a new github token to use with this script

\*\*username** - github's repository owner username

\*\*repository** - repository name

\*\*active_url_single** - which page url to activate the single ticket mode (ex: ".com/issues/")

\*\*active_url_multi** - which page url to activate the single ticket mode (ex: ".com/projects/")


### Usage
This is a simple javascript code that can be run on developer console. When executed it will search, in the specified repository, all ticket numbers in a pull request's branch. Once it finds it, it beings pull request state information (open/closed) into redmine.

Alternatively, a browser extension can be used to inject the script into every page within a specified domain.
For chrome you can use [Custom JavaScript for websites](https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija) .

Just paste the script for a redmine domain and it will execute on every page load


####todo
- use gray instead of red to indicate closed request that have not been merged
