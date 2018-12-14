import React from 'react';

import Select from 'react-select';
import { studyDirection, lawAndEconomy, teaching } from '../data';

const MyComponent = () => (
  <Select options={studyDirection} />
)


export default () => (
    <div>
    <div>StudySearch</div>
  <Select

    isMulti
    name="colors"
    options={studyDirection}
    className="basic-multi-select"
    classNamePrefix="select"
  />
  </div>
);
