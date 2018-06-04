
# express-rest-api-2018

## Features

- [Node v8.9.4](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [Docker](https://www.docker.com/)
- [Yarn](https://yarnpkg.com/en/)
- [Babel](https://babeljs.io/)
- [Flow](https://flow.org/)
- [MySQL](https://www.mysql.com/)
- [Sequelize](http://docs.sequelizejs.com/)
- Testing
  - [Mocha](https://mochajs.org/)
  - [supertest](https://github.com/visionmedia/supertest)
  - [ESLint](https://eslint.org/)
- ES2017 support
- Load environment variables from .env files with [dotenv](https://github.com/motdotla/dotenv)
- Request validation with [express-validator](https://github.com/express-validator/express-validator)
- Logging with [morgan](https://github.com/expressjs/morgan)

## Pre Requirements

- [Docker For Mac](https://www.docker.com/docker-mac)
- [Yarn](https://yarnpkg.com/en/)

## Getting Started

```bash
git clone https://github.com/okmttdhr/express-rest-api-2018.git
cd express-resr-api-2018
```

```bash
$ cp .env.sample .env
```

```bash
$ yarn docker:build
$ docker-compose run app yarn install
```

```bash
$ yarn docker:dev
```

```sh
docker exec -it expressrestapi2018_app_1 /bin/bash
docker exec -it expressrestapi2018_db_1 /bin/bash
mysql -u root -pdocker

NODE_ENV=test yarn db db:drop
NODE_ENV=test yarn db db:create
NODE_ENV=test yarn db db:migrate
```
