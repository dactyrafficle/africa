function drawPolygon(b_, feature_, obj_, zoomLevel_=2) {
  
  console.log("zoomLevel : " + zoomLevel_);
  
  let points = [];
  let coordinates = feature_["geometry"]["coordinates"][0];

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
  b_.SHAPE(points);
  
}; // closing fn

/*

let zoomLevel_=2.1;



box.CLEAR_CANVAS();
drawAtZoom(zoomLevel_=2.1);
drawAtZoom(zoomLevel_=2.2);
drawAtZoom(zoomLevel_=2.8);

function drawAtZoom(zoomLevel_) {
  
  let pixelWidth = mercX(lon_=-180, zoomx_=zoomLevel_) - mercX(lon_=180, zoomx_=zoomLevel_);
  let pixelHeight = mercY(lat_=89, zoomy_=zoomLevel_) - mercY(lat_=-89, zoomy_=zoomLevel_);

  let boxWidth = b_.data.dimension.w;
  let boxHeight = b_.data.dimension.h;

  let cx = mercX(lon_=26.44587, zoomx_=zoomLevel_);
  let cy = mercY(lat_=-6.00445, zoomy_=zoomLevel_);
    
  let f = features[0];

  
  let K = 9;
  box.RANGE_X(cx-boxWidth/2, cx+boxWidth/2);
  box.RANGE_Y(cy-boxHeight/2, cy+boxHeight/2);

  drawPolygon(b_=box, feature_=f, obj_={"LINE_WIDTH":2,"FILL_STYLE":"#fff0","STROKE_STYLE":"#000f"}, zoomLevel_);

}

*/