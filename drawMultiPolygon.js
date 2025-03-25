

function drawMultiPolygon(b_, feature_, obj_) {
  
  let zoomLevel = 2;
  let points = [];

  let xmin = 99999;
  let xmax = -9999;
  let ymin = 99999;
  let ymax = -9999;
  
  let coordinates = feature_["geometry"]["coordinates"];

  for (let i = 0; i < coordinates.length; i++) {

    points[i] = [];
    for (let j = 0; j < coordinates[i][0].length; j++) {
      let x = mercX(lon_=coordinates[i][0][j][0], zoomx_=zoomLevel);
      let y = mercY(lat_=coordinates[i][0][j][1], zoomy_=zoomLevel);
      points[i].push({
        "x":x,
        "y":y
      });
    } // closing j-loop
  } // closing i-loop
  
  b_.LINE_WIDTH(obj_.LINE_WIDTH);
  b_.FILL_STYLE(obj_.FILL_STYLE);
  b_.STROKE_STYLE(obj_.STROKE_STYLE);
  for (let i = 0; i < points.length; i++) {
    b_.SHAPE(points[i]);
  }
  return;
}; // closing fn
