PROJECT_PATH=`pwd`

# cp containers/playwright/.dockerignore .

cp containers/playwright/Dockerfile Dockerfile
docker build -t playwright .
rm Dockerfile

if [ -z "${TIG_ADDRESS}" ];
then
  TIG_ADDRESS=http://host.docker.internal:5003       # default to local
fi

# check_status() {
#   if [ $? != 0 ];
#   then
#     echo
#     echo "${bold}${red}Build failed${reset}"
#     echo
#     exit 1
#   else
#     echo "${bold}${green}OK${reset}"
#   fi
# }

title() {
    echo
    echo "${bold}${cyan}=================== $1 ===================${reset}"
}

ADDRESS=$1

if [ $ADDRESS ];
then
    case $ADDRESS in
        local) TIG_ADDRESS='http://host.docker.internal:5003';;
        5000) TIG_ADDRESS='http://host.docker.internal:5000';;
        5001) TIG_ADDRESS='http://host.docker.internal:5001';;
        5002) TIG_ADDRESS='http://host.docker.internal:5002';;
        5003) TIG_ADDRESS='http://host.docker.internal:5003';;
        dev) TIG_ADDRESS='https://thisiget-dev.herokuapp.com';;
        test) TIG_ADDRESS='https://thisiget-test.herokuapp.com';;
        beta) TIG_ADDRESS='https://thisiget-beta.herokuapp.com';;
        prod) TIG_ADDRESS='https://thisiget.herokuapp.com';;
        *) TIG_ADDRESS=$ADDRESS;;
    esac
fi

title "Running tests on $TIG_ADDRESS"

export TIG_ADDRESS=$TIG_ADDRESS

if [ "$1" == "debug" ];
then
  docker run -it --rm --ipc=host \
    -v $LOCAL_PROJECT_PATH/src:/src \
    -v $LOCAL_PROJECT_PATH/tests:/tests \
    -v $LOCAL_PROJECT_PATH/package:/package \
    -v $LOCAL_PROJECT_PATH/babel.config.js:/babel.config.js \
    -v $LOCAL_PROJECT_PATH/containers/playwright/jest.config.js:/jest.config.js \
    -e TIG_ADDRESS=$TIG_ADDRESS \
    playwright /bin/bash
else
  docker run -it --rm --ipc=host \
    -v $LOCAL_PROJECT_PATH/src:/src \
    -v $LOCAL_PROJECT_PATH/tests:/tests \
    -v $LOCAL_PROJECT_PATH/package:/package \
    -v $LOCAL_PROJECT_PATH/babel.config.js:/babel.config.js \
    -v $LOCAL_PROJECT_PATH/containers/playwright/jest.config.js:/jest.config.js \
    -e TIG_ADDRESS=$TIG_ADDRESS \
    playwright /bin/bash -c "npm run http-server-quiet; npm run jest $2 $3 $4 $5 $6 $7"
fi
