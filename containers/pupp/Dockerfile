FROM airladon/pynode:python3.8.1-node12.16.0-npm6.13.7

# ########################################################################
# From https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-in-docker
# ########################################################################

# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work.
# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
RUN apt-get update && apt-get install -y gnupg2
RUN apt-get update && apt-get install -y wget --no-install-recommends
RUN apt-get update && apt-get install -y ca-certificates
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Install puppeteer so it's available in the container.
RUN npm i puppeteer \
    # Add user so we don't need --no-sandbox.
    # same layer as npm install to keep re-chowned files from using up several hundred MBs more space
    && groupadd -r pptruser && useradd -r -g pptruser -u HOST_USER_ID -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /node_modules

# Run everything after as non-privileged user.
USER pptruser

# ########################################################################
# END From
# ########################################################################

WORKDIR /home/pptruser

ADD containers/pupp/package.json .
RUN npm install

# Update path so eslint can be run from anywhere
ENV PATH="/home/pptruser/node_modules/.bin:${PATH}"


# ENTRYPOINT ["dumb-init", "--"]
CMD ["google-chrome-unstable"]
