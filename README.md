# Metallica

## Usage Doc

### Deloyment sequence :
1. [Start Eureka service registry](#eureka)
2. [Start Zuul API gateway service](#zuul)
3. [Trade service](#trade-service)
4. Message broker
5. Notification service
6. Ref data service
7. Market data service
8. Metallica UI

* * *
<a name="eureka"></a> 
## Eureka Service

#### Building:
```sh
$ cd eureka-server
$ mvn clean package
```
this will create an executable jar in `./target/` as `Eureka.jar`

#### Deploying:
```sh
$ java -jar target/Eureka.jar
```
this will start eureka service registry at http://localhost:8761

<a name="zuul"></a> 
## Zuul API gateway service

#### Building:
```sh
$ cd api-gateway
$ mvn clean package
```
this will create an executable jar in `./target/` as `MetallicaApiGateway.jar`

#### Deploying:
```sh
$ java -jar target/MetallicaApiGateway.jar
```
this will start zuul api-gateway and the respective service apis will be accessible through http://localhost:8079/api/\<service-id\>

<a name="trade-service"></a> 
## Trade service

#### Building and deploy:
```sh
$ cd trade-service
$ npm install
$ npm start
```

this will start trade service accessible through http://localhost:8079/api/trade-service



### Pending Features:
  - Search functure for trades list
  - market data update notifications
  - Unit tests and system integration test
