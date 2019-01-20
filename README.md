# ItIGet

ItIGet web app.

Docker containers are used for development, testing and deployment. Containers can be built locally that mimic test and production environments.

Local envirnoment is used for local editor linting.

# Setup local environment
## Clone the Repository
* `git clone https://github.com/airladon/itiget/`

## Install Node Packages
* `npm install`
Local node packages are used mostly by the editor for linting and type checking.

They can also be used to run lint and type checks from the command line, it is recommended to use the docker containers for this (see below).

## Install Python and Packages (if not already installed locally)
### Install PyEnv and Python 3.6.6
* `brew install pyenv`
* `echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.zshrc`
* `pyenv install 3.7.1`

>> If pyenv install doesn't work because of zlib failure, do this:
`xcode-select --install`
`sudo installer -pkg /Library/Developer/CommandLineTools/Packages/macOS_SDK_headers_for_macOS_10.14.pkg -target /`


### Install PipEnv (if not already installed locally)
* `brew install pipenv`

### Setup virtual environment and install packages
* `pipenv --python 3.7.1`
* `pipenv shell`
* `pipenv install -d`

If update requirements.txt, then:
* `rm Pipfile*`
* `pipenv install -r requirements.txt`


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