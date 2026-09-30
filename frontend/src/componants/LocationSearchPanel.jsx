import React from "react";

const LocationSearchPanel = ({
  suggestions,
  activeField,
  setPickup,
  setDestination,
  setPanel,
  setVehiclePanel,
}) => {
  return (
    <div>
      {suggestions.map((location, ind) => (
        <div
          key={location.placeId || ind}
          onClick={() => {
            if (activeField === "pickup") {
              setPickup(location.address);
            } else {
              setDestination(location.address);
            }

            // setPanel(false);
            // setVehiclePanel(true);
          }}
          className="flex gap-4 active:border-2 p-3 rounded-xl my-4 items-center justify-start cursor-pointer"
        >
          <h2 className="bg-gray-100 h-11 w-11 flex items-center justify-center rounded-full text-gray-800 flex-shrink-0">
            <i className="ri-map-pin-2-fill text-lg"></i>
          </h2>

          <h4 className="font-medium">{location.address}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
