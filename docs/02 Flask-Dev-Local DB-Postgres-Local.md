# Setup
Flask: Local development server
DB: Local Postgres

Two terminals (Server, Test) will be used.

# Clean Up
Unset all environment variables on Server and Test Terminals:
``` bash
unset ADMIN
unset AES_KEY
unset DATABASE_URL
unset LOGGING
unset MAIL_PASSWORD
unset MAIL_SENDER
unset MAIL_SERVER
unset MAIL_USERNAME
unset PEPPER
unset SECRET_KEY
unset MAIL_RECEIVE_SERVER
unset MAIL_RECEIVE_USERNAME
unset MAIL_RECEIVE_PASSWORD
unset TIG_USERNAME
unset TIG_EMAIL
unset TIG_PASSWORD
```



# Server Terminal
## Start Server terminal dev environment, and create local postgres DB
``` bash
psql -c 'drop database thisiget_local'
psql -c 'create database thisiget_local'
./start_env.sh dev
export MAIL_SERVER=
export MAIL_USERNAME=
export MAIL_PASSWORD=
export MAIL_SENDER=
export TIG_USERNAME=
export TIG_EMAIL=
export TIG_PASSWORD=
export FLASK_APP=app/my_app.py
export DATABASE_URL=postgresql://postgres@host.docker.internal:5432/thisiget_local
flask db upgrade
tools/reset_and_prepopulate_database.sh thisiget_local
python tools/get_users.py
```

# Build the website if not already built (Server Dev Environment):
./build.sh prod

# Reset the test users in the DB (Server Dev Environment)
python tools/reset_test_users.py

# Run Flask (Server Dev Environment)
flask run --host 0.0.0.0




# Test Terminal

## Start Test terminal dev environment
``` bash
./start_env.sh dev tester
export MAIL_RECEIVE_SERVER
export MAIL_RECEIVE_USERNAME
export MAIL_RECEIVE_PASSWORD
export MAIL_SERVER
export TIG_USERNAME
export TIG_EMAIL
export TIG_PASSWORD
```

## Goto browser and sign in/out with test_user_002 (Browser)
http://localhost:5002/

## Run simple browser test (Test Dev Environment)
./browser.sh 5002 createAccount

## Run all browser tests (Test Dev Environment)
browser.sh 5002




# Debugging
## Reset and prepopulate DB (Server Dev Environment):
./tools/reset_and_prepopulate_database.sh

## Reset test users only (Server Dev Environment)
python tools/reset_test_users.py

## Get users to check DB (Server Dev Environment)
python tools/get_users.py

## Replacement and Diff Files
./tools/replacement_files.sh rm/ls/replace
./tools/diff_files.sh rm/ls/cp
