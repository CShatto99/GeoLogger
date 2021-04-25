import React from "react";

const MapType = ({
  selectedMapStyle,
  setSelectedMapStyle,
  mapTitle,
  image,
}) => {
  const mapStyle = mapTitle.replace(" ", "-").toLowerCase();

  return (
    <div className="md:col-span-1 sm:col-span-2">
      <label className={selectedMapStyle === mapStyle ? "font-bold" : ""}>
        {mapTitle}
      </label>
      <img
        className={
          selectedMapStyle === mapStyle ? "cust-img-active" : "cust-img"
        }
        src={image}
        alt={`mapbox ${selectedMapStyle} theme`}
        onClick={setSelectedMapStyle}
        //
      />
    </div>
  );
};

export default MapType;
