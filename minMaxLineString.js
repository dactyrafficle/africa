

function minMaxLineString(feature_) {
  
  let zoomLevel = 2;

  feature_.xmin = 99999;
  feature_.xmax = -9999;
  feature_.ymin = 99999;
  feature_.ymax = -9999;
  
  let coordinates = feature_["geometry"]["coordinates"];

  for (let i = 0; i < coordinates.length; i++) {
    let x = mercX(lon_=coordinates[i][0], zoomx_=zoomLevel);
    let y = mercY(lat_=coordinates[i][1], zoomy_=zoomLevel);
    if (x > feature_.xmax) {feature_.xmax = x;}
    if (x < feature_.xmin) {feature_.xmin = x;}
    if (y > feature_.ymax) {feature_.ymax = y;}
    if (y < feature_.ymin) {feature_.ymin = y;}
  } // closing i-loop
  
  // console.log(points);
  
  feature_.xspan = feature_.xmax - feature_.xmin;
  feature_.yspan = feature_.ymax - feature_.ymin;
  feature_.xbuffer = 0;
  feature_.ybuffer = 0;
   
  if (feature_.xspan > feature_.yspan) {
    feature_.xbuffer = feature_.xspan*0.2;
    feature_.ybuffer = feature_.xspan*1.2 - feature_.yspan;
  }
  
  if (feature_.xspan <= feature_.yspan) {
    feature_.ybuffer = feature_.yspan*0.2;
    feature_.xbuffer = feature_.yspan*1.2 - feature_.xspan;
  }
  
  feature_.xDisplayRangeMin = feature_.xmin - feature_.xbuffer;
  feature_.xDisplayRangeMax = feature_.xmax + feature_.xbuffer;
  feature_.yDisplayRangeMin = feature_.ymin - feature_.ybuffer;
  feature_.yDisplayRangeMax = feature_.ymax + feature_.ybuffer;

  return;
}; // closing fn