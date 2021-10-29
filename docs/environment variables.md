# Environment Variables

Local environment variables are used for
* Email settings for sending emails (like password reset emails) from the app
* Defining which database to connect to
* Running flask database migrations
* Running flask locally (though recommended to use a container to run flask normally)
* Deployment to Heroku for test site
* Disabling some security features


## Production
`ADMIN`
`AES_KEY`
`DATABASE_URL`
`FLASK_APP`
`LOGGING`
`MAIL_PASSWORD`
`MAIL_SENDER`
`MAIL_SERVER`
`MAIL_USERNAME`
`PEPPER`
`SECRET_KEY`

## Development - Server Terminal
`HEROKU_API_KEY`
`MAIL_SERVER`
`MAIL_USERNAME`
`MAIL_PASSWORD`
`MAIL_SENDER`
`LOCAL_PRODUCTION`
`FLASK_APP`

## Development - Test Terminal
`MAIL_RECEIVE_SERVER`
`MAIL_RECEIVE_USERNAME`
`MAIL_RECEIVE_PASSWORD`
`TIG_USERNAME`
`TIG_EMAIL`
`TIG_PASSWORD`

# Descriptions

## `MAIL_PASSWORD`, `MAIL_SERVER`, `MAIL_SENDER` and `MAIL_USERNAME`
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

## `MAIL_SEVER`, `MAIL_RECEIVE_SERVER`, `MAIL_RECEIVE_USERNAME`, `MAIL_RECEIVE_PASSWORD`

These are used for receiving emails. Receiving emails is required when doing end to end browser tests, and tokens need to be received by email to create accounts or reset passwords.

## `TIG_USERNAME`, `TIG_EMAIL`, `TIG_PASSWORD`

These are account usernames, emails and passwords used in some browser tests that focus on creating accounts, and changing accounts

## `DATABASE_URL`
The environment variable `DATABASE_URL` defines which database option to use.

* `unset DATABASE_URL` or DATABASE_URL not defined: local SQLite3 instance
* `export DATABASE_URL=postgresql://postgres@host.docker.internal/<local_db_name>` a local postgres database accessed from inside a container
* `export DATABASE_URL=postgresql://postgres@localhost/<local_db_name>` a local postgres database accessed from outside a container
* ```export DATABASE_URL=`heroku config --app=<heroku_app_name> | grep DATABASE_URL | sed 's/DATABASE_URL: *//' | sed 's/postgres:\/\//postgresql:\/\//'` ``` the database associated with the app `heroku_app_name`

The DATABASE_URL needs to be set:
* Running flask locally and wanting to use a local or remote postgres database
* When using flask locally to ugrade or migrate databases.
* To update databases with


## `LOGGING`
Set to `heroku` if app is running on heroku and needs to stream logs to stdout through gunicorn


## `ADMIN`
Email address for flask production error logs to be sent to


## `FLASK_APP`
If you want to run flask or flask database migrations locally and not in a container, then you need the flask environment variable:

```
export FLASK_APP=app/my_app.py
```

## `HEROKU_API_KEY`
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


## `AES_KEY`
Needed if writing to or reading from a database used by an app with a custom AES_KEY (like the heroku test or production database).


## `PEPPER`
Needed if writing to or reading from a production database used by an app with a custom PEPPER (like the heroku test or production database).


## `SECRET_KEY`
Needed if debugging a flask session from an app with a custom SECRET_KEY.


## `LOCAL_PRODUCTION`
If there is an environment variable called `LOCAL_PRODUCTION` and its value is `DISABLE_SECURITY`, then flask Talisman will not be run.

This is useful for running stage and production environments locally, where you cannot connect with a https connection.
