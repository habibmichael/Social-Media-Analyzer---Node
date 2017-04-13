FROM node:boron

#Create app directory
RUN mkdir -p /usr/src/sma
WORKDIR /usr/src/sma

#Install app dependencies
COPY package.json /usr/src/sma
RUN npm install

#Bundle app source
COPY . /usr/src/sma

EXPOSE 8090
CMD ["npm","start"]
