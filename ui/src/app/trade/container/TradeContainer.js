import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import Trade from "../components/Trade";
import * as actions from "../state/TradeActions";

const mapStateToProps = (state) => {
    return {
        rightPanel: state.tradeState.rightPanel,
        selected: state.tradeState.selected,
        trades: state.tradeState.trades,
        counterparties: state.tradeState.counterparties,
        commodities: state.tradeState.commodities,
        locations: state.tradeState.locations,
        prices: state.tradeState.prices,
        loading: state.tradeState.loading,
        error: state.tradeState.error,
        errorMessage: state.tradeState.errorMessage,
        searchForm: state.tradeState.searchForm,
        searchMode: state.tradeState.searchMode,
        tradeForm: state.tradeState.tradeForm,
        tradeFilter: state.tradeState.tradeFilter,
        filteredTrades :state.tradeState.filteredTrades
    }
}

 const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    }
} 

export default connect(mapStateToProps, mapDispatchToProps) (Trade)