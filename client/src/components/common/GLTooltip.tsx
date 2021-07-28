import { FC, useState } from 'react';
import styled from 'styled-components';

const TooltipWrapper = styled.div`
  display: inline-block;
  z-index: 100;
  position: relative;

  & > .inactive {
    opacity: 0;
    visibility: hidden;
  }

  & > .top {
    top: calc(40px * -1);
  }

  & > .top::before {
    top: 100%;
    border-top-color: black;
  }

  & > .right {
    left: calc(100% + 10px);
    top: 50%;
    transform: translateX(0) translateY(-50%);
  }

  & > .right::before {
    left: calc(6px * -1);
    top: 50%;
    transform: translateX(0) translateY(-50%);
    border-right-color: black;
  }

  & > .bottom {
    bottom: calc(40px * -1);
  }

  & > .bottom::before {
    bottom: 100%;
    border-bottom-color: black;
  }

  & > .left {
    left: auto;
    right: calc(100% + 10px);
    top: 50%;
    transform: translateX(0) translateY(-50%);
  }

  & > .left::before {
    left: auto;
    right: calc(6px * -2);
    top: 50%;
    transform: translateX(0) translateY(-50%);
    border-left-color: black;
  }
`;

const TooltipTip = styled.div`
  position: absolute;
  border-radius: 0.3rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem;
  color: #fff;
  background: #000;
  font-size: 14px;
  font-family: sans-serif;
  line-height: 1;
  z-index: 100;
  transition: all ease-in 100ms;
  white-space: nowrap;

  &::before {
    content: ' ';
    left: 50%;
    border: solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-width: 6px;
    margin-left: calc(6px * -1);
  }
`;

type GLTooltipProps = {
  delay?: number;
  children: React.ReactNode;
  direction?: 'top' | 'right' | 'bottom' | 'left';
  content?: React.ReactNode;
};

const GLTooltip: FC<GLTooltipProps> = ({ delay = 300, children, direction = 'top', content }: GLTooltipProps) => {
  let timeout: NodeJS.Timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <TooltipWrapper onMouseEnter={showTip} onMouseLeave={hideTip}>
      {children}
      <TooltipTip className={`${direction} ${!active ? 'inactive' : null}`}>
        <p>{content}</p>
      </TooltipTip>
    </TooltipWrapper>
  );
};

export default GLTooltip;
