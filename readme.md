### Allure Report:
 ### 'For Generate'
 `command for run test case` : npx cypress run --spec "cypress/e2e/profile.cy.js" --env allure=true
`Command for generate`: npx allure generate allure-results --clean -o allure-report
`for open Report`:      npx allure open allure-report
`For convert in Zip`:   Compress-Archive -Path allure-report -DestinationPath allure-report.zip\

*** once you genrate the report and after you are running next test file you need to clear old allure report then only you can generate new report else you will get old report.**

`For clear Report`: Remove-Item -Recurse -Force .\allure-reports\
`For clear Result`: Remove-Item -Recurse -Force .\allure-results\

Use this version — it checks each folder before trying to delete it:

powershell
Copy
Edit
if (Test-Path ".\allure-results\") { Remove-Item -Recurse -Force .\allure-results\ }
if (Test-Path ".\allure-report\")  { Remove-Item -Recurse -Force .\allure-report\ }
✅ Or use one-liner with error suppression:
powershell
Copy
Edit
Remove-Item -Recurse -Force .\allure-results\ -ErrorAction SilentlyContinue; Remove-Item -Recurse -Force .\allure-report\ -ErrorAction SilentlyContinue

### 'For View Zip Reprot'
#1. To view the report on any system (one-time setup)

npm install -g allure-commandline --save-dev

# or (for Windows with Chocolatey)

choco install allure

# 2. To open the shared/extracted report

cd path/to/allure-report
# or
npx allure open .


#1. git process:- 
git staus
git add cypress
git add utils/helpers.js(utils/helper that this this file newly added so whenever add a new file we can add like this git add and file name)
git commit -m "profile script completed"
git push origin 
git add .gitignore

# -------------------------------
# 🔍 Status & Information
# -------------------------------
git status                # Check current changes and branch
git branch                # List all local branches
git log                   # Show commit history
git log --oneline         # Compact commit log
git diff                  # Show unstaged changes
git diff --cached         # Show staged changes

# -------------------------------
# 🔄 Working with Branches
# -------------------------------
git checkout -b feature-name       # Create & switch to new branch
git checkout main                  # Switch to main branch
git branch -d feature-name         # Delete local branch
git push origin --delete feature-name   # Delete remote branch

# -------------------------------
# 💾 Saving Changes
# -------------------------------
git add .                          # Stage all changes
git add filename.js                # Stage specific file
git commit -m "Message"            # Commit staged changes
git push                           # Push to current branch
git push origin branch-name        # Push to specific remote branch

# -------------------------------
# 🔁 Syncing with Remote
# -------------------------------
git pull origin main               # Pull latest changes
git fetch                          # Download changes (no merge)
git fetch origin                   # Fetch from specific remote
git rebase origin/main             # Rebase current branch onto latest main

# -------------------------------
# 🔀 Merge & Conflict Handling
# -------------------------------
git merge branch-name              # Merge into current branch
git merge --abort                  # Cancel a merge in progress
git add .                          # Stage after resolving conflicts
git commit -m "Resolve conflict"   # Commit resolved merge

# -------------------------------
# 📦 Stashing Work
# -------------------------------
git stash                          # Save changes temporarily
git stash list                     # View stashed changes
git stash pop                      # Apply and remove last stash
git stash clear                    # Clear all stashed items

# -------------------------------
# 🧹 Undoing Mistakes
# -------------------------------
git checkout -- file.js            # Discard changes in file
git reset HEAD file.js             # Unstage a file
git reset --hard HEAD              # Reset all changes (⚠️ permanent)
git clean -fd                      # Remove untracked files & folders

# -------------------------------
# 🌐 Remote Management
# -------------------------------
git remote -v                      # Show remotes
git remote add origin <url>        # Add new remote
git remote set-url origin <url>    # Change remote URL

# -------------------------------
# 📥 Merge Feature Branch into Main (Standard Flow)
# -------------------------------
git add .
git commit -m "WIP or stash if needed"
git stash                          # if not committing
git checkout main
git pull origin main
git merge profile-page-completion
git add .                          # if conflict resolved
git commit -m "Resolved conflicts"
git push origin main
git stash pop                      # if stash used
git branch -d profile-page-completion
git push origin --delete profile-page-completion

