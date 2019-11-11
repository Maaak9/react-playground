import React from "react";
import styled from 'styled-components'

const FooterContainer = styled.div`
  min-height: 100px;
  width: 100%;
  background: #80B7A7;
`;


class Footer extends React.Component {
  render() {
    return (
      <FooterContainer>
        <div className="container-fluid">
          <div className="row">
            {this.props.children}
          </div>
        </div>
      </FooterContainer>
    );
  }
}

export default Footer;
