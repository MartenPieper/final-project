import React from "react";
import axios from "./axios";
import MultipleSelect from "./selectionsearch"
import PlaceSearch from "./placesearch"
import UniSearch from "./unisearch"
 import StudySearch from "./studysearch"
import TermSearch from "./termsearch"
import DetailedSearch from "./detailedsearch"
import { connect } from 'react-redux';


class SearchInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch() {
        console.log("query", this.props.query)
        var queryInput = this.props.query
        axios.post("/getSearchUpdate", queryInput).then(resp => {
            console.log("resp", resp)
        })
    }

    render() {
        return (

            <div className="searchinput-container">
                <div>Searchinput works</div>
                <MultipleSelect handleSearch={this.handleSearch}/>
                <StudySearch handleSearch={this.handleSearch}/>
                <UniSearch handleSearch={this.handleSearch}/>
                <PlaceSearch handleSearch={this.handleSearch}/>
                <TermSearch handleSearch={this.handleSearch}/>
                <DetailedSearch />

          </div>
        )
    }
}

function mapStateToProps(state) {
    console.log("State in mapStateToProps", state)



return {
    query: state
};
}

export default connect(mapStateToProps)(SearchInput);
