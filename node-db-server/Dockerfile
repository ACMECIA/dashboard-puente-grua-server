FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# COPY package*.json ./
COPY . .


RUN yarn install

# Bundle app source
# COPY . .

RUN chmod +x /usr/src/app/start.sh


EXPOSE 8081
CMD ["bash", "-c", "/usr/src/app/start.sh"]

# ENTRYPOINT [ "tail", "-f", "/dev/null" ]