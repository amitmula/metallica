FROM alpine

RUN apk add --update nodejs npm

ADD package.json package.json
RUN npm install
COPY . .
EXPOSE 9090

CMD ["npm","start"]
