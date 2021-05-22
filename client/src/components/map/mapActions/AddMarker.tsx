import { FC, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { useToasts } from 'react-toast-notifications';
import { RiRoadMapFill } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '../../../store';
import { updateMapActionStatus } from '../../../store/profile';
// import isActionActive from '../../../utils/isActionActive';

type MapActionsProps = {
  markerMode: boolean;
  setMarkerMode: React.MouseEventHandler<SVGElement>;
};

const AddMarker: FC<MapActionsProps> = ({}: MapActionsProps) => {
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
    addToast(<div>Click anywhere on the map to add a marker!</div>, {
      id: 'add-marker',
      appearance: 'info',
      autoDismiss: actionsStatus[1],
    });
  };

  return (
    <>
      <RiRoadMapFill data-tip data-for="marker-action" onClick={() => showToast()} />
      <ReactTooltip id="marker-action" aria-haspopup="true">
        <small>Add a Marker</small>
      </ReactTooltip>
    </>
  );
};

export default AddMarker;
