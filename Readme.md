### Config your git hooks
1. Change the default hooks directory
    ```shell script
    git config core.hooksPath .githooks
    ```
2. Then put your `pre-push` into .githooks

### Run circleci locally
1. Install `circleci CLI` on your computer
2. Process your .circleci/config.yml
    ```shell script
    circleci config process .circleci/config.yml > process.yml   
    ```
3. Execute specified job
    ```shell script
    circleci local execute -c process.yml --job <JOB NAME>
    ```

### Deploy to GCP
#### Deploy from you local machine
1. Install `gcloud CLI`
2. Init `gcloud CLI` for your project
3. Deploy your app
    ```shell script
    gcloud app deploy
    ```
#### Deploy from circleci
1. Orbs `gcp-cli: circleci/gcp-cli@1.8.3` is recommended:
    ```yaml
    jobs:
      deploy-to-gcp:
        executor: gcp-cli/default
        steps:
        - gcp-cli/install
        - gcp-cli/initialize
        - checkout
        - run:
            name: Deploy with gcloud CLI
            command: gcloud app deploy
    ```
2. Some environment is needed:
 - `GCLOUD_SERVICE_KEY` 
 - `GOOGLE_PROJECT_ID`
 - `GOOGLE_COMPUTE_ZONE`
 - `App Eigine Admin API` need to be active

### Deploy to Heroku
1. connect to this repo in circle ci
2. add env `HEROKU_API_KEY` and `HEROKU_APP_NAME` for this project
3. create project in heroku
4. run cmd `heroku config:set DISABLE_COLLECTSTATIC=1 -a dso-demo`
5. run pipeline in circle ci



