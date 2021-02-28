import styled, { keyframes } from "styled-components";

const Loader = styled.div`
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3em;
`;

const animation = keyframes`
  0%, 100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(1800deg);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  100% {
    transform: rotateY(3600deg);
  }
`;

const LoadingAnimation = styled.div`
display: inline-block;
transform: translateZ(1px);
  animation: ${animation} 5s linear infinite;
  div {
    display: inline-block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  background: #fff;
  animation: lds-circle 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
    }
    :nth-child(2) {
      top: 8px;
      left: 32px;
      animation-delay: -0.4s;
    }
    :nth-child(3) {
      top: 8px;
      left: 56px;
      animation-delay: -0.8s;
    }
    :nth-child(4) {
      top: 32px;
      left: 8px;
      animation-delay: -0.4s;
    }
    :nth-child(5) {
      top: 32px;
      left: 32px;
      animation-delay: -0.8s;
    }
    :nth-child(6) {
      top: 32px;
      left: 56px;
      animation-delay: -1.2s;
    }
    :nth-child(7) {
      top: 56px;
      left: 8px;
      animation-delay: -0.8s;
    }
    :nth-child(8) {
      top: 56px;
      left: 32px;
      animation-delay: -1.2s;
    }
    :nth-child(9) {
      top: 56px;
      left: 56px;
      animation-delay: -1.6s;
    }
  }
`;

export default function Loading() {
  return (
    <Loader>
      <LoadingAnimation>
        <div></div>
      </LoadingAnimation>
    </Loader>
  );
}
