import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-native';

const MyButton = ({text, onClick, disabled}) => {
  return <Button onPress={onClick} disabled={disabled} title={text} />;
};

MyButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default MyButton;
