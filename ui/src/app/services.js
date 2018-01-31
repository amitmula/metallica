const API_END_POINT = "http://localhost:8079/api";
//const TRADE_SERVICE_API_END_POINT = "http://localhost:8999";
const TRADE_SERVICE = API_END_POINT + "/trade-service";
const REF_DATA_SERVICE = API_END_POINT + "/ref-data-service";
const MARKET_DATA_SERVICE = API_END_POINT + "/market-data-service";

function fetchJson(url) {
  return fetch(url).then(
    response => {
      console.log(response);

      if (response.status == 400)
        throw new Error("bad request, check token or token expired");

      if (response.status == 404)
        throw new Error("Resource not found");

      if (response.status == 403)
        throw new Error("Not permitted, auth needed");

      //generic
      if (response.state >= 400 && response.status < 500) {
        throw new Error("client error");
      }

      if (response.status >= 500)
        throw new Error("Server error ");

      if (response.status == 0)
        throw new Error("Check network connection ");

      //since we can't know exact error
      if (!response.ok) {
        throw new Error("Request failed");
      }

      return response.json()
    })
}

export function getTradeDataList() {
  console.log('---------------> calling ->', TRADE_SERVICE + "/trade/all")
  return fetchJson(TRADE_SERVICE + "/trade/all");
}

export function getCommodityList() {
  console.log('---------------> calling ->', REF_DATA_SERVICE + "/ref/commodities")
  return fetchJson(REF_DATA_SERVICE + "/ref/commodities");
}

export function getLocationList() {
  console.log('---------------> calling ->', REF_DATA_SERVICE + "/ref/locations")
  return fetchJson(REF_DATA_SERVICE + "/ref/locations");
}

export function getCounterPartyList() {
  console.log('---------------> calling ->', REF_DATA_SERVICE + "/ref/counterparties")
  return fetchJson(REF_DATA_SERVICE + "/ref/counterparties");
}

export function getCommodityPriceList() {
  console.log('---------------> calling ->', MARKET_DATA_SERVICE + "/price/all")
  return fetchJson(MARKET_DATA_SERVICE + "/price/all");
}
