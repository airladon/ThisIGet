PROJECT_PATH=`pwd`

docker run --rm   --name pgdocker -e POSTGRES_PASSWORD=test_db -d -p 5432:5432 -v $PROJECT_PATH/test_db:/var/lib/postgresql/data --net thisigetnet postgres
