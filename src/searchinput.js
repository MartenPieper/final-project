import React from "react";
import axios from "./axios";
import MultipleSelect from "./selectionsearch"
import PlaceSearch from "./placesearch"
import UniSearch from "./unisearch"
 import StudySearch from "./studysearch"
import TermSearch from "./termsearch"
import DetailedSearch from "./detailedsearch"


export default class SearchInput extends React.Component {
    constructor() {
        super()
        this.state = {}
    }



    render() {
        return (

             <div className="searchinput-container">
            <div>Searchinput works</div>
            <MultipleSelect />
            <StudySearch />
            <UniSearch />
            <PlaceSearch />
            <TermSearch />
            <DetailedSearch />

          </div>
        )
    }
}
