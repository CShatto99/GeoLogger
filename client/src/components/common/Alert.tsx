import { FC } from 'react';
import styled from 'styled-components';
import { IoCloseSharp } from 'react-icons/io5';
import { useAppDispatch } from '../../store';
import { clearAlert } from '../../store/alert';

const ErrorAlert = styled.div`
  background-color: ${({ theme }) => theme.colors.dangerLight};
  border-radius: 0.3rem;
  border: 1px solid ${({ theme }) => theme.colors.danger};
  margin-top: 0.5rem;
  padding: 0.3rem;
  color: ${({ theme }) => theme.colors.black};
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > p {
  }
  & svg {
    cursor: pointer;
  }
`;

const SuccessAlert = styled(ErrorAlert)`
  background-color: ${({ theme }) => theme.colors.successLight};
  border: 1px solid ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.black};
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
