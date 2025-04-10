

function drawLineString(b_, feature_, obj_, zoomLevel_=2) {
  
  console.log("zoomLevel : " + zoomLevel_);
  
  let points = [];

  let coordinates = feature_["geometry"]["coordinates"];

  for (let i = 0; i < coordinates.length; i++) {
    let x = mercX(lon_=coordinates[i][0], zoomx_=zoomLevel_);
    let y = mercY(lat_=coordinates[i][1], zoomy_=zoomLevel_);
    points.push({
      "x":x,
      "y":y
    });
  } // closing i-loop

  b_.LINE_WIDTH(obj_.LINE_WIDTH);
  b_.FILL_STYLE(obj_.FILL_STYLE);
  b_.STROKE_STYLE(obj_.STROKE_STYLE);
  b_.CONNECT_VALUES(points);
  return;
}; // closing fn
