# Development environment for itgeti:
#   - Python/JS Linting
#   - Python/JS Testing
#   - JS Building
#   - Flask debugging

FROM airladon/pynode:python3.9.5-node16.10.0-npm7.24.1-docker20.10.8-heroku7.59.0

# ########################################################################
# From https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-in-docker
# ########################################################################

# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work.
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*
# ## General ##
WORKDIR /opt/app

# Install npm packages
ADD package.json .
# ADD package-lock.json .
RUN npm install

# Install Python packages
# RUN apt-get install -y libpq-dev
ADD requirements.txt .
RUN pip install --no-cache-dir -q -r requirements.txt

# This is the folder that will be shared with the docker host machine
# RUN mkdir app
# RUN mkdir tests
# RUN mkdir src

# Update path so eslint can be run from anywhere
ENV PATH="/opt/app/node_modules/.bin:${PATH}"


# Environment variable for flask
ENV FLASK_APP app/my_app.py
ENV FLASK_DEBUG 1

RUN npm install figureone@0.1.23

# Use this is you want to load straight into flask
# CMD ["flask", "run", "--host=0.0.0.0"]

RUN useradd -m -u HOST_USER_ID -o myuser
# RUN groupadd -g DOCKER_GROUP_ID -o host-docker
# RUN usermod -aG DOCKER_GROUP_ID,HOST_USER_GROUP_ID myuser
RUN chown myuser /opt/app
# RUN chown -R myuser /opt/app
# RUN chown -R myuser repo
# RUN chown myuser app/app/app.db
# RUN chmod 666 app/app/app.db


# USER myuser

ENTRYPOINT ["bash"]

