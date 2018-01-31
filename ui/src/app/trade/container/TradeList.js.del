import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import TradeList from "../components/TradeList";
import * as actions from "../state/actions";

const mapStateToProps = (state) => {
    return {
         rightPanel: state.rightPanel,
         trades: state.tradeState.trades,
         loading: state.tradeState.loading,
         error: state.tradeState.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
        //showRightPanel: bindActionCreators(actions.showRightPanel, dispatch)
    }
}

export default TradeListContainer = connect(mapStateToProps, 
                    mapDispatchToProps) (TradeList)