FROM node:alpine
ADD package.json package.json
RUN npm install
COPY . .
ENV GOOGLE_APPLICATION_CREDENTIALS=./service_account_keys/dataStore-service-account.json
EXPOSE 9093
CMD ["npm","start"]
