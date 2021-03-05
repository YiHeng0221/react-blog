import styled from "styled-components";
import React from "react";

const FooterContainer = styled.div`
  width: 100%;
  border-top: 2px solid #e8e8e8;
  position: fixed;
  bottom: 0;
  padding: 0.5em;
  background-color: white;
`;
const FooterWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1080px;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const FooterText = styled.span`
  font-size: 8px;
  letter-spacing: 1px;
  text-decoration: none;
  color: #495464;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterText href="https://github.com/YiHeng0221">
          © 2021 YiHeng Powered by React
        </FooterText>
      </FooterWrapper>
    </FooterContainer>
  );
}
