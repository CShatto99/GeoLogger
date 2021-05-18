import { FC } from 'react';
import styled from 'styled-components';

const CardSelectedStyle = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.dark};
  border-radius: 50%;
  width: 12px;
  height: 12px;
  padding: 0.1rem;

  & > div {
    opacity: 0;
    transition: all 100ms ease-out;
  }

  & > .item-active {
    opacity: 1;
    transition: all 100ms ease-in;
  }
`;

const IsSelected = styled.div`
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.success};
  height: 100%;
`;

type CardSelectedProps = {
  active: boolean;
};

const CardSelected: FC<CardSelectedProps> = ({ active }: CardSelectedProps) => {
  return (
    <CardSelectedStyle>
      <IsSelected className={active ? 'item-active' : undefined} />
    </CardSelectedStyle>
  );
};

export default CardSelected;
