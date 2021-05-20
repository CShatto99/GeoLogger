import { FC } from 'react';
import ReactTooltip from 'react-tooltip';
import { useToasts } from 'react-toast-notifications';
import { RiRoadMapFill } from 'react-icons/ri';

type MapActionsProps = {
  markerMode: boolean;
  setMarkerMode: React.MouseEventHandler<SVGElement>;
};

const AddMarker: FC<MapActionsProps> = ({}: MapActionsProps) => {
  const { addToast } = useToasts();

  return (
    <>
      <RiRoadMapFill
        data-tip
        data-for="marker-action"
        onClick={() =>
          addToast(<div>hello</div>, {
            appearance: 'info',
            autoDismiss: true,
          })
        }
      />
      <ReactTooltip id="marker-action" aria-haspopup="true">
        <small>Add a Marker</small>
      </ReactTooltip>
    </>
  );
};

export default AddMarker;
