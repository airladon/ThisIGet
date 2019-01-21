# ItIGet

ItIGet web app.

# Containerized Development Environment Setup

### Setup
* Install Docker
* `git clone https://github.com/airladon/itiget/`
* Navigate to project directory


### Start interactive dev environment
* `./startenv dev`

This will start a docker container with a development environment that can be used to run:
* Lint checks for python, javascript and css
* Type checks for javascript
* Tests for python and javascript
* Javascript bundling with webpack

When in the docker container the following commands can be run:
* `npm run lint` to lint javascript source
* `npm run css` to lint css and scss source
* `flake8` to lint python source
* `flow` to type check javascript source
* `pytest` to test python source
* `jest` to test javascript source
* `webpack` to build dev bundle of javascript
* `webpack --env.mode=prod` to build production bundle of javascript
* `flask run --host=0.0.0.0` to run app and access it through a browser at `localhost:5002`.

### Run a local dev server of web app
`./startenv dev-server`

Automatic environment that hosts app at `localhost:5003`
  * Automatically rebuilds and rehosts app each time a source file is changed
  * Browser cache might need to be cleared each time
    * Safari: CMD+OPT+e, then CMD+r
    * Chrome: Hold click the refresh icon and select `Empty Cache and Reload` (only works in developer mode)
  * Uses localally built react js files


### Run a local Stage server of web app
`./startenv stage`

Automatic environment that runs flask and hosts app at `localhost:5001`
  * Container has no npm packages installed, and only the python packages needed for production.
  * Can see flask requests and responses
  * Uses development versions of react from CDN
  * Should run `./build.sh stage` locally, or `webpack --env.mod=stage` in the dev container first

### Run a local Production server of web app
`./startenv prod`
Automatic environment that runs nginx and hosts app at `localhost:5000`
  * Container has no npm packages installed, and only the python packages needed for production.  
  * Uses minified production versions of react from CDN
  * Should run `./build.sh prod` locally, or `webpack --env.mod=prod` in the dev container first to build the needed js files.


# Local Development Environment

Setting up local node and python packages can be useful for editors that use them for showing lint and type errors. They can also be used to run the same commands as in the containerized development environment, but using the container is potentially cleaner and completely independent of the local system's global packages.

Start in the project directory.

### Install Node Packages
Local node packages are used mostly by the editor for linting and type checking.

They can also be used to run lint and type checks from the command line, it is recommended to use the docker containers for this (see first section on containerized development environment).

To install packages, `package.json` and `package-lock.json` files are included, so just run: 

`npm install`

#### How to Update Node Packages for the project
* Create branch
* Update the version numbers in the package.json file
* `rm -rf node_modules`
* `npm install`
* Run dev container and confirm all lint and type checks, and tests pass
* Do a test build to local
* If all passes, commit and pull request


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


#### Install PipEnv (if not already installed on local machine)
* `brew install pipenv`

#### Setup virtual environment and install packages
* `pipenv --python 3.7.1`
* `pipenv shell`
* `pipenv install -d`

#### Update packages
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

Locally install the required version of python
`pyenv install 3.7.2`

Recreate the virtual environment in project folder
`pipenv --python 3.7.2`

Lock the Pipfile with new python version requirement
`pipenv lock`


# Building and Deploy to Test Site
* `./build.sh dev` - Lint, test and build app where:
  * JS is not minified
  * Reac is in development mode
* `./build.sh stage` - Lint, test and build app where:
  * JS is minified
  * JS source maps are included
  * React is in production mode
* `./build.sh prod` - Lint, test and build app where:
  * JS is minified
  * JS source maps are not included
  * React is in production mode
  * This same script is run in CI and deployment
* `./build.sh prod deploy test` - Lint, test, build and deploy app where:
  * JS is minified
  * JS source maps are not included
  * React is in production mode
  * This same script is run in CI and deployment
  * Deploys website to test site.


# Work flow

An example contribution work flow is:
* `git clone https://github.com/airladon/itiget/`

* Create branch

* Use local environments for development:
  * `./start_env.sh dev`
    * Interactive dev environment to do manual type and lint checking, testing, building and manually running flask app
    * To run app, use `flask run --host=0.0.0.0` and access it through a browser at `localhost:5002`.

  * `./start_env.sh dev-server`
    * Automatic environment that hosts app at `localhost:5003`
    * Automatically rebuilds and rehosts app each time a source file is changed
    * Browser cache might need to be cleared each time
      * Safari: CMD+OPT+e, then CMD+r
      * Chrome: Hold click the refresh icon and select `Empty Cache and Reload` (only works in developer mode)

  * `./start_env.sh stage`
    * Automatic environment that runs flask and hosts app at `localhost:5001`
    * Container has no npm packages installed, and only the python packages needed for production.

  * `./start_env.sh prod`
    * Automatic environment that runs nginx and hosts app at `localhost:5000`
    * Container has no npm packages installed, and only the python packages needed for production.  

* Contribute to source code
  * Javascript, HTML and CSS are in itiget/src
  * Python is in itiget/app
  * Most app source contributions should also include test contributions

* In interactive dev environment (`./start_env.sh dev`):
  * Perform type and linting checks:
    * Javascript:
      * `flow`
      * `npm run lint`
    * CSS:
      * `npm run css`
    * Python:
      * `flake8`

  * Perform unit testing:
    * Javascript:
      * `jest`
    * Python:
      * `pytest`

  * Package Javascript:
    * `npm run webpack -- --env.mode=dev` or `webpack`
      * similar to `./build.sh dev` below
    * `npm run webpack -- --env.mode=stage`
      * similar to `./build.sh stage` below
    * `npm run webpack -- --env.mode=prod` or `npm run build`
      * similar to `./build.sh prod` below

* All type and lint checking, testing and building can also be tested at once using the `build.sh` script. This is the same script as is used in Travis CI
  * In a terminal window: 
    * `./build.sh dev` - Lint, test and build app where:
      * JS is not minified
      * Reac is in development mode
    * `./build.sh stage` - Lint, test and build app where:
      * JS is minified
      * JS source maps are included
      * React is in production mode
    * `./build.sh prod` - Lint, test and build app where:
      * JS is minified
      * JS source maps are not included
      * React is in production mode
      * This same script is run in CI and deployment

* If all is passing, then create pull request to merge into branch `release-candidate`
* Once merged, the new app will be hosted on a dev website
* If all is ok, create pull request to merge `release-candidate` into `master`
* Once merged in master, the new app will be deployed to the production site

# Setting up sublime


# Setting up port forwarding:
forward port external 4000 to local 5000
`echo "
rdr pass inet proto tcp from any to any port 4000 -> 127.0.0.1 port 5003
" | sudo pfctl -ef -`

To stop port forwarding:
`sudo pfctl -F all -f /etc/pf.conf`

To see all current rules:
`sudo pfctl -s nat`



# How to run a production build locally:
Start dev container and run production webpack script
 `./start_env.sh dev`
 `webpack --env.mode=prod`
 
Exit container

Start production container
 `./start_env.sh prod`

Can be accessed from localhost:5000/ in the browser