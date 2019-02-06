HEROKU_CONFIG_VARS=`heroku config --app=thisiget | sed '1d' | sed 's/:.*$//' | tr " " "\n"`

EXPECTED_CONFIG_VARS[0]=MAIL_SERVER
EXPECTED_CONFIG_VARS[1]=SECRET_KEY
EXPECTED_CONFIG_VARS[2]=MAIL_USERNAME
EXPECTED_CONFIG_VARS[3]=MAIL_SENDER
EXPECTED_CONFIG_VARS[4]=AES_KEY
EXPECTED_CONFIG_VARS[5]=PEPPER1

FAIL=0
check_var() {
  VALUE=`echo $1 | sed 's/ /\'$'\n/g' | sed -n "/^${2}/p"`
  if [ -z $VALUE ];
  then
    echo "Heroku Config Variable $2 does not exist."
    FAIL=1
  fi
}
# check_var "$HEROKU_CONFIG_VARS" MAIL_PASSWORD
# exit 1

EXPECTED_CONFIG_VARS_ARRAY=(${EXPECTED_CONFIG_VARS})
for VAR in ${EXPECTED_CONFIG_VARS[@]}; do
  echo "looking " $VAR
  check_var "$HEROKU_CONFIG_VARS" $VAR
done
