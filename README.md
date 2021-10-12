# ThisIGet

This I Get web app - www.thisiget.com.

# Development Environment Setup

## Setup
* Install Docker
* `git clone https://github.com/airladon/itiget/`
* Navigate to project directory (all following steps are done from the project directory unless otherwise said)

## Install local Python and Node packages
Local packages for python and node can be used by editors for lint and type hints, as well as allows flask database management.

In addition, python is required for some scripts in the `tools` folder.

### Install Python and Packages
#### Install PyEnv and Python 3.7.1 (if not already installed on local machine)
* Install pyenv
  * `brew install pyenv`
* Add pyenv to shell rc file
  * `echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.zshrc`
* Run shell rc file to take effect
  * `source ~/.zshrc`
* Install python version of interest
  * `pyenv install 3.7.1`
* Set python version as default if wanted (but not needed)
* `pyenv global 3.7.1 3.6.6 2.7.14 system`

>> If pyenv install doesn't work because of zlib failure, do this:
`xcode-select --install`

>> If it still doesn't work, then do this
`sudo installer -pkg /Library/Developer/CommandLineTools/Packages/macOS_SDK_headers_for_macOS_10.14.pkg -target /`

#### Setup and Start Python Virtual environment
```
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
```

### Install Node packages
```
npm install
```

### Editors
If using sublime as an editor, you would start it after starting the python virtual environment and installing the npm packages.

### Setup local environment variables

Local environment variables are used for
* Email settings for sending emails (like password reset emails) from the app
* Defining which database to connect to
* Running flask database migrations
* Running flask locally (though recommended to use a container to run flask normally)
* Deployment to Heroku for test site
* Disabling some security features

#### `DATABASE_URL`
The environment variable `DATABASE_URL` defines which database option to use.

* `unset DATABASE_URL` or DATABASE_URL not defined: local SQLite3 instance
* `export DATABASE_URL=postgresql://postgres@host.docker.internal/<local_db_name>` a local postgres database accessed from inside a container
* `export DATABASE_URL=postgresql://postgres@localhost/<local_db_name>` a local postgres database accessed from outside a container
* ```export DATABASE_URL=`heroku config --app=<heroku_app_name> | grep DATABASE_URL | sed 's/DATABASE_URL: *//'` ``` the database associated with the app `heroku_app_name`

The DATABASE_URL needs to be set:
* Running flask locally and wanting to use a local or remote postgres database
* When using flask locally to ugrade or migrate databases.


#### `MAIL_PASSWORD`, `MAIL_SERVER`, `MAIL_SENDER` and `MAIL_USERNAME`
The environment variables `MAIL_PASSWORD`, `MAIL_SERVER`, `MAIL_SENDER` and `MAIL_USERNAME` control where to send emails from (emails are used for example in resetting passwords, or creating accounts).

If they are not set, then the app will not try to send emails.

This is only needed for running locally and wanting emails to be sent.

For example, if you have access to a gmail account you would
```
export MAIL_SERVER=smtp.gmail.com
export MAIL_SENDER=enter_your_email_here
export MAIL_USERNAME=enter_your_email_here
export MAIL_PASSWORD=enter_your_password_here
```

#### `MAIL_SEVER`, `MAIL_RECEIVE_SERVER`, `MAIL_RECEIVE_USERNAME`, `MAIL_RECEIVE_PASSWORD`

These are used for receiving emails. Receiving emails is required when doing end to end browser tests, and tokens need to be received by email to create accounts or reset passwords.

#### `LOGGING`
Set to `heroku` if app is running on heroku and needs to stream logs to stdout through gunicorn

#### `ADMIN`
Email address for flask production error logs to be sent to

#### `FLASK_APP`
If you want to run flask or flask database migrations locally and not in a container, then you need the flask environment variable:

```
export FLASK_APP=app/my_app.py
```

#### `HEROKU_API_KEY`
If deploying the app to HEROKU, then the `HEROKU_API_KEY` environment variable needs to be set. The variable can be set by using:

```
export HEROKU_API_KEY=`heroku auth:token`
```

This is only needed if deploying a build from the local machine.

You can deploy to your own heroku site for testing purposes. Create a heroku account, install the heroku cli locally, create an app (APP_NAME) and in the dev container:
```
./build.sh deploy APP_NAME
./browser_test.sh https://APP_NAME.herokuapp.com
```

#### `AES_KEY`
Needed if writing to or reading from a database used by an app with a custom AES_KEY (like the heroku test or production database).

#### `PEPPER`
Needed if writing to or reading from a production database used by an app with a custom PEPPER (like the heroku test or production database).

#### `SECRET_KEY`
Needed if debugging a flask session from an app with a custom SECRET_KEY.

#### `LOCAL_PRODUCTION`
If there is an environment variable called `LOCAL_PRODUCTION` and its value is `DISABLE_SECURITY`, then flask Talisman will not be run.

This is useful for running stage and production environments locally, where you cannot connect with a https connection.

## Docker Containers
All lint and type checking, testing, building and deployment can be done using docker containers that can be used on any system that has docker installed. This makes development easy to start on any platform.

### Interactive Dev Environment container
A docker container can be used to do lint and type checking, unit tests, browser tests, javascript building and packaging, and deployment. To start the container

* `./startenv dev`

This will bring up a bash prompt.

From here you can perform:
* Type and linting checks:
  * `flow` for Javascript type checking
  * `npm run lint` for Javascript linting
  * `npm run css` for CSS/SCSS linting
  * `flake8` for python linting

* Dev server
  * `./dev-server.sh` to run a local web server where the site is rebuilt automatically whenever files change. Access it through `http://localhost:5002/`.
 
* Testing:
  * `jest` for Javascript unit tests
  * `pytest` for Python unit tests
  * `./browser_test.sh local` for localhost browser tests
  * `./browser_test.sh 5002` for localhost (port 5002) browser tests
  * `./browser_test.sh dev` for heroku dev site browser teststests
  * `./browser_test.sh test` for heroku test site browser tests
  * `./browser_test.sh beta` for heroku beta site browser tests
  * `./browser_test.sh prod` for production site browser tests
  * `./browser_test.sh <SITE>` for custom site browser tests at <SITE>
  * `./browser_test.sh local <TEST_REGEX>` for specific tests
  * `./browser_test.sh local <TEST_REGEX> -u` to update snapshots

* Build and Deploy:
  * `build.sh` Test and build dev version
  * `build.sh dev` Test and build dev version
  * `build.sh stage` Test and build stage version
  * `build.sh prod` Test and build prod version
  * `build.sh deploy` Deploy prod build to heroku dev site
  * `build.sh deploy dev` Deploy prod build to heroku dev site
  * `build.sh deploy APP_NAME` Deploy prod build to APP_NAME
  * `build.sh deploy APP_NAME skip-tests` deploy APP_NAME skipping tests
  * `build.sh deploy APP_NAME skip-tests skip-build` deploy APP_NAME skipping test and build steps

>> `build.sh` can also be used to deploy to heroku test, beta and prod sites,
>> but this should normally be done using the pipeline deployment (below)
>> * `build.sh deploy test` Deploy prod build to heroku test site
>> * `build.sh deploy beta` Deploy prod build to heroku beta site
>> * `build.sh deploy thisiget` Deploy prod build to thisiget

* Pipeline deploy
  * `deploy_pipline.sh`
    * Lint and type check
    * Unit tests
    * Production build and package (webpack) of javascript
    * Deploy to heroku test site (test site database)
    * Run test site browser tests
    * Deploy to beta test site (production database)
    * Run beta site browser tests
    * Deploy to production site
    * Run production site browser tests
    * Roll back production site if error occurs in final browser tests

* Run flask:
  * `flask run --host=0.0.0.0`
    * Can be accessed through a browser at `localhost:5002`
    * You would only do this for some debugging purposes, generally running the `dev-server` container (below) is sufficent.

Note, to do any deployments the HEROKU_API_KEY associated with the accounts to deploy to needs to be set as an environment variable.

To attach to the same container from different terminal instances use:
`docker exec -it devenv-dev bash`


### Dev-Server Container
`./startenv dev-server`

* Dev container (same as interactive dev container) with node, python and all development libraries installed.
* Files mounted as volumnes to local file system
* Local compiled version of React
* Javascript is not minified
* Runs Flask automatically at `localhost:5003`
  - Can see flask requests and responses

#### Setting up port forwarding:
If you want to access your local dev server from a device on your LAN, then you need to setup port forwarding on your local machine.

forward port external 4000 to local 5000
```
echo "
rdr pass inet proto tcp from any to any port 4000 -> 127.0.0.1 port 5003
" | sudo pfctl -ef -
```

To stop port forwarding:
```
sudo pfctl -F all -f /etc/pf.conf
```

To see all current rules:
```
sudo pfctl -s nat
```

### Stage Container
`./startenv stage`

* **Python base container (same as prod)**
* **Only python packages needed for production**
* Files mounted as volumes to local file system
* **Development version of React from CDN**
* **Javascript is minified and source maps are included**
* Runs Flask automatically at `localhost:5001`
   - Can see flask requests and responses

A convenient way to use the stage container is:
* In dev container, run webpack stage build with watch option:
  * ./start_env.sh dev
  * webpack --watch --env mode=stage --progress

* In another terminal window, run the stage container
  * export LOCAL_PRODUCTION=DISABLE_SECURITY
  * ./start_env.sh stage
  * Navigate to http://localhost:5001


### Production Container
`./startenv prod`

* Python base container (same as prod)
* Only python packages needed for production
* **All files copied into container - no mounted volumes**
* **Production (minified) version of React from CDN**
* **Javascript is minified and NO source maps are included**
* **nginx automatically at `localhost:5000`**
   - Cannot see flask requests and responses


## Database management

This is best done locally outside of a container. You will need to have:

* Started python virtual environment (`source env/bin/activate`)
* Installed all python packages (`pip install -r requirements.txt`)
* Setup the flask environment variable (`export FLASK_APP=app/my_app.py`)
* Installed Heroku CLI if you want to manage a heroku database
* Installed postgres.app locally if you want to manage a local postgres database

#### Add new lesson:

##### Local SQL
```
unset DATABASE_URL
python ./tools/check_db.py
```
If the output makes sense then
```
python ./tools/update_lessons_db.py
```

##### Heroku Postgress
```
tools/get_config_vars.sh thisiget-dev
```
Copy and paste the export DATABASE_URL line
```
python ./tools/check_db.py
```
If the output makes sense then
```
python ./tools/update_lessons_db.py
```

Repeat for
```
tools/get_config_vars.sh thisiget-test
tools/get_config_vars.sh thisiget-beta
```

#### Start from scratch all DBs update:

Note, if changes to the model are made, `tests/flask/app_test.db` will probably need to be updated by copying the local app.db.

##### Local SQL
```
export FLASK_APP=app/my_app.py
rm app/app/app.db
rm -rf migrations
unset DATABASE_URL
flask db init
flask db migrate
flask db upgrade
python ./tools/update_lessons_db.py
python ./tools/prepopulate.py
```

##### Local Postgress
```
psql -c 'drop database thisiget_local'
psql -c 'create database thisiget_local'
export DATABASE_URL=postgresql://postgres@localhost/thisiget_local
flask db upgrade
python ./tools/update_lessons_db.py
python ./tools/prepopulate.py
```

##### Dev
```
./getenv.sh dev
```
Copy paste exports
```
tools/reset_and_prepopulate_database.sh thisiget-dev
unset SECRET_KEY
unset AES_KEY
unset PEPPER
unset DATABASE_URL
unset MAIL_PASSWORD
unset MAIL_SENDER
unset MAIL_SERVER
unset MAIL_USERNAME
```

Run in existing running contaner:
```
docker exec -it devenv-dev bash
```

##### Test
```
./getenv.sh test
```
Copy paste exports
```
tools/reset_and_prepopulate_database.sh thisiget-test
unset SECRET_KEY
unset AES_KEY
unset PEPPER
unset DATABASE_URL
unset MAIL_PASSWORD
unset MAIL_SENDER
unset MAIL_SERVER
unset MAIL_USERNAME
```

##### Beta
```
./getenv.sh beta
```
Copy paste exports
```
tools/reset_and_prepopulate_database.sh thisiget-beta
unset SECRET_KEY
unset AES_KEY
unset PEPPER
unset DATABASE_URL
unset MAIL_PASSWORD
unset MAIL_SENDER
unset MAIL_SERVER
unset MAIL_USERNAME
```


#### Start from scratch - Local SQL
```
rm app/app/app.db
rm -rf migrations
unset DATABASE_URL
flask db init
flask db migrate
flask db upgrade
python ./tools/update_lessons_db.py
python ./tools/prepopulate.py
```

#### Start from scratch - Local Postgres
Assume database is called `thisiget_local`

```
psql -c 'drop database thisiget_local'
psql -c 'create database thisiget_local'
rm -rf migrations
export DATABASE_URL=postgresql://postgres@localhost/thisiget_local
flask db init
flask db migrate
flask db upgrade
python ./tools/update_lessons_db.py
python ./tools/prepopulate.py
```

#### Start from scratch - Heroku - 1
```
tools/get_config_vars.sh thisiget-test
```
paste in the environment variable exports
```
tools/reset_and_prepopulate_database.sh thisiget-test init_flask
unset SECRET_KEY
unset AES_KEY
unset PEPPER
unset DATABASE_URL
unset MAIL_PASSWORD
unset MAIL_SENDER
unset MAIL_SERVER
unset MAIL_USERNAME
```

Can check with
`heroku pg:psql --app=itgetitest -c 'select username,last_login from users'`


##### Terminal 1
``` bash
# start container
./start dev
# setup mail if want local server to send emails (e.g. account creation)
# pytest can be run without emails, but browser tests of account pages will
# need 
export MAIL_SERVER=
export MAIL_USERNAME=
export MAIL_PASSWORD=
export MAIL_SENDER=
# only required if communicating with external database
export DATABASE_URL=
# only required if communicating with an encrypted database
export AES_KEY=
export PEPPER=
./dev-server.sh
```

#### Local Browser test debug
Run site and browser tests local and within containers (so don't have to restart containers all the time)

##### Terminal 1

Setup terminal 1 to host the site, auto rebuilding on file changes
```
./start.sh dev
```

It needs to be able to send emails for account creation confirmaion and resetting passwords
```
export MAIL_SERVER=
export MAIL_USERNAME=
export MAIL_PASSWORD=
export MAIL_SENDER=
```

Setup the remote db if needed
```
export AES_KEY=
export PEPPER=
export DATABASE_URL=
```

Build and watch files
```
./dev-server.sh
```

##### Terminal 2
This terminal runs the browser tests. It needs to be able to receive emails from account creation and password reset events.
```
./start.sh dev 1
export MAIL_RECEIVE_SERVER=
export MAIL_RECEIVE_USERNAME=
export MAIL_RECEIVE_PASSWORD=
export MAIL_SERVER=
export TIG_USERNAME=
export TIG_EMAIL=
export TIG_PASSWORD=
```

To enter bash for the browser test container and run tests manually:
```
./browser_test.sh debug http://host.docker.internal:5002
jest "--runInBand" tests/browser/createAccount.btest.js
```

Otherwise, to run tests from the dev environment starting the container each time:
```
./browser_test.sh http://host.docker.internal:5002 tests/browser/createAccount
```

##### Terminal 3 (when required):
This terminal resets the test users (if testing crashed).
```
docker exec -it devenv-dev bash
```

Setup the remote db if needed
```
export AES_KEY=
export PEPPER=
export DATABASE_URL=
```

Reset test uers
```
python tools/reset_test_users.py
```

#### Upload local database to Heroku
Assume local database is called `thisiget_local` and you want to update heroku database `thisiget-dev`
```
heroku pg:reset --app=thisiget-dev
heroku pg:push postgresql://localhost/thisiget_local postgresql-lively-27815 --app=thisiget-test
```

Can check with
`heroku pg:psql --app=thisiget-test -c 'select * from users'`

> Note: If `AES_KEY` or `PEPPER` is different on the local environment compared to the Heroku environment, and data in the database was generated locally with the different environment variables, then app on Heroku won't be able to read the locally generated entries.

#### Migrate app changes to database
```
flask db migrate -m "migration message"
```

Set DATABASE_URL to the database you want to upgrade, then upgrade it. Repeat for all databases you want to upgrade
```
unset DATABASE_URL
flask db upgrade

export DATABASE_URL=DATABASE_URL=postgresql://localhost/thisiget_local
flask db upgrade

export DATABASE_URL=DATABASE_URL=`heroku config --app=thisiget-dev | grep DATABASE_URL | sed 's/DATABASE_URL: *//'`
flask db upgrade
```

#### Check the database

For Sqlite3, use a database viewing app like `DB Browser for SQLite` and load `app/app/app.db` file.

For postgres local:
* `psql`
* `\c <DATABASE_NAME>` to select database of interest
* `\dt` to show tables
* `SELECT * FROM users` to show all user records

For Heroku Postgres:
* `heroku pg:psql --app=itgeti`
* Won't need to select database, so can go straight to looking at tables

#### Push local database to Heroku
Push up data from local database to Heroku.

First get the heroku database name using:
`heroku addons --app=<HEROKU_APP_NAME>`

Local database would only exist if postgres.app is installed and server running.

Push local DB data up to Heroku.

`heroku pg:push postgresql://localhost/<LOCAL_DB_NAME> <HEROKU_DB_NAME> --app=<HEROKU_APP_NAME>`

e.g.
`heroku pg:push postgresql://localhost/thisiget_local postgresql-lively-27815 --app=itgetitest`


#### Pull Heroku DB data to local
`heroku pg:pull <HEROKU_DB_NAME> <LOCAL_DB_NAME> --app <HEROKU_APP_NAME>`
`heroku pg:pull postgresql-lively-27815 from_heroku --app itgetitest`


#### Local database manual manipulation
`psql postgres`

```
DROP DATABASE thisiget_local;
CREATE DATABASE thisiget_local;
\c thisiget_local
```

## Updating Python, Python Packages and NPM packages for the project

### Python, Node or NPM Versions
* Open pynode project and update base, Docker-heroku (used for dev) and pupp (used for browser testing in puppeteer)
* Build locally without deploying
* Update `start_env.sh` to reflect new docker image (in section "Starting Container", "Pupp" (approx line 138))
* Update `containers/Dockerfile_dev` to reflect new docker image
* Update `containers/dev/browser_test.sh` to reflect new docker image
* If python version was updated, then also update `containers/Dockerfile_stage` and `containers/Dockerfile_prod` with new python version.

### NPM Packages
Before updating NPM packages, make sure lint, type checking and unit tests all pass.

In dev container:
```
flow
npm run lint
npm run css
jest
./browser_tests.sh local
```

If just updating one package, then update the package version in `package.json`.

If want to update all packages, then in dev container:
```
npm update
cat package.json
```
Then copy and paste the package names and version numbers into `package.json` in local root directory.

Now retest all line, type checking and units tests:
In dev container:
```
flow
npm run lint
npm run css
jest
./browser_tests.sh local
```

With updates to lint and test packages, it is possible additional bugs will be found that will need to be dealt with.

If everything was fixable, then commit changes.

### Python Packages
In dev container:
```
pip list --outdated --format=freeze | grep -v '^\-e' | cut -d = -f 1  | xargs -n1 pip install -U
pip freeze
```
Then copy and paste the package names and versions into the local `requirements.txt`.


#### Update python version
Change python version number in
* containers/Dockerfile_dev
* containers/Dockerfile_stage
* containers/Dockerfile_prod
* Pipfile

Install new version of python with pyenv
`pyenv install 3.7.2`

Stop python virtual environment (if one is going)
`cntl+d`

Remove existing virtual environment
`rm -rf env`

Setup new virtual environment


# Deploy to new Heroku App
## Create an App
```
heroku create <NEW_APP_NAME>
```

## Setup Heroku Config variables
#### Using existing app config variables
```
./tools/get_config_vars.sh <EXISTING_APP_NAME>
```
Copy and paste all the lines that start with `export` to make the local environment variables.
```
./tools/set_config_vars.sh <NEW_APP_NAME>
```

#### Use new app config variables
Set mail config variables.
```
export MAIL_PASSWORD=
export MAIL_USERNAME=
export MAIL_SERVER=
export MAIL_SENDER=
```

Make new encryption keys if needed - do not update these if the new app is being tied to the same database as EXISTING_APP_NAME
```
export AES_KEY=`python tools/generate_aes_key.py`
export SECRET_KEY=`python tools/generate_secret_key.py` 
export PEPPER=`python tools/generate_pepper.py`
```

Upload the config variables
```
./tools/set_config_vars.sh <NEW_APP_NAME>
```

## Hook up a database
#### New database:
```
heroku addons:create heroku-postgresql:hobby-dev --app=<NEW_APP_NAME>
```
Then initialize the database (assuming flask migrations is already setup)
```
export DATABASE_URL=`heroku config --app=<NEW_APP_NAME> | grep DATABASE_URL | sed 's/DATABASE_URL: *//'`
flask db upgrade
tools/reset_and_prepopulate_database.sh
```

#### Existing database:
Attach to existing database:
heroku addons:
```
heroku addons:attach <EXISTING_APP>::DATABASE --app=<NEW_APP_NAME>
```


# Work flow

An example contribution work flow to lesson content (just javascript and scss/css) is:
* `git clone https://github.com/airladon/itiget/`
* Create branch
* Host local dev-server 
  `./start_env.sh dev-server`
* In another shell window start interactive dev container
  `./start_env.sh dev`
* Modify lesson content
* Observe result on dev-server `localhost:5003`
* Check javascript and css changes conform to linting, type checking and tests. In the dev container run:
  * `flow`
  * `npm run lint`
  * `npm run css`
  * `jest`
  * `./browser_tests.sh local <LESSON_REGEX>`
Run browser tests a second time to ensure the snap shots created in the last run are consistent.
  * `./browser_tests.sh local <LESSON_REGEX>`
  * `./ratings_test.sh local`
>>> If ratings_tests failed and you needed to update the database, then the dev, test and beta/prod databases will also need to be updated.

* If all looks good, build to dev site
  * `./build.sh deploy dev`
* Open site (thisiget-dev.herokuapp.com) and see it if looks ok.
* Back in the dev container, run ratings and browser tests
  * `./ratings_tests.sh dev`
  * `./browser_tests.sh local <LESSON_REGEX>`
* Test ratings test on test and beta sites as well:
  * `./ratings_tests.sh test`
  * `./ratings_tests.sh beta`
* If the dev site looks good, create a pull request into master.

The CI will then:
  * Check linting, type checking and unit tests
  * Build app to test site
  * Run all browser and ratings tests
  * Build app to beta site
  * Run subset of broswer tests, all ratings tests
  * Build app to prod site
  * Run subset of browser tests, all ratings tests
  * If all passes, a master merge will be allowed.


# Useful notes
### Removing columns in SQLite
SQLite doesn't allow dropping of columns with ALTER TABLE. Either recreate table, or copy table

e.g. removing salt from username table:
CREATE TABLE new_user(
 id INTEGER PRIMARY KEY,
 username TEXT,
 email TEXT,
 password_hash TEXT);

INSERT INTO new_user SELECT id, username, email, password_hash FROM user

DROP TABLE IF EXISTS user

ALTER TABLE new_user RENAME TO user

### Removing rows in database
DELETE from users where id>0;

### Change uid/name/path of lesson

A lesson uid comes from its path and is used in many places including QRs.

* Rename lesson folder to new UID
* Find all instances of old UID in source code and update to new UID
* Change title in details to new title if needed
* Find all instances of old title in code and change to new title if needed
* ./updatedb.sh lesson_uid_old=RelatedAngles lesson_uid_new=AnglesAtIntersections show write
