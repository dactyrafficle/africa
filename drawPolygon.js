function drawPolygon(b_, feature_, obj_) {
  
  let zoomLevel = 2;
  let points = [];
  let coordinates = feature_["geometry"]["coordinates"][0];

  for (let i = 0; i < coordinates.length; i++) {
    let x = mercX(lon_=coordinates[i][0], zoomx_=zoomLevel);
    let y = mercY(lat_=coordinates[i][1], zoomy_=zoomLevel);
    points.push({
      "x":x,
      "y":y
    });
  } // closing i-loop

  b_.LINE_WIDTH(obj_.LINE_WIDTH);
  b_.FILL_STYLE(obj_.FILL_STYLE);
  b_.STROKE_STYLE(obj_.STROKE_STYLE);
  b_.SHAPE(points);
  
}; // closing fn