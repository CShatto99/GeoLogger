import { FC, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import { RiRoadMapFill } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '../../../store';
import { updateMapActionStatus } from '../../../store/profile';
import GLTooltip from '../../GLTooltip';

const AddMarker: FC = () => {
  const dispatch = useAppDispatch();
  const {
    profile: { markers },
    actionsStatus,
  } = useAppSelector((state) => state.profile);
  const { addToast, removeToast } = useToasts();

  useEffect(() => {
    !actionsStatus[1] && removeToast('add-marker');
  }, [markers, actionsStatus]);

  const showToast = () => {
    dispatch(updateMapActionStatus([false, true, false, false]));
    addToast(
      <>
        <div>
          Click anywhere on the map to add a marker!{' '}
          <span style={{ fontWeight: 600 }}>Once a marker is placed on the map it can not be moved.</span>
        </div>
      </>,
      {
        id: 'add-marker',
        appearance: 'info',
      },
    );
  };

  return (
    <>
      <GLTooltip content="Add Marker">
        <RiRoadMapFill onClick={() => showToast()} />
      </GLTooltip>
    </>
  );
};

export default AddMarker;
