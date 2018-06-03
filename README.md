
# express-rest-api-2018

```sh
docker exec -it expressrestapi2018_app_1 /bin/bash
docker exec -it expressrestapi2018_db_1 /bin/bash
mysql -u root -pdocker

NODE_ENV=test yarn db db:drop
NODE_ENV=test yarn db db:create
NODE_ENV=test yarn db db:migrate
```
