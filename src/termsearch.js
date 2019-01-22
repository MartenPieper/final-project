import React from 'react';

import Select from 'react-select';
import { terms, art, career, cars, environment, education } from '../data';
import { addSearchQuery} from "./actions"
import { connect } from 'react-redux';


const MyComponent = () => (
  <Select options={terms} />
)


export default connect()((props) => (
    <div>
    <div className="input-title">Topic:</div>
  <Select

    isMulti
    name="colors"
    options={terms}
    className="basic-multi-select"
    classNamePrefix="select"
    onChange = {(e) =>
        {
            const action = props.dispatch(addSearchQuery("terms", e));
        // action.then(() => props.handleSearch())
    }}
  />
  </div>
));
