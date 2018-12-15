import React from 'react';

import Select from 'react-select';
import { colourOptions, groupedOptions, flavourOptions } from '../data';
import { addSearchQuery} from "./actions"
import { connect } from 'react-redux';


const MyComponent = () => (
  <Select options={options} />
)


export default connect()((props) => (
    <div>
    <div>TermSearch</div>
  <Select

    isMulti
    name="colors"
    options={groupedOptions}
    className="basic-multi-select"
    classNamePrefix="select"
    onChange = {(e) =>
        {
            const action = props.dispatch(addSearchQuery("terms", e));
        action.then(() => props.handleSearch())
    }}
  />
  </div>
));
