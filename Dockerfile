# Dockerfile

# Use latest node
FROM node:latest

# Create app directory
WORKDIR /app

COPY . .

ENV PORT=3000

# Install app dependencies
RUN npm install

EXPOSE $PORT

ENTRYPOINT ["node", "app.js"]