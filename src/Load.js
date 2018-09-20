import React from 'react'
import Loader from 'react-loader-spinner'

class Load extends React.Component {
  //other logic
  render() {
    return (
      <Loader
        type="ThreeDots"
        color="#17a2b8"
        margin-top="15px"
        height="50"
        width="75"
      />
    );
  }
}

export default Load