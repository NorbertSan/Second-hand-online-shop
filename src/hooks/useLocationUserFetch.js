import { useEffect } from "react";
import axios from "axios";

const useLocationUserFetch = (setValue) => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((geolocation) => {
      const { latitude, longitude } = geolocation.coords;
      const API_URL = `https://api.opencagedata.com/geocode/v1/json?key=${process.env.REACT_APP_GEOCODE_API_KEY}&q=${latitude}+${longitude}&pretty=1&no_annotations=1`;
      axios
        .get(API_URL)
        .then((res) => {
          const {
            city,
            county,
            village,
            country,
          } = res.data.results[0].components;
          const formated = `${city || county || village},${country}`;
          setValue(formated);
        })
        .catch((err) => {
          console.error(err);
          setValue("");
        });
    });
  }, []);
};

export default useLocationUserFetch;
