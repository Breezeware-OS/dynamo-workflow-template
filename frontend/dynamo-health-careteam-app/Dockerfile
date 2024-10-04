# Step 1: Use the official Node.js image as a base image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install --f

# Step 5: Copy the rest of the application code to the working directory
COPY . .

# Step 6: Build the React application
RUN npm run build

# Step 7: Serve the built files using a simple server
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Expose the port on which the app will run
EXPOSE 3000
