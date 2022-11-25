FROM nginx

ENV mongo_db_username=admin \
    mongo_db_pwd=password

WORKDIR /usr/share/react

RUN curl -fsSL https://deb.nodesource.com/setup_17.x | bash -
RUN apt-get install -y nodejs

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN rm -r /usr/share/nginx/html/*

RUN cp -a build/. /usr/share/nginx/html

CMD ['node', 'server.js']