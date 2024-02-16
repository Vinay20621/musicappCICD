# Dockerfile for Vite-based React client

# Use a more recent LTS version of Node.js
FROM node:17-alpine

# Set the working directory to /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json .

# Install dependencies
RUN npm install
# Copy the local files to the container's working directory
COPY . .

# Expose port 3000 to the outside world (assuming Vite's default port)
EXPOSE 8080

# Command to run the application
CMD ["npm", "run", "dev"]
