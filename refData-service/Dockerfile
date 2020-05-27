FROM alpine

RUN apk add --update nodejs npm

ADD package.json package.json
RUN npm install
COPY . .
ENV GOOGLE_APPLICATION_CREDENTIALS=./service_account_keys/refdata-service-account.json
EXPOSE 9093
CMD ["npm","start"]
