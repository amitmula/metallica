FROM node:alpine
ADD package.json package.json
RUN npm install
COPY . .
EXPOSE 9093
CMD ["npm","start"]
