import React from "react";

const CaptainDetails = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            className="h-14 w-14 rounded-full object-cover border-2 border-gray-200"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"
            alt=""
          />

          <div>
            <h4 className="text-lg font-semibold">Rolder Decosta</h4>
            <p className="text-sm text-gray-500">Captain</p>
          </div>
        </div>

        <div className="text-right">
          <h2 className="text-2xl font-bold">₹1095.20</h2>

          <p className="text-green-600 font-medium">Today's Earnings</p>
        </div>
      </div>

      {/* Stats Card */}

      <div className="bg-gray-100 rounded-2xl p-5 mt-6">
        <div className="flex justify-between">
          <div className="flex flex-col items-center">
            <i className="ri-timer-2-line text-3xl mb-2"></i>

            <h5 className="font-semibold text-lg">10.5</h5>

            <p className="text-sm text-gray-500">Hours Online</p>
          </div>

          <div className="flex flex-col items-center">
            <i className="ri-speed-up-line text-3xl mb-2"></i>

            <h5 className="font-semibold text-lg">42 KM</h5>

            <p className="text-sm text-gray-500">Distance</p>
          </div>

          <div className="flex flex-col items-center">
            <i className="ri-booklet-line text-3xl mb-2"></i>

            <h5 className="font-semibold text-lg">8</h5>

            <p className="text-sm text-gray-500">Trips</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaptainDetails;
