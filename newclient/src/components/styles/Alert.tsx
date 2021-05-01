import { FC } from 'react';
import styled from 'styled-components';
import { IoCloseSharp } from 'react-icons/io5';
import { useAppDispatch } from '../../store';
import { clearAlert } from '../../store/alert';

const ErrorAlert = styled.div`
  background-color: #feb2b2;
  border-radius: 0.3rem;
  border: 1px solid ${({ theme }) => theme.colors.dangerDark};
  margin-top: 0.5rem;
  padding: 0.25rem;
  color: ${({ theme }) => theme.colors.dangerDark};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & svg {
    cursor: pointer;
  }
`;

const SuccessAlert = styled(ErrorAlert)`
  background-color: ${({ theme }) => theme.colors.success};
  border: 1px solid ${({ theme }) => theme.colors.successDark};
  color: ${({ theme }) => theme.colors.successDark};
`;

type AlertProps = {
  type: 'error' | 'success';
  msg: string;
};

const Alert: FC<AlertProps> = ({ type, msg }: AlertProps) => {
  const dispatch = useAppDispatch();

  return type === 'error' ? (
    <ErrorAlert>
      <p>{msg}</p>
      <IoCloseSharp onClick={() => dispatch(clearAlert())} />
    </ErrorAlert>
  ) : (
    <SuccessAlert>
      <p>{msg}</p>
      <IoCloseSharp onClick={() => dispatch(clearAlert())} />
    </SuccessAlert>
  );
};

export default Alert;
