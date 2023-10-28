source configs/deploy.conf

npm run build

if [[ "$(sudo docker ps -a | grep $CONTAINER_NAME)" ]]; then sudo docker stop $CONTAINER_NAME && sudo docker rm $CONTAINER_NAME ; fi
sudo docker build  --build-arg NGINX_PORT=$NGINX_PORT -f docker/dockerfile -t $CONTAINER_NAME:$TARGET_VERSION .
rm -rf dist


sudo docker run -e  NGINX_PORT=$NGINX_PORT -p $NGINX_PORT:$NGINX_PORT --rm -t -d  --name $CONTAINER_NAME $CONTAINER_NAME:$TARGET_VERSION
