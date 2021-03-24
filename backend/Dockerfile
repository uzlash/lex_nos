FROM node:stretch-slim
LABEL author="Khalil Mohammed Shams"
WORKDIR /app
COPY package.json .
COPY src ./src
RUN ["npm", "install"]
EXPOSE 3000
CMD ["npm", "start"]