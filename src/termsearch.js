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
    <div>StudySearch</div>
  <Select

    isMulti
    name="colors"
    options={groupedOptions}
    className="basic-multi-select"
    classNamePrefix="select"
    onChange = {e => (props.dispatch(addSearchQuery("study", e)))}
  />
  </div>
));
