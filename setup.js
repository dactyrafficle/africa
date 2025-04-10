

let ANIMATION;

let box = new Box();
let ctr;             // the container containing the box object
let features;        // an array of all features
let currentFeature;       // current feature
let indices = [];    // an array of all remaining indices left to choose from
let index;           // the current index

// phase is TRUE/FALSE.
// false means next click will "change picture and hide name"
// true means next click will "show name"
let phase = false;
      
let box_width;
let box_height;
let maxResizeWidth = 700;
    
window.addEventListener("load", function() {
  
  /*
  myPauseBtn.addEventListener("click", function() {
    window.clearInterval(ANIMATION);
  });
  */
  
  window.addEventListener("resize", function() {
    
    console.log(window.innerWidth);
    
    if (window.innerWidth < maxResizeWidth) {
      programmingCommentsEl.style.display = "none";
      myFeatureList.style.display = "none";
      box_width = window.innerWidth*0.95;
      box_height = window.innerWidth*0.95;
      box.RESIZE(box_width, box_height);
      REDRAW_CURRENT_FEATURE();
    }
    if (window.innerWidth > maxResizeWidth) {
      programmingCommentsEl.style.display = "block";
      myFeatureList.style.display = "block";
    }
    
  }); // closing onresize
  
  fetch("./africa.geojson?x="+Math.random())
  .then(r=>r.json())
  .then(FeatureCollection=>{
    
    //console.log(FeatureCollection);
    
    features = FeatureCollection.features;
    indices = features.map((x, i) => i);
    shuffle(indices);
    console.log("START");
    console.log(indices);
    
    // essential part of initialization
    for (let i = 0; i < features.length; i++) {  
      addGeometryMinMax(feature_=features[i]);
    }
    
    // START THE SIDEBAR
    for (let i = 0; i < features.length; i++) {
      
      let featureName = features[i]["properties"]["NAME"];
      let div = document.createElement("div");
      div.innerHTML = featureName;
      
      div.style.cursor = "default";
      div.style.padding = "5px";
      if (i%2 == 0) {
        div.style.backgroundColor = "#2473";
      }
      myFeatureList.appendChild(div);
        
      div.addEventListener("click", function() {
        
        currentFeature = features.filter(f => f["properties"]["NAME"] === featureName)[0];
        console.log(currentFeature);
        
        CALC_RANGES();
        box.CLEAR_CANVAS();
        REDRAW_CURRENT_FEATURE();

        // reveal the name
        geometryNameOutputEl.innerHTML = featureName;

        // set phase to false, so next click will get a new picture, and hide name
        phase = false;

      }); // closing onclick
        
    } // closing i-loop
    
    
    if (window.innerWidth < maxResizeWidth) {
      myFeatureList.style.display = "none";
      programmingCommentsEl.style.display = "none";
      box_width = window.innerWidth*0.95;
      box_height = window.innerWidth*0.95;
    }

    if (window.innerWidth > maxResizeWidth) {
      programmingCommentsEl.style.display = "block";
      myFeatureList.style.display = "block";
      box_width = maxResizeWidth; // window.innerWidth*0.4;
      box_height = maxResizeWidth; // window.innerWidth*0.4;
    }

    // END OF SIDEBAR
    
    ctr = box.RETURN_CONTAINER();
    ctr.style.margin = "0px";
    
    container.appendChild(ctr);
    container.style.padding = "0px";

    index = indices.splice(0,1)[0];
    currentFeature = features[index];
    
    /*
    let name = (Math.random() > 0.5 ? "Khartoum" : "Grand Ethiopian Renaissance Dam");
    currentFeature = features.filter(f => f["properties"]["NAME"] === name)[0];
    */
    
    box.RESIZE(box_width, box_height);
    CALC_RANGES();
    box.CLEAR_CANVAS();
    REDRAW_CURRENT_FEATURE();
    
    geometryNameOutputEl.innerHTML = "?";
    phase = true;  // means next click will "show name"
    
    ctr.addEventListener("click", abc); // closing fn
      
     /*
     ANIMATION = window.setInterval(function(){
       abc();
     }, 1000);
     */
     
    function abc() {

      // if phase is true, then we show name, and thats it
      if (phase) {
        geometryNameOutputEl.innerHTML = currentFeature["properties"]["NAME"];
        phase = false;
        return;
      }

      // if phase is false, then we need to "change the picture, and hide the name"
      console.log(indices.length);

      // if there are no more names to pick, then reset the list
      if (indices.length == 0) {
        indices = features.map((x, i) => i);
        shuffle(indices);
        console.log("restart");
        console.log(indices);
      }

      // pick a new feature to draw
      index = indices.splice(0,1)[0];
      currentFeature = features[index];

      CALC_RANGES();
      box.CLEAR_CANVAS();
      REDRAW_CURRENT_FEATURE();
      
      // hide the name
      geometryNameOutputEl.innerHTML = "?";
      
      // set phase to true, so next click will be to reveal the name
      phase = true;
    }; // closing abc

  }); // closing then-2

}); // closing onload




function CALC_RANGES() {
  
  let displayRange = {
    "xmin":currentFeature.xmin,
    "xmax":currentFeature.xmax,
    "ymin":currentFeature.ymin,
    "ymax":currentFeature.ymax
  };
  // console.log(displayRange);

  let parents = currentFeature["properties"]["PARENTS"];

  for (let i = 0; i < parents.length; i++) {
    let parent = parents[i];
    let parentFeature = features.filter(item => item["properties"]["NAME"] === parent)[0];
    if (parentFeature.xmax > displayRange.xmax) {displayRange.xmax = parentFeature.xmax;}
    if (parentFeature.xmin < displayRange.xmin) {displayRange.xmin = parentFeature.xmin;}
    if (parentFeature.ymax > displayRange.ymax) {displayRange.ymax = parentFeature.ymax;}
    if (parentFeature.ymin < displayRange.ymin) {displayRange.ymin = parentFeature.ymin;}
  }

  displayRange.xspan = displayRange.xmax - displayRange.xmin;
  displayRange.yspan = displayRange.ymax - displayRange.ymin;

  displayRange.xbuffer = 0;
  displayRange.ybuffer = 0;
   
  if (displayRange.xspan > displayRange.yspan) {
    displayRange.xbuffer = displayRange.xspan*0.2;
    displayRange.ybuffer = displayRange.xspan*1.2 - displayRange.yspan;
  }

  if (displayRange.xspan <= displayRange.yspan) {
    displayRange.ybuffer = displayRange.yspan*0.2;
    displayRange.xbuffer = displayRange.yspan*1.2 - displayRange.xspan;
  }

  displayRange.xDisplayRangeMin = displayRange.xmin - displayRange.xbuffer/2;
  displayRange.xDisplayRangeMax = displayRange.xmax + displayRange.xbuffer/2;
  displayRange.yDisplayRangeMin = displayRange.ymin - displayRange.ybuffer/2;
  displayRange.yDisplayRangeMax = displayRange.ymax + displayRange.ybuffer/2;

  box.RANGE_X(displayRange.xDisplayRangeMin, displayRange.xDisplayRangeMax);
  box.RANGE_Y(displayRange.yDisplayRangeMin, displayRange.yDisplayRangeMax);
  
}; // closing fn


function REDRAW_CURRENT_FEATURE() {
  
  let zoomLevel = currentFeature["geometry"]["defaults"]["zoom"];
  console.log(zoomLevel);
  
  let cx = mercX(lon_=currentFeature.geometry.defaults.center[0], zoomx_=currentFeature.geometry.defaults.zoom);
  let cy = mercY(lat_=currentFeature.geometry.defaults.center[1], zoomy_=currentFeature.geometry.defaults.zoom);
  
  console.log([cx,cy]);
  
  let pixelWidth = mercX(lon_=-180, zoomx_=zoomLevel) - mercX(lon_=180, zoomx_=zoomLevel);
  let pixelHeight = mercY(lat_=89, zoomy_=zoomLevel) - mercY(lat_=-89, zoomy_=zoomLevel);
  
  let boxWidth = box.data.dimension.w;
  let boxHeight = box.data.dimension.h;
  
  box.RANGE_X(cx-boxWidth/2, cx+boxWidth/2);
  box.RANGE_Y(cy-boxHeight/2, cy+boxHeight/2);
  
  box.RADIUS(3);
  box.POINT({
    "x":cx,
    "y":cy
  });
  /*
  box.CONNECT_VALUES([
    {"x":box.data.range.x.min,"y":cy},
    {"x":box.data.range.x.max,"y":cy}
  ]);
  */
  
  /*
  box.CONNECT_VALUES([
    {"x":cx,"y":box.data.range.y.min},
    {"x":cx,"y":box.data.range.y.max}
  ]);
  */
  
  /*
  box.RANGE_X( mercX(lon_=-180, zoomx_=zoomLevel), mercX(lon_=180, zoomx_=zoomLevel) );
  box.RANGE_Y( mercY(lat_=-89, zoomy_=zoomLevel), mercY(lat_=89, zoomy_=zoomLevel) );
  console.log("x : " + box.data.range.x.min + " : " + box.data.range.x.max);
  console.log("y : " + box.data.range.y.min + " : " + box.data.range.y.max);
  */
  
  // ADD OUTLINE OF AFRICA
  africaOutline = features.filter(f => f["properties"]["NAME"] === "Africa_Outline")[0];
  drawFeature(b_=box, feature_=africaOutline, isCurrentFeature=false, zoomLevel_=zoomLevel);
  
  // ADD EQUATOR
  equatorOutline = features.filter(f => f["properties"]["NAME"] === "Equator")[0];
  drawFeature(b_=box, feature_=equatorOutline, isCurrentFeature=false, zoomLevel_=zoomLevel);
  
  // ADD ZEROZERO
  zeroZero = features.filter(f => f["properties"]["NAME"] === "ZeroZero")[0];
  drawFeature(b_=box, feature_=zeroZero, isCurrentFeature=false, zoomLevel_=zoomLevel);
  
  let parents = currentFeature["properties"]["PARENTS"];
  for (let i = 0; i < parents.length; i++) {
    let parentName = parents[i];
    let parentFeature = features.filter(item => item["properties"]["NAME"] === parentName)[0];
    drawFeature(b_=box, feature_=parentFeature, isCurrentFeature=false, zoomLevel_=zoomLevel);
  }
  drawFeature(b_=box, feature_=currentFeature, isCurrentFeature=true, zoomLevel_=zoomLevel);
  
}; // closing fn


function addGeometryMinMax(feature_) {
  
  if (feature_["geometry"]["type"] == "Polygon") {
    minMaxPolygon(feature_);
  } // closing if-Polygon
  
  if (feature_["geometry"]["type"] == "MultiPolygon") {
    minMaxMultiPolygon(feature_);
  }
  
  if (feature_["geometry"]["type"] == "Point") {
    minMaxPoint(feature_);
  }

  if (feature_["geometry"]["type"] == "LineString") {
    minMaxLineString(feature_);
  }
  
  // feature_.zoomLevel = 3.1;
  
  // feature_.cx = mercX(lon_=feature_.geometry.defaults.center[0], zoomx_=feature_.geometry.defaults.zoom); // (feature_.xmax - feature_.xmin)/2;
  // feature_.cy = mercY(lat_=feature_.geometry.defaults.center[1], zoomy_=feature_.geometry.defaults.zoom); // (feature_.ymax - feature_.ymin)/2;
  
  
}; // closing fn


function shuffle(array) {
  
  let currentIndex = array.length;

  while (currentIndex != 0) {

    let randomIndex = Math.floor(Math.random()*currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ];
  }
};