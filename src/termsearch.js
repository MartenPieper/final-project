import React from 'react';

import Select from 'react-select';
import { colourOptions, groupedOptions, flavourOptions } from '../data';

const MyComponent = () => (
  <Select options={options} />
)


export default () => (
    <div>
    <div>StudySearch</div>
  <Select

    isMulti
    name="colors"
    options={groupedOptions}
    className="basic-multi-select"
    classNamePrefix="select"
  />
  </div>
);
