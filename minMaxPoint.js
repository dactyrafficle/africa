

function minMaxPoint(feature_) {
  let zoomLevel = feature_["zoomLevel"];
  let coordinates = feature_["geometry"]["coordinates"];
  let x = mercX(lon_=coordinates[0], zoomx_=zoomLevel);
  let y = mercY(lat_=coordinates[1], zoomy_=zoomLevel);
  feature_.xmin = x;
  feature_.xmax = x;
  feature_.ymin = y;
  feature_.ymax = y;
  
  let obj = {
    "lon_min":coordinates[0],
    "lon_max":coordinates[0],
    "lat_min":coordinates[1],
    "lat_max":coordinates[1]
  };
  
  obj.clon = (obj.lon_max + obj.lon_min)/2;
  obj.clat = (obj.lat_max + obj.lat_min)/2;
  return obj;
}; // closing fn