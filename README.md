# Metallica

## Usage Doc

### Prerequisites :
1. [Database Setup](#mongo)
2. [Mesasge broker setup](#ampq)

### Deployment sequence :
1. [Start Eureka service registry](#eureka)
2. [Start Zuul API gateway service](#zuul)
3. [Trade service](#trade-service)
4. [Message broker](#message-broker)
5. [Notification service](#notifcation-service)
6. [Ref data service](#ref-data-service)
7. [Market data service](#market-data-service)
8. [Metallica UI](#metallica-ui)

* * *
<a name="mongo"></a> 
## Database Setup
### MongoDb installation
MongoDB has been used for data persistence. MongoDB community server is needed to be installed from https://www.mongodb.com/download-center#community and any client to visualize data. Robo 3T is a good client tool and can be downloaded from https://www.robomongo.org

MongoDB will be started on port `27017` after installation.

### Setting up data in DB
1. Create database `metallica` with 5 collections 
```
metallica
  + commodities
  + counterparties
  + counters
  + locations
  + trades  
```
2. Import ref data in DB from json files available at `./refData-service/collections`
```sh
$ cd ./refData-service/collections
$ mongoimport --db metallica --collection commodities --file commodities.json --jsonArray
$ mongoimport --db metallica --collection counterparties --file counterparties.json --jsonArray
$ mongoimport --db metallica --collection locations --file locations.json --jsonArray
$ mongoimport --db metallica --collection trades --file trades.json --jsonArray
```



<a name="ampq"></a>
## Message Broker
### RabbitMQ installation
RabbitMQ has been used as the message broker. It can be installed from http://www.rabbitmq.com/install-windows.html. It has dependency on Erlang, install it from http://www.rabbitmq.com/which-erlang.html




<a name="eureka"></a> 
## Eureka Service Registry
Eureka has been used as a Service registry and discovery tool.
```sh
$ cd eureka-server
$ mvn clean package
```

this will create an executable jar in `./target/` as `Eureka.jar`

```sh
$ java -jar target/Eureka.jar
```

this will start eureka service registry. Web interface is accessible through http://localhost:8761



<a name="zuul"></a> 
## Zuul API gateway service
```sh
$ cd api-gateway
$ mvn clean package
```

this will create an executable jar in `./target/` as `MetallicaApiGateway.jar`

```sh
$ java -jar target/MetallicaApiGateway.jar
```
this will start zuul api-gateway and the respective micro-service apis will be accessible through http://localhost:8079/api/\<micro-service-id\>



<a name="trade-service"></a> 
## Trade service
NodeJS micro service that exposes API to get/update/delete trade data

```sh
$ cd trade-service
$ npm install
$ npm start
```
this will start trade service accessible through http://localhost:8079/api/trade-service


<a name="message-broker"></a> 
## Message broker service
NodeJS micro service to expose http endpoints to RabbitMQ message exchange.
```sh
$ cd message-broker
$ npm install
$ npm start
```
this will start message broker accessible through http://localhost:8079/api/message-broker


<a name="notifcation-service"></a> 
## Notification service
NodeJS micro service to read messages from Rabbit MQ's trade-data and market-data exchanges and push notification to UI through web socket I/O.
```sh
$ cd notification-service
$ npm install
$ npm start
```
this will start notification service accessible through http://localhost:8079/api/notification-service


<a name="market-data-service"></a> 
## Market Data service
NodeJS micro service to access and manage market prices. It has various endpoints to read and update market prices for various commodities traded in Metallica.
```sh
$ cd market-data-service
$ npm install
$ npm start
```
this will start market-data-service accessible through http://localhost:8079/api/market-data-service


<a name="ref-data-service"></a> 
## Ref Data service
NodeJS micro service to access and manage Metallica ref data viz. commmodities, Counterparties and Locations used in Metallica.
```sh
$ cd ref-data-service
$ npm install
$ npm start
```
this will start ref-data-service accessible through http://localhost:8079/api/ref-data-service


<a name="metallica-ui"></a> 
## Metallica UI
This is the actual React application to implement the Metallica web application to initiate, update, search trades. Market data notifications are displayed on a price ticker component and all trade operations are updated in UI through web sockets I/O with notification service.
```sh
$ cd ui
$ npm install
$ npm start
```
this will start Metallica UI accessible through http://localhost:8095


### Pending Features:
  - ~~Search functure for trades list~~
  - ~~market data update notifications~~
  - Unit tests and system integration test
