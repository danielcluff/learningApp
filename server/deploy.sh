#!/bin/bash

echo What should the version be?
read VERSION

docker build -t benawad/lireddit:$VERSION .
docker push benawad/lireddit:$VERSION
ssh root@dockerip "docker pull benawad/lireddit:$VERSION && docker tag benawad/lireddit:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"