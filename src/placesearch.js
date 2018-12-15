import React, { Component } from 'react'
import Select from 'react-select'
import { places } from "../data"
import { addSearchQuery} from "./actions"
import { connect } from 'react-redux';


const MyComponent = () => (
  <Select options={places} />
)


export default connect()((props) => (
    <div>
    <div>PlaceSearch</div>

  <Select

    isMulti
    name="colors"
    options={places}
    className="basic-multi-select"
    classNamePrefix="select"
    onChange = {e => (props.dispatch(addSearchQuery("places", e)))}
  />

  </div>
));

// onChange={this.handleChange}

// handleChange(e) {
//
//     console.log("e.target.value", e.target.value)
// };
