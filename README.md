# learningApp

create init migration for backend script
npx typeorm migration:generate Initial -d dist/typeOrmDataSource.js

// 2:09:39
Starting front end

terminal
docker-compose -f learningAppDockerCompose.yaml up
docker-compose -f learningAppDockerCompose.yaml down
f = file
up = starts containers in the file
down = shuts down containers

docker build -t my-app:1.0 .
when you adjust the file you rebuild the image
docker rmi imageid
to delete
docker rm
container delete

docker ps
docker logs containerid
docker exec -it container id /bin/bash or /bin/sh
-it = interactive terminal
exit

docker volumes
types
docker run -v /home/mount/data:/var/lib/mysql/data
host volume
where on the host file system the reference is made
anonymous volumes
docker run -v /var/lib/mysql/data
managed by docker
named volumes < use this
docker run -v name:/var/lib/mysql/data
referenced by name
in docker-compose
service
volumes: - db-data:var/lib/mysql/data
volumes:
db-data
