# ISUCorp Test

Angular + .NET 5 + EFCore + MySQL

## Dependencies

- Docker
- node.js
- .NET 5

## How to run

The fastest way to run the app is using docker and docker-compose. The required files are already at the root:

```bash
# Clone the project and cd into the project directory:
git clone git@github.com:lmcarreiro/isu-corp-test.git
cd isu-corp-test

# Build and start the app and database using docker-compose:
docker-compose up

```

It's just that. After it starts all three containers, the app will be available on http://localhost:5000

## Running on development mode

To develop and run front-end and back-end on dev mode, I use:

- Docker to create and run the MySQL database
- Visual Studio 2019 + .NET 5 SDK to run and work on the back-end
- Visual Studio Code + Node.js 12 to run and work on the front-end

### Using docker database for development

```bash
# To create the containers for the first time
docker run --name isucorp-mysql -p 3306:3306 -d \
  -e MYSQL_DATABASE=test \
  -e MYSQL_USER=test \
  -e MYSQL_PASSWORD=test \
  -e MYSQL_ROOT_PASSWORD=test \
  mysql:8.0.17

docker run --name isucorp-adminer -p 8080:8080 -d \
  --link isucorp-mysql:db \
  adminer

# To start all three containers (if they stop after restarting the computer):
docker start isucorp-mysql isucorp-adminer

# To stop (and delete) all three containers:
docker stop isucorp-mysql isucorp-adminer
docker rm isucorp-mysql isucorp-adminer
```

### Running the server

To run the server, I use Visual Studio 2019, but if you have the .NET 5 SDK installed, it is possible to run from command line without Visual Studio:

```sh
cd server

# Install project dependencies
dotnet restore

# Start server
dotnet run --project IsuCorpTest.Web
```

### Running the client

Need node.js installed. I used version 12 during the development.

```sh
cd client

# Install project dependencies
yarn

# Start client with dev mode
yarn start
```

## Architecture

If you are checking this from GitHub repo README.md page, I recommend to set the page zoom to 300% (on Google Chrome)

![Architecture](./docs/full-architecture.png)
