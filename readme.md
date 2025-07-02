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