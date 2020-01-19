# Development environment for itgeti:
#   - Python/JS Linting
#   - Python/JS Testing
#   - JS Building
#   - Flask debugging

FROM airladon/pynode:python3.7.4-node12.10.0-npm6.11.3-docker19.03.2-heroku7.30.1

# ## General ##
WORKDIR /opt/app

# Install npm packages
ADD package.json .
ADD package-lock.json .
RUN npm install

# Install Python packages
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

RUN npm install figureone@0.1.4

# Use this is you want to load straight into flask
# CMD ["flask", "run", "--host=0.0.0.0"]

RUN useradd -m -u 501 -o myuser
RUN groupadd -g 0 -o host-docker
RUN usermod -aG 0,20 myuser
RUN chown myuser /opt/app
# RUN chown -R myuser /opt/app
# RUN chown -R myuser repo
# RUN chown myuser app/app/app.db
# RUN chmod 666 app/app/app.db


USER myuser

ENTRYPOINT ["bash"]
