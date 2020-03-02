export default city => {
    return fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURI(city) + '&key=AIzaSyDpsotBbYYEPvmJA9z6BG6PlHjwIBkvqSs')
        .then((response) => response.json())
        .then((responseJSON) => {
            if (responseJSON.results && responseJSON.results[0]) {
                return {
                    city: city,
                    location: [responseJSON.results[0].geometry.location.lat, responseJSON.results[0].geometry.location.lng]
                };
            }
            return null;
        })
        .catch(function (e) { console.error(e); });
};
