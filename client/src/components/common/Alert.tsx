import { FC } from 'react';
import styled from 'styled-components';
import { IoCloseSharp } from 'react-icons/io5';
import { useAppDispatch } from '../../store';
import { clearAlert } from '../../store/alert';

const AlertContainer = styled.div`
  & > .active {
    visibility: visible;
    opacity: 1;
    height: 1rem;
    transition: all 150ms linear;
    position: relative;
  }
`;

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
  visibility: hidden;
  opacity: 0;
  height: 0;
  transition: visibility 0s all 150ms linear;
  position: absolute;

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

  return (
    <AlertContainer>
      {type === 'error' ? (
        <ErrorAlert className={msg ? 'active' : ''}>
          <p>{msg}</p>
          <IoCloseSharp onClick={() => dispatch(clearAlert())} />
        </ErrorAlert>
      ) : (
        <SuccessAlert className={msg ? 'active' : ''}>
          <p>{msg}</p>
          <IoCloseSharp onClick={() => dispatch(clearAlert())} />
        </SuccessAlert>
      )}
    </AlertContainer>
  );
};

export default Alert;
