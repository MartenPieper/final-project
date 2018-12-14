import React, { Component } from 'react'
import Select from 'react-select'
import { unis } from "../data"


const MyComponent = () => (
  <Select options={unis} />
)


export default () => (
    <div>
    <div>UniSearch</div>
  <Select

    isMulti
    name="colors"
    options={unis}
    className="basic-multi-select"
    classNamePrefix="select"
  />
  </div>
);
