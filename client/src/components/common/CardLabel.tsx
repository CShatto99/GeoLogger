import { FC } from 'react';
import styled from 'styled-components';
import CardSelected from './CardSelected';

const CardLabelContainer = styled.div`
  & > .item-active {
    border: 2px solid ${({ theme }) => theme.colors.success};
  }
`;

const CardLabelContent = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.white};
  box-shadow: 0px 1px 5px -1px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  border-radius: 0.3rem 0.3rem 0 0;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 100ms ease-in;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    & > p {
      font-size: 14px;
    }
  }
`;

type CardLabelProps = {
  label: React.ReactNode | string;
  active: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  // children?: React.ReactNode;
};

const CardLabel: FC<CardLabelProps> = ({ label, active, onClick }: CardLabelProps) => {
  return (
    <CardLabelContainer>
      <CardLabelContent onClick={onClick} className={active ? 'item-active' : undefined}>
        <p>{label}</p>
        <CardSelected active={active} />
      </CardLabelContent>
    </CardLabelContainer>
  );
};

export default CardLabel;
