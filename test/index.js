import React from 'react';
import { render } from 'react-dom';
import CustomFieldMaker from '../src/';
import '../src/css/custom-field-maker.css';

render(
  <CustomFieldMaker />,
  document.getElementById('app'),
);