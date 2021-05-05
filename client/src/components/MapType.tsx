import { FC } from 'react';

type MapTypeProps = {
  selectedMapStyle: string;
  setSelectedMapStyle: () => void;
  mapTitle: string;
  image: string;
};

const MapType: FC<MapTypeProps> = ({ selectedMapStyle, setSelectedMapStyle, mapTitle, image }: MapTypeProps) => {
  const mapStyle = mapTitle.replace(' ', '-').toLowerCase();

  return (
    <div className="md:col-span-1 sm:col-span-2">
      <label className={selectedMapStyle === mapStyle ? 'font-bold' : ''}>{mapTitle}</label>
      <img
        className={selectedMapStyle === mapStyle ? 'cust-img-active' : 'cust-img'}
        src={image}
        alt={`mapbox ${selectedMapStyle} theme`}
        onClick={setSelectedMapStyle}
      />
    </div>
  );
};

export default MapType;
