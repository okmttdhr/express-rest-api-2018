
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
$ git clone https://github.com/okmttdhr/express-rest-api-2018.git
$ cd express-resr-api-2018
```

```bash
$ cp .env.sample .env
```

```bash
$ yarn docker:build
$ yarn docker:dev
```

## Testing

Run migration if you haven't yet.

```bash
$ docker exec -it expressrestapi2018_app_1 /bin/bash
root@id:/app# NODE_ENV=test yarn db db:migrate
```

All test's command here.

```bash
$ docker exec -it expressrestapi2018_app_1 /bin/bash
# all the tests
root:/app# yarn test
# all the unit tests
root:/app# yarn test:unit
# only target file's test
root:/app# yarn test:unit:target ./path/to/file.js
# only target file's test with Node debugging client
root:/app# yarn test:unit:target debug ./path/to/file.js
# linting
root:/app# yarn test:lint
# flow
root:/app# yarn flow
```

## Database

### Connect to MySQL

```bash
$ docker exec -it expressrestapi2018_db_1 /bin/bash
root@id:/\# mysql -u root -pdocker
mysql> show databases;
+-----------------------------------+
| Database                          |
+-----------------------------------+
| information_schema                |
| express_rest_api_2018_development |
| express_rest_api_2018_test        |
| mysql                             |
| performance_schema                |
+-----------------------------------+
4 rows in set (0.00 sec)
```

### Creating Model and Migration

- [Creating first Model (and Migration)](http://docs.sequelizejs.com/manual/tutorial/migrations.html#creating-first-model-and-migration-)
