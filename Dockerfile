FROM node:carbon

# Create app directory
WORKDIR app/

COPY package.json .

# RUN npm install
# If you are building your code for production
RUN npm install --only=production

# Bundle app source
COPY . .

RUN ls

RUN pwd

EXPOSE 3000
CMD [ "node", "server.js" ]
