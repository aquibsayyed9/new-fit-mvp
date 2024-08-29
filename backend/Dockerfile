# Use official Node.js image as the base
FROM node:20-alpine

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application files
COPY . .

# Expose the port
EXPOSE 5000

# Command will be run via Docker Compose
CMD ["npx", "nodemon", "src/app.ts"]
