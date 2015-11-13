# Redmine Githubot
Finds redmine ticket numbers in github pull requests and brings state information into redmine

This is a simple javascript code that can be run on developer console. When executed it will search, in the specified repository, all ticket numbers in a pull request's branch. Once it finds it, it beings pull request state information (open/closed) into redmine.

Alternatively, a browser extension can be used to inject the script into every page within a specified domain.
For chrome you can use [Custom JavaScript for websites](https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija) .

Just paste the script for a redmine domain and it will execute on every page load
