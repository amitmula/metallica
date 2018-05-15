import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import SearchForm from "../components/SearchForm";
import * as actions from "../state/SearchFormActions";

const mapStateToProps = (state) => {
    return {
        tradeDateFrom: state.searchForm.tradeDateFrom,
        tradeDateTo: state.searchForm.tradeDateTo,
        commodity: state.searchForm.commodity,
        side: state.searchForm.side,
        counterParty: state.searchForm.counterParty,
        location: state.searchForm.location,
        hasError: state.searchForm.hasError,
        data: state.searchForm.data
    }
}

 const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
    }
} 

export default connect(mapStateToProps, mapDispatchToProps) (SearchForm)