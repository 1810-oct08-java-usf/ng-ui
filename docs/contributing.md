# Restricted Branches

If a repository is cloned using the default branches of dev, staging, or master, a feature branch should be created before any  
changes are pushed. Because theses branches are managed by administrators, any attempts to directly push to one of these branches 
will be ignored. The appropriate manner to submit code for review is as follows: 

1. Clone the repository selecting the desired branch -- `git clone <SSH or HTTPS>`
2. Create a feature branch for your changes and modifications -- `git checkout -b <feature_branch_name>`
3. Push your changes to your feature branch -- `git push -u origin <feature_branch_name>`
4. Submit a pull request to the appropriate branch.

# Guidelines for Pull Requests
* Please make pull request descriptions as concise yet descriptive as possible.
* Pull requests that result in merge conflicts and have ambiguous, unclear, or no description will most likely be rejected.

  
