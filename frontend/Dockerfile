FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package.json package-lock.json ./

# Install dependencies using --legacy-peer-deps
RUN npm install --legacy-peer-deps

# Set the environment variable to use the legacy OpenSSL provider
ENV NODE_OPTIONS=--openssl-legacy-provider

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight web server to serve the static files
RUN npm install -g serve

# Expose the port on which the app will run
EXPOSE 3000

# Start the React app
CMD ["serve", "-s", "build", "-l", "3000"]

