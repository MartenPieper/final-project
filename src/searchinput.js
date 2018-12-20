import React from "react";
import axios from "./axios";
import MultipleSelect from "./selectionsearch"
import PlaceSearch from "./placesearch"
import UniSearch from "./unisearch"
 import StudySearch from "./studysearch"
import TermSearch from "./termsearch"
import DetailedSearch from "./detailedsearch"
import { connect } from 'react-redux';
import { addResults } from './actions';


class SearchInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.handleSearch = this.handleSearch.bind(this);
            this.resetResults = this.resetResults.bind(this);
    }

    handleSearch() {
        console.log("query", this.props.query)
        var queryInput = this.props.query
        axios.post("/getSearchUpdate", queryInput).then(resp => {
            console.log("resp in axios /getSearchUpdate", resp)

            this.props.dispatch(addResults(resp.data));
        })
    }

    resetResults() {
        axios.get("/reset").then(resp => {
            console.log("results reset executed",resp)
            this.props.dispatch(addResults(resp.data));
        })
    }

    render() {
        return (

            <div className="searchinput-container">
            {this.props.isLoading && <div className="loading"></div>}
                <div>Searchinput works</div>
                <MultipleSelect handleSearch={this.handleSearch}/>
                <StudySearch handleSearch={this.handleSearch}/>
                <UniSearch handleSearch={this.handleSearch}/>
                <PlaceSearch handleSearch={this.handleSearch}/>
                <TermSearch handleSearch={this.handleSearch}/>
                <DetailedSearch />
                <button onClick ={this.resetResults}>Zurücksetzen</button>
          </div>
        )
    }
}

function mapStateToProps(state) {
    console.log("State in mapStateToProps", state)



return {
    query: state,
    isLoading: state.isLoading
};
}

export default connect(mapStateToProps)(SearchInput);
