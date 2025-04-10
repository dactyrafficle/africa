
function drawFeature(b_, feature_, isCurrentFeature=false, zoomLevel) {

  // console.log(isCurrentFeature);
  
  if (feature_["geometry"]["type"] == "Point") {
    
    let fPropType = feature_["properties"]["TYPE"];
    
    if (fPropType == "Outline") {
      drawPoint(b_, feature_, obj_={
        "LINE_WIDTH":2,
        "FILL_STYLE":"#000f",
        "STROKE_STYLE":"#000f"
      }, zoomLevel);
    }
    
    if (isCurrentFeature) {
      drawPoint(b_, feature_, obj_={
        "LINE_WIDTH":2,
        "FILL_STYLE":"#fc0e",
        "STROKE_STYLE":"#fc0e"
      }, zoomLevel);
      return;
    }
      
    if (feature_["properties"]["TYPE"] == "Location") {
    

      

    }

    drawPoint(b_, feature_, obj_={
      "LINE_WIDTH":2,
      "FILL_STYLE":"#224477aa",
      "STROKE_STYLE":"#0099ff33"
    }, zoomLevel);

  } // closing if-Point
  
  if (feature_["geometry"]["type"] == "LineString") {
    
    let fPropType = feature_["properties"]["TYPE"];
    
    if (fPropType == "Outline") {
      drawLineString(b_, feature_, obj_={
        "LINE_WIDTH":1,
        "FILL_STYLE":"#0000",
        "STROKE_STYLE":"#000f"
      }, zoomLevel);
      return;
    }
    
    if (fPropType == "River") {
    
    if (isCurrentFeature) {
      drawLineString(b_, feature_, obj_={
        "LINE_WIDTH":2,
        "FILL_STYLE":"#fc0e",
        "STROKE_STYLE":"#fc0e"
      }, zoomLevel);
      return;
    }
    
    
      drawLineString(b_, feature_, obj_={
        "LINE_WIDTH":2,
        "FILL_STYLE":"#0066cc55",
        "STROKE_STYLE":"#0066cc55"
      }, zoomLevel);
      return;
    }
    
  } // closing if-LineString
  
  if (feature_["geometry"]["type"] == "Polygon") {
    
    let fPropType = feature_["properties"]["TYPE"];
    
    if (fPropType == "Outline") {
      drawPolygon(b_, feature_, obj_={
        "LINE_WIDTH":1,
        "FILL_STYLE":"#0000",
        "STROKE_STYLE":"#000f"
      }, zoomLevel);
      return;
    }
    
    if (isCurrentFeature) {
      drawPolygon(b_, feature_, obj_={
        "LINE_WIDTH":2,
        "FILL_STYLE":"#fc05",
        "STROKE_STYLE":"#fc07"
      }, zoomLevel); // feature_["geometry"]["defaults"]["zoom"]);
      return;
    }
    
    // let fPropType = feature_["properties"]["TYPE"];
    if (fPropType == "Lake" || fPropType == "Sea") {
      drawPolygon(b_, feature_, obj_={
        "LINE_WIDTH":2,
        "FILL_STYLE":"#0099ff33",
        "STROKE_STYLE":"#0099ff77"
      }, zoomLevel);
      return;
    }
    
    drawPolygon(b_, feature_, obj_={
      "LINE_WIDTH":2,
      "FILL_STYLE":"#0703",
      "STROKE_STYLE":"#0705"
    }, zoomLevel);
    
  } // closing if-Polygon

  if (feature_["geometry"]["type"] == "MultiPolygon") {
  
    if (isCurrentFeature) {
      drawMultiPolygon(b_, feature_, obj_={
        "LINE_WIDTH":2,
        "FILL_STYLE":"#fc07",
        "STROKE_STYLE":"#fc07"
      }, zoomLevel);
      return;
    }
    
    if (feature_["properties"]["TYPE"] == "Lake") {
      drawMultiPolygon(b_, feature_, obj_={
        "LINE_WIDTH":2,
        "FILL_STYLE":"#0099ff33",
        "STROKE_STYLE":"#0099ff33"
      }, zoomLevel);
      return;
    }

    drawMultiPolygon(b_, feature_, obj_={
      "LINE_WIDTH":2,
      "FILL_STYLE":"#0703",
      "STROKE_STYLE":"#0705"
    }, zoomLevel);
    
  }
  
}; // closing fn