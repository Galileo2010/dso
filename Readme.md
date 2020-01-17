### Deploy to Heroku
1. connect to this repo in circle ci
2. add env `HEROKU_API_KEY` and `HEROKU_APP_NAME` for this project
3. create project in heroku
4. run cmd `heroku config:set DISABLE_COLLECTSTATIC=1 -a dso-demo`
5. run pipeline in circle ci

### Config your git hooks
```shell script
git config git config core.hooksPath .githooks
```

### Deploy to GCP
```shell script
gcloud app deploy
```

### circleci local
```shell script
circleci config process .circleci/config.yml > process.yml
circleci local execute -c process.yml --job gcp-cli/install_and_initialize_cli
```
