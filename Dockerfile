FROM node:10.16.3-alpine

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git

RUN mkdir -p /home/node/api/node_modules && chown -R node:node /home/node/api

WORKDIR /home/node/api

COPY package*.json ./

# dando merda
RUN npm install --quiet node-gyp -g

RUN npm install

COPY . .

COPY --chown=node:node . .

USER node

EXPOSE 3005

CMD [ "node", "index.js" ]