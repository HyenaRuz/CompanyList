# Dockerfile

FROM node:20.9.0
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY . .
RUN npm install
CMD npm run start dev