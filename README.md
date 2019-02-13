# ItIGet

ItIGet web app.

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

#### `FLASK_APP`
If you want to run flask or flask database migrations locally and not in a container, then you need the flask environment variable:

```
export FLASK_APP=app/my_app.py
```

#### `HEROKU_API_KEY`
If deploying the app to HEROKU, then the `HEROKU_API_KEY` environment variable needs to be set. The variable can be set by using:

```export HEROKU_API_KEY=`heroku auth:token` ```

This is only needed if deploying a build from the local machine.

You can deploy to your own heroku site for testing purposes. Create a heroku account, install the heroku cli locally, create an app (APP_NAME) and in the dev container:
```
./build.sh deploy APP_NAME
./browser_test.sh https://APP_NAME.herokuapp.com
```

#### `AES_KEY`
Only needed if writing to or reading from a database used by an app with a custom AES_KEY (like the heroku test or production database).

#### `PEPPER`
Only needed if writing to or reading from a production database used by an app with a custom PEPPER (like the heroku test or production database).

#### `SECRET_KEY`
Only needed if debugging a flask session from an app with a custom SECRET_KEY.

## Docker Containers
All lint and type checking, testing, building and deployment can be done using docker containers that can be used on any system that has docker installed. This makes development easy to start on any platform.

### Interactive Dev Environment container
A docker container can be used to do lint and type checking, and tests, building, and deployments. To start the container

* `./startenv dev`

This will bring up a bash prompt.

From here you can perform:
* Type and linting checks:
  * `flow` for Javascript type checking
  * `npm run lint` for Javascript linting
  * `npm run css` for CSS/SCSS linting
  * `flake8` for python linting

* Testing:
  * `jest` for Javascript unit tests
  * `pytest` for Python unit tests
  * `./browser_test.sh local` for localhost browser tests
  * `./browser_test.sh dev` for heroku dev site browser teststests
  * `./browser_test.sh test` for heroku test site browser tests
  * `./browser_test.sh beta` for heroku beta site browser tests
  * `./browser_test.sh prod` for production site browser tests
  * `./browser_test.sh <SITE>` for custom site browser tests at <SITE>

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

#### Start from scratch - Local SQL
```
rm app/app.db
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

#### Start from scratch - Heroku
Assumes have already reset local postgress (removed migrations, initialized db and initialized migration).
```
heroku pg:reset --app=thisiget-dev
tools/get_config_vars.sh thisiget-dev
```
paste in the environment variable exports
```
tools/reset_and_prepopulate_database.sh
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
`heroku pg:psql --app=itgetitest -c 'select * from users'`


#### Upload local database to Heroku
Assume database is called `thisiget_local`
```
heroku pg:reset --app=thisiget-dev
heroku pg:push postgresql://localhost/thisiget_local postgresql-lively-27815 --app=itgetitest
```

Can check with
`heroku pg:psql --app=itgetitest -c 'select * from users'`

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
### Javascript
* Create branch
* Update the version numbers in the package.json file
* `rm -rf node_modules`
* `npm install`
* Run dev container and confirm all lint and type checks, and tests pass
* Do a test build to local
* If all passes, commit and pull request

##### Python Packages
This is only if python packages need to be updated. This will update both production and dev packages.

To see which packages are out of date:
`pipenv update --outdated`

Update version numbers in Pipfile

`pipenv install -d`

If Pipfile.lock is out of date, then use this to bring it up to date.
`pipenv lock`


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


# Work flow - To be changed

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
* If all looks good, try a test build
  * `./build.sh prod deploy test`
* If the test site looks good, create a pull request.

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

