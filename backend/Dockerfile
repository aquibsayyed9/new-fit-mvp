FROM node:20-alpine

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application files
COPY . .

# Expose the port
EXPOSE 5000

CMD ["npx", "nodemon", "src/app.ts"]
