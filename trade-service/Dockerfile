FROM node:alpine
ADD package.json package.json
RUN npm install
COPY . .
EXPOSE 9090
CMD ["npm","start"]
