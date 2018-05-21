import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import MarketDataTicker from "../components/MarketDataTicker";
import * as actions from "../state/MarketDataTickerActions";

const mapStateToProps = (state) => {
  return {      
      prices: state.marketDataTickerState.prices,
      loading: state.marketDataTickerState.loading,
      error: state.marketDataTickerState.error      
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      actions: bindActionCreators(actions, dispatch),
  }
} 

export default connect(mapStateToProps, mapDispatchToProps) (MarketDataTicker)