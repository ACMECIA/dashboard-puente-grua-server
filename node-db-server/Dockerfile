FROM node:16

# Create app directory
WORKDIR /usr/src/app

RUN yarn add -D nodemon

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN yarn install

# Bundle app source
COPY . .

RUN chmod +x /usr/src/app/start.sh


EXPOSE 8081
CMD ["bash", "-c", "/usr/src/app/start.sh"]