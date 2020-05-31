FROM node:alpine
ADD package.json package.json
RUN npm install
COPY . .
EXPOSE 9092
CMD ["npm","start"]
