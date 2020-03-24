# Development environment for itgeti:
#   - Python/JS Linting
#   - Python/JS Testing
#   - JS Building
#   - Flask debugging

FROM airladon/pynode:python3.8.1-node12.16.0-npm6.13.7-docker19.03.2-heroku7.30.1

# ## General ##
WORKDIR /opt/app

# Install npm packages
ADD package.json .
ADD package-lock.json .
RUN npm install

# Install Python packages
RUN apt-get install -y libpq-dev
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

RUN npm install figureone@0.1.22

# Use this is you want to load straight into flask
# CMD ["flask", "run", "--host=0.0.0.0"]

RUN useradd -m -u HOST_USER_ID -o myuser
RUN groupadd -g DOCKER_GROUP_ID -o host-docker
RUN usermod -aG DOCKER_GROUP_ID,HOST_USER_GROUP_ID myuser
RUN chown myuser /opt/app
# RUN chown -R myuser /opt/app
# RUN chown -R myuser repo
# RUN chown myuser app/app/app.db
# RUN chmod 666 app/app/app.db


USER myuser

ENTRYPOINT ["bash"]

