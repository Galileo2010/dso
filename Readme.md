### How to set up you app
1. connect to this repo in circle ci
2. add env `HEROKU_API_KEY` and `HEROKU_APP_NAME` for this project
3. create project in heroku
4. run cmd `heroku config:set DISABLE_COLLECTSTATIC=1 -a dso-demo`
5. run pipeline in circle ci
