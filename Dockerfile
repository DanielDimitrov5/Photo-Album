# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any dependencies
RUN npm install

# Bundle your app's source code inside the Docker image
COPY . .

RUN rm -rf /usr/src/app/node_modules/bcrypt && npm install bcrypt

# Transpile TypeScript to JavaScript
RUN npm run build

CMD [ "node", "dist/app.js" ]
