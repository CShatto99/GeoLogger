import React, { FC } from 'react';
import { MarkerType } from '../../store/types';
import GeoLoggerMarker from './GeoLoggerMarker';

type MarkersProps = {
  markers: MarkerType[];
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Markers: FC<MarkersProps> = ({ markers }: MarkersProps) => {
  console.log(markers);

  return (
    <>
      {markers.map((m, index) => (
        <GeoLoggerMarker {...m} key={index} />
      ))}
    </>

    // return markers.map((m, index) => (
    //   <React.Fragment key={index}>
    //     <div onClick={() => handleMarkerClick(index)}>
    //       {m.title && (
    //         <ReactTooltip id={`marker-${index}`} aria-haspopup="true">
    //           {m.title}
    //         </ReactTooltip>
    //       )}

    //       <Marker
    //         {...m}
    //         offsetLeft={-23}
    //         offsetTop={-23}
    //         draggable
    //         onDragEnd={({ lngLat }) => handleMarkerDrag(lngLat, index)}
    //       >
    //         <i className="gen-btn fa fa-globe" aria-hidden="true" data-tip data-for={`marker-${index}`}>
    //           <div className="navbrand-icon" id="marker" />
    //         </i>
    //       </Marker>
    //     </div>
    //     {/* {markers[index].open && (
    //       <Popup
    //         {...m}
    //         tipSize={10}
    //         anchor="bottom"
    //         closeButton={false}
    //         closeOnClick={false}
    //         offsetTop={-10}
    //         onClose={() => handleMarkerClick(index)}
    //       >
    //         <MarkerPopup
    //           index={index}
    //           marker={m}
    //           setMarkers={setMarkers}
    //           setMarkersEdited={() => {
    //             setMarkersEdited(true);
    //           }}
    //         />
    //       </Popup>
    //     )} */}
    //   </React.Fragment>
    // ));
  );
};

export default React.memo(Markers);
