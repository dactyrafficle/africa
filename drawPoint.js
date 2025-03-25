

function drawPoint(b_, feature_, obj_) {
  
  let zoomLevel = 2;

  let coordinates = feature_["geometry"]["coordinates"];
  let x = mercX(lon_=coordinates[0], zoomx_=zoomLevel);
  let y = mercY(lat_=coordinates[1], zoomy_=zoomLevel);
  
  let point = {
    "x":x,
    "y":y
  };

  b_.LINE_WIDTH(obj_.LINE_WIDTH);
  b_.FILL_STYLE(obj_.FILL_STYLE);
  b_.STROKE_STYLE(obj_.STROKE_STYLE);
  b_.POINT(point);

  return;  
}; // closing fn