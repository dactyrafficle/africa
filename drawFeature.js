
function drawFeature(b_, feature_, selected_=false) {

  // console.log(selected_);
  
  if (feature_["geometry"]["type"] == "Point") {
    
    if (feature_["properties"]["TYPE"] == "Location") {
    
      if (selected_) {
        drawPoint(b_, feature_, obj_={
          "LINE_WIDTH":2,
          "FILL_STYLE":"#fc0e",
          "STROKE_STYLE":"#fc0e"
        });
        return;
      }
      
      drawPoint(b_, feature_, obj_={
        "LINE_WIDTH":2,
        "FILL_STYLE":"#224477aa",
        "STROKE_STYLE":"#0099ff33"
      });
      return;
    }

  } // closing if-Point
  
  if (feature_["geometry"]["type"] == "LineString") {
    
    if (feature_["properties"]["TYPE"] == "River") {
    
    if (selected_) {
      drawLineString(b_, feature_, obj_={
        "LINE_WIDTH":2,
        "FILL_STYLE":"#fc0e",
        "STROKE_STYLE":"#fc0e"
      });
      return;
    }
    
    
      drawLineString(b_, feature_, obj_={
        "LINE_WIDTH":2,
        "FILL_STYLE":"#0066cc55",
        "STROKE_STYLE":"#0066cc55"
      });
      return;
    }
    
  } // closing if-LineString
  
  if (feature_["geometry"]["type"] == "Polygon") {
    
    if (selected_) {
      drawPolygon(b_, feature_, obj_={
        "LINE_WIDTH":2,
        "FILL_STYLE":"#fc05",
        "STROKE_STYLE":"#fc07"
      });
      return;
    }
    
    let fPropType = feature_["properties"]["TYPE"];
    if (fPropType == "Lake" || fPropType == "Sea") {
      drawPolygon(b_, feature_, obj_={
        "LINE_WIDTH":2,
        "FILL_STYLE":"#0099ff33",
        "STROKE_STYLE":"#0099ff77"
      });
      return;
    }
    
    drawPolygon(b_, feature_, obj_={
      "LINE_WIDTH":2,
      "FILL_STYLE":"#0703",
      "STROKE_STYLE":"#0705"
    });
    
  } // closing if-Polygon

  if (feature_["geometry"]["type"] == "MultiPolygon") {
  
    if (selected_) {
      drawMultiPolygon(b_, feature_, obj_={
        "LINE_WIDTH":2,
        "FILL_STYLE":"#fc07",
        "STROKE_STYLE":"#fc07"
      });
      return;
    }
    
    if (feature_["properties"]["TYPE"] == "Lake") {
      drawMultiPolygon(b_, feature_, obj_={
        "LINE_WIDTH":2,
        "FILL_STYLE":"#0099ff33",
        "STROKE_STYLE":"#0099ff33"
      });
      return;
    }

    drawMultiPolygon(b_, feature_, obj_={
      "LINE_WIDTH":2,
      "FILL_STYLE":"#0703",
      "STROKE_STYLE":"#0705"
    });
    
  }
  
}; // closing fn