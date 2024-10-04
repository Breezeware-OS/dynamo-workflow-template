#!/bin/bash

set -e
CONTAINER_NAME="service"
MAX_RETRIES=10
RETRY_DELAY=15
RETRIES=0
RUN_WITH_DB=true

############################################################
# Help                                                     #
############################################################
Help()
{
   # Display Help
   echo "Options used for creation and deletion of docker-compose scripts"
   echo
   echo "Syntax: scriptTemplate [-v|-c|-d]"
   echo "options:"
   echo "-v     Version of the Database used for this compose build.(For Example -v v1.5.0)"
   echo "-c     Create the compose project by building and deploying the applications."
   echo "-r     Recreate the compose project by removing the existing container, re-building and re-deploying the applications."
   echo "-d     Delete the compose project by detroying containers, volumes, networks and build caches."
   echo "-t     Select Application type of either client, api, or all."
   echo "-h     View the help for defining which options to use."
   echo "-n     Run client service in docker compose wihtout database. Only applicable to client application type."
   echo
}

############################################################
############################################################
# Main program                                             #
############################################################
############################################################
############################################################
# Process the input options. Add options as needed.        #
############################################################
# Get the options
while getopts ":hcnrv:t:d" option; do
   case $option in
      h) # display Help
         Help
         exit;;
      v) # Enter database version
         DATABASE_VERSION=$OPTARG
         ;;
      c) CREATE=true ;;
      r) RECREATE=true ;;
      t) APPLICATION_TYPE=$OPTARG
         ;;
      d) DELETE=true ;;
      n) RUN_WITH_DB=false ;;
      \?) # Invalid option
         echo "Error: Invalid options"
         exit;;
   esac
done

check_installation(){
  # Check if Java 17 is installed
  if ! java --version 2>&1 | grep -q "openjdk 17."; then
      echo "Java version 17 is not installed."
      exit 1
  fi

  # Check if Docker is installed
  if ! command -v docker &> /dev/null; then
      echo "Docker is not installed."
      exit 1
  fi

  # Check if Docker Compose is installed
  if ! command -v docker compose &> /dev/null; then
      echo "Docker Compose is not installed."
      exit 1
  fi

  # Check if AWS CLI  is installed
  if ! aws --version | grep -q "aws-cli/2."; then
      echo "AWS CLI is not installed."
      exit 1
  else
      # Export CodeArtifact token.
      export CODEARTIFACT_AUTH_TOKEN=`aws codeartifact get-authorization-token --domain breezeware --domain-owner 305251478828 --query authorizationToken --output text`
      export DB_CONTEXT_PATH=v1.0.0
  fi

  # Check if Node 16 is installed
  if ! node --version | grep -q "v16."; then
      echo "Node.js v16 is not installed."
      exit 1
  fi

  # Check if npm is installed
  if ! command -v npm &> /dev/null; then
      echo "npm is not installed."
      exit 1
  fi

  # Check if maven is installed
  if ! mvn --version | grep -q "Apache Maven 3."; then
      echo "Apache Maven 3 is not installed."
      exit 1
  fi
  echo "Prerequistes are all Installed"
}

check_database_dir(){
  cd ../../backend/api-app
  if [ -d "db/postgres/full/$DATABASE_VERSION" ]; then
    echo "Database directory exists: $DATABASE_VERSION"
    export DB_CONTEXT_PATH=db/postgres/full/$DATABASE_VERSION
  else
    echo "Database directory does not exist: $DATABASE_VERSION"
    exit 1
  fi
}

build_api_server(){
  # Check whether the database dir exists
  check_database_dir
  cd ../api-lib
  # Step 1: Build Library.
  echo "Running Maven build on app-lib..."
  mvn -s mvn-settings.xml clean install -Dmaven.test.skip=true
  # Step 2: Build API Docker image using jib.
  echo "Building Api Service Docker image..."
  cd ../api-app
  mvn clean install
  mvn jib:dockerBuild
}

build_web_client(){
  cd ../../frontend/app-web
  if [ -d "build/development" ]; then
    rm -rf build/development
  fi
  npm install --force
  npm run build
}

docker_inspect() {
  health_status=$(docker inspect --format='{{json .State.Health.Status}}' "$CONTAINER_NAME")
  if [[ "$health_status" == *"healthy"* ]]; then
    echo "Container is healthy. Exiting..."
    exit 0
  fi
}

check_health_api(){
  # Loop until the container becomes healthy or the maximum retries are reached
  while [ $RETRIES -lt $MAX_RETRIES ]; do
    echo "Attempt $((RETRIES+1))"
    docker_inspect
    echo "Waiting for $RETRY_DELAY seconds..."
    sleep $RETRY_DELAY
    RETRIES=$((RETRIES+1))
  done

  echo "Maximum retries reached. Container is still not healthy."
}

setup_all_infra(){
  echo "Starting dev build..."
  # Build API docker image using jib
  echo "Building API Docker image..."
  build_api_server
  # Build Static Contents
  echo "Building Web Client Docker image..."
  build_web_client
  # Start Docker containers
  echo "Starting Docker Compose services..."
  cd ../../infra/docker-compose
  docker compose up --build -d
  echo "Started the compose file"
  # Health check for backend api server
  check_health_api
}

setup_client(){
  echo "Building Web Client Docker image..."
  build_web_client
  # Step 4: Start Docker containers
  echo "Starting Docker Compose services..."
  cd ../../infra/docker-compose
}

setup_web_client_infra_with_db(){
  check_database_dir
  setup_client
  docker compose up db web --build -d
}

setup_web_client_infra_without_db(){
  setup_client
  docker compose up web --build -d
}

setup_api_server_infra(){
  check_database_dir
  build_api_server
  # Step 4: Start Docker containers
  echo "Starting Docker Compose services..."
  cd ../../infra/docker-compose
  docker compose up db api-service --build -d
  check_health_api
}

delete_infra(){
  echo "Stopping all docker compose services and removing all data..."
  docker compose down --volumes --rmi all
  echo "Stopped and removed all resources...."
}

if [ "$CREATE" = true ]; then
  echo "Check the installations"
  check_installation
  if [ -z "$APPLICATION_TYPE" ]; then
    echo "There is no application type mentioned. Use -t for application type. Eg -t client"
    exit 1
  fi
  if [[ "$APPLICATION_TYPE" == "client" ]]; then
    echo "Entering create web client and db server"
    if [ "$RUN_WITH_DB" = true ]; then
        if [ -z "$DATABASE_VERSION" ]; then
          echo "There is no database version mentioned. Use -v option to mention the database version. Eg -v v1.0.0.."
        exit 1
    fi
        echo "Running with database..."
        setup_web_client_infra_with_db
    else
        echo "Running without database..."
        setup_web_client_infra_without_db
    fi
    echo "Leaving create web client and db server"
  elif [[ "$APPLICATION_TYPE" == "api" ]]; then
    if [ -z "$DATABASE_VERSION" ]; then
          echo "There is no database version mentioned. Use -v option to mention the database version. Eg -v v1.0.0.."
          exit 1
    fi
    echo "Entering create api and db server"
    setup_api_server_infra
    echo "Leaving create api and db server"
  elif [[ "$APPLICATION_TYPE" == "all" ]]; then
    if [ -z "$DATABASE_VERSION" ]; then
          echo "There is no database version mentioned. Use -v option to mention the database version. Eg -v v1.0.0.."
          exit 1
    fi
    echo "Entering create all applications"
    setup_all_infra
    echo "Leaving create all applications"
  else
    echo "Invalid create application type. Please enter client, api, all type only."
  fi
elif [ "$RECREATE" = true ]; then
  check_installation
  if [ -z "$APPLICATION_TYPE" ]; then
    echo "There is no application type mentioned. Use -t for application type. Eg -t client"
    exit 1
  fi
  if [[ "$APPLICATION_TYPE" == "client" ]]; then
    echo "Entering recreate web client and db server"
    docker compose down
    if [ "$RUN_WITH_DB" = true ]; then
        if [ -z "$DATABASE_VERSION" ]; then
          echo "There is no database version mentioned. Use -v option to mention the database version. Eg -v v1.0.0.."
          exit 1
        fi
        echo "Running with database..."
        setup_web_client_infra_with_db
    else
        echo "Running without database..."
        setup_web_client_infra_without_db
    fi
    echo "Leaving recreate web client and db server"
  elif [[ "$APPLICATION_TYPE" == "api" ]]; then
    echo "Entering recreate api and db server"
    if [ -z "$DATABASE_VERSION" ]; then
          echo "There is no database version mentioned. Use -v option to mention the database version. Eg -v v1.0.0.."
          exit 1
    fi
    docker compose down
    setup_api_server_infra
    echo "Leaving recreate api and db server"
  elif [[ "$APPLICATION_TYPE" == "all" ]]; then
    echo "Entering recreate all applications"
    if [ -z "$DATABASE_VERSION" ]; then
          echo "There is no database version mentioned. Use -v option to mention the database version. Eg -v v1.0.0.."
          exit 1
    fi
    docker compose down
    setup_all_infra
    echo "Leaving recreate all applications"
  else
    echo "Invalid recreate application type. Please enter client, api, all type only."
  fi
elif [ "$DELETE" = true ]; then
  echo "Entering Delete compose project"
  delete_infra
  echo "Leaving Delete compose project"
else
  echo "Invalid Compose Options.Must be Create, Delete, Recreate"
fi
