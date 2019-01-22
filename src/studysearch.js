import React from 'react';

import Select from 'react-select';
import { studyDirection, lawAndEconomy, teaching, stem, naturalScience, socialStudies, mediaStudies, medicalStudies, artStudies, languageStudies, agriculturalStudies } from '../data';
import { addSearchQuery} from "./actions"
import { connect } from 'react-redux';

const MyComponent = () => (
  <Select options={studyDirection} />
)

//  In case I make hte query safe feature:
// 1. Include id and main topic in option Object in data
// 2. built data flow ending in defaultValue={lawAndEconomy[1]}
export default connect()((props) => (
    <div>
    <div className="input-title">Study:</div>
  <Select

    isMulti
    name="colors"
    options={studyDirection}
    className="basic-multi-select"
    classNamePrefix="select"

    onChange = {(e) =>
        {
            const action = props.dispatch(addSearchQuery("study", e));
        // action.then(() => props.handleSearch())
    }}
  />
  </div>
));
