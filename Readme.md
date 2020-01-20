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
*Multiple services deploy*
For example, I want to deploy web and service in this project.
For backend:
```shell script
gcloud app deploy dso-service/app.yaml --promote
```
For frontend:

```shell script
gcloud app deploy dso-web/app.yaml --promote
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
#### Deploy using source files
1. add env `HEROKU_API_KEY` and `HEROKU_APP_NAME` in circleci
    ```yaml
    orbs:
      heroku: circleci/heroku@0.0.10
    ...
    jobs:
        ...
    deploy:
        docker:
        - image: buildpack-deps:trusty
        steps:
        - checkout
        - heroku/deploy-via-git
    ```

#### Deploy using docker image
```yaml
orbs:
  heroku: circleci/heroku@0.0.10
  docker: circleci/docker@0.5.20

jobs:
     build-image:
        executor: docker/docker
        steps:
        - checkout
        - setup_remote_docker
        - run:
            name: build docker image
            command: docker build -t registry.heroku.com/dso-container-demo/web .
        - run:
            name: save docker image
            command: docker save -o dso-image.tar registry.heroku.com/dso-container-demo/web:latest
        - persist_to_workspace:
            root: .
            paths:
            - ./dso-image.tar
    ...
    ...
    deploy-DEV:
        executor: docker/docker
        steps:
        - attach_workspace:
            at: /tmp/workspace
        - setup_remote_docker
        - heroku/install
        - run:
            name: load local image
            command: docker load -i /tmp/workspace/dso-image.tar
        - run:
            name: login heroku container
            command: heroku container:login
        - run:
            name: docker push image
            command: docker push registry.heroku.com/dso-container-demo/web
        - run:
            name: deploy with image
            command: heroku container:release -a dso-container-demo web
```

