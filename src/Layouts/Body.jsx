import React from "react";
import styled from 'styled-components'

const BodyWrapper = styled.div`
  color: black;
  padding-top: 50px;
  background: green;
  max-width: 1200px;
  margin: auto;`


class Body extends React.Component {
  render() {
    return (
      <BodyWrapper>
        <div className="container-fluid">
          <div className="row">
            {this.props.children}
          </div>
        </div>
      </BodyWrapper>
    );
  }
}

export default Body;
