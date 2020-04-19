FROM node

# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./

RUN echo | ls
RUN echo | ls 

RUN npm install

RUN echo | ls node_modules
# RUN npm install -g nodemon

COPY . .

EXPOSE 7000

# CMD [ "node", "server.js" ]
CMD [ "npm", "run" ,"start" ]
# CMD [ "npm", "run" ,"start:dev" ]

