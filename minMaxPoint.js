

function minMaxPoint(feature_) {
  let zoomLevel = feature_["zoomLevel"];
  let coordinates = feature_["geometry"]["coordinates"];
  let x = mercX(lon_=coordinates[0], zoomx_=zoomLevel);
  let y = mercY(lat_=coordinates[1], zoomy_=zoomLevel);
  feature_.xmin = x;
  feature_.xmax = x;
  feature_.ymin = y;
  feature_.ymax = y;
  return;  
}; // closing fn