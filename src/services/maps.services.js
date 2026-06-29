import axios from "axios";

const getAddressCoordinate = async (address) => {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      address
    )}&format=jsonv2&limit=1`;

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Uber-Clone/1.0",
      },
    });
    console.log(data);
    console.log(data.features);
    if (!data.length) {
      throw new Error("Address not found");
    }

    return {
      lat: Number(data[0].lat),
      lng: Number(data[0].lon),
    };
  } catch (error) {
    throw error;
  }
};

const getDistanceTime = async (origin, destination) => {
  try {
    const originCoordinate = await getAddressCoordinate(origin);
    const destinationCoordinate = await getAddressCoordinate(destination);

    const url = `https://router.project-osrm.org/route/v1/driving/${originCoordinate.lng},${originCoordinate.lat};${destinationCoordinate.lng},${destinationCoordinate.lat}?overview=false`;

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Uber-Clone/1.0",
      },
    });

    if (!data.routes.length) {
      throw new Error("Route not found");
    }

    return {
      distance: data.routes[0].distance, // meters
      duration: data.routes[0].duration, // seconds
    };
  } catch (error) {
    throw error;
  }
};

const getAutoCompleteSuggestion = async (input) => {
  if (!input) {
    throw new Error("query is required");
  }

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    input
  )}&format=jsonv2&addressdetails=1&limit=5&countrycodes=in`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Uber-Clone/1.0",
      },
    });

    return data.map((place) => ({
      placeId: place.place_id,
      address: place.display_name,
      lat: Number(place.lat),
      lng: Number(place.lon),
    }));
  } catch (error) {
    throw new Error("Unable to fetch suggestions");
  }
};

export { getAddressCoordinate, getDistanceTime, getAutoCompleteSuggestion };
