const MaxMind =require('maxmind');

const geoLookUp=MaxMind.openSync(ROOT_PATH +'/resources/maxmind.mmdb');

const EmptyLocation={
    city: "",
    province: "",
    country:  "",
    continent: "",
    latitude: "",
    longitude: "",
    postalCode: "",
}

module.exports=function(ipAddress){
    const location = geoLookUp.get(ipAddress);
    if(!location){
        return EmptyLocation;
    }
    //TODO: add better checks
    let normalizedData={
        city: location.city?location.city.names.en : "",
        province: location.subdivisions && location.subdivisions[0] ? location.subdivisions[0].names.en:"",
        country: location.registered_country.names.en,
        continent: location.continent?location.continent.names.en:"",
        latitude: location.location.latitude,
        longitude: location.location.longitude,
        postalCode: location.postal? location.postal.code :""
    }
    return normalizedData
}