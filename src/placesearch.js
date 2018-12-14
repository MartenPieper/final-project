import React, { Component } from 'react'
import Select from 'react-select'
import { places } from "../data"
import { addSearchQuery} from "./actions"



const MyComponent = () => (
  <Select options={places} />
)


export default () => (
    <div>
    <div>PlaceSearch</div>

  <Select

    isMulti
    name="colors"
    options={places}
    className="basic-multi-select"
    classNamePrefix="select"

  />

  </div>
);

// onChange={this.handleChange}

// handleChange(e) {
//
//     console.log("e.target.value", e.target.value)
// };
