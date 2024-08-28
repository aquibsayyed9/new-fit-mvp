# Use official Node.js image as the base
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose the Metro Bundler port
EXPOSE 8081

# Start Metro Bundler for React Native
CMD ["npm", "start"]
