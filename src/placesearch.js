import React, { Component } from 'react'
import Select from 'react-select'
import { placesIndex } from "../data"
import { addSearchQuery} from "./actions"
import { connect } from 'react-redux';


const MyComponent = () => (
  <Select options={placesIndex} />
)
// handleChange(e) {
//     props.dispatch(addSearchQuery("places", e));
//     props.handleSearch();
// };

export default connect()((props) => (
    <div>
    <div className="input-title">Stadt/Ort:</div>

  <Select

    isMulti
    name="colors"
    options={placesIndex}
    className="basic-multi-select"
    classNamePrefix="select"
    onChange = {(e) =>
        {
            const action = props.dispatch(addSearchQuery("places", e));
        action.then(() => props.handleSearch())
    }} // try to put handleSearch in .then

  />

  </div>
));
