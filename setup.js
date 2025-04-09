


let ANIMATION;

let box = new Box();
let features;
let indices = [];
let index;

window.addEventListener("load", function() {
  
  /*
  myPauseBtn.addEventListener("click", function() {
    window.clearInterval(ANIMATION);
  });
  */
  
  fetch("./africa.geojson?x="+Math.random())
  .then(r=>r.json())
  .then(FeatureCollection=>{
    
    //console.log(FeatureCollection);
    
    features = FeatureCollection.features;
    indices = features.map((x, i) => i);
    shuffle(indices);
    console.log(indices);
    
    
    // START OF SIDEBAR
    
    let box_width;
    let box_height;
    
    for (let i = 0; i < features.length; i++) {
      
      addGeometryMinMax(feature_=features[i]);
     

      

      if (window.innerWidth < 600) {
        myFeatureList.style.display = "none";
        processingLinkEl.style.display = "none";
        box_width = window.innerWidth*0.95;
        box_height = window.innerWidth*0.95;
      }

      if (window.innerWidth > 500) {
      
        box_width = window.innerWidth*0.4;
        box_height = window.innerWidth*0.4;
        
        let div = document.createElement("div");
        div.style.cursor = "default";
        div.style.padding = "5px";
        if (i%2 == 0) {
          div.style.backgroundColor = "#2473";
        }
        myFeatureList.appendChild(div);
        div.innerHTML = features[i]["properties"]["NAME"];
        
        div.addEventListener("click", function() {
           obj = features.filter(f => f["properties"]["NAME"] === features[i]["properties"]["NAME"])[0];
           // console.log(obj);
           abc(obj_=obj);
           geometryNameOutputEl.innerHTML = obj["properties"]["NAME"];
           phase = false;
        }); // closing onclick
        
        
      }

      
    } // closing i-loop

    // END OF SIDEBAR
    
    
    
    let ctr = box.RETURN_CONTAINER();
    container.appendChild(ctr);
    container.style.padding = "0px";
    
    ctr.style.margin = "0px";
    

    box.RESIZE(box_width, box_height);
    
    let phase;



    // index = Math.floor(Math.random()*features.length);
    // let obj = features[index];
    
    index = indices.splice(0,1)[0];
    obj = features[index];
    
    /*
    let name = (Math.random() > 0.5 ? "Khartoum" : "Grand Ethiopian Renaissance Dam");
    obj = features.filter(f => f["properties"]["NAME"] === name)[0];
    */
    
    box.CLEAR_CANVAS();
    
    let parents = obj["properties"]["PARENTS"];
    let displayRange = {
      "xmin":999999,
      "xmax":-99999,
      "ymin":999999,
      "ymax":-99999
    };
    
    for (let i = 0; i < parents.length; i++) {
      let parent = parents[i];
      let parentFeature = features.filter(item => item["properties"]["NAME"] === parent)[0];
      if (parentFeature.xDisplayRangeMax > displayRange.xmax) {displayRange.xmax = parentFeature.xDisplayRangeMax;}
      if (parentFeature.xDisplayRangeMin < displayRange.xmin) {displayRange.xmin = parentFeature.xDisplayRangeMin;}
      if (parentFeature.yDisplayRangeMax > displayRange.ymax) {displayRange.ymax = parentFeature.yDisplayRangeMax;}
      if (parentFeature.yDisplayRangeMin < displayRange.ymin) {displayRange.ymin = parentFeature.yDisplayRangeMin;}
    }
    
    box.RANGE_X(displayRange.xmin, displayRange.xmax);
    box.RANGE_Y(displayRange.ymin, displayRange.ymax);
    
    for (let i = 0; i < parents.length; i++) {
      let parentName = parents[i];
      let parentFeature = features.filter(item => item["properties"]["NAME"] === parentName)[0];
      drawFeature(b_=box, feature_=parentFeature);
    }
    drawFeature(b_=box, feature_=obj, selected_=true);
    
    geometryNameOutputEl.innerHTML = "?";
    phase = true;
    
    ctr.addEventListener("click", function() {

      if (phase) {
        geometryNameOutputEl.innerHTML = obj["properties"]["NAME"];
        phase = false;
        return;
      }
      
      if (indices.length == 0) {
        indices = features.map((x, i) => i);
        shuffle(indices);
        console.log("restart");
      }
      
      index = indices.splice(0,1)[0];
      obj = features[index];



      box.CLEAR_CANVAS();

      //console.log("***");
      //console.log(obj["properties"]["NAME"]);
      let displayRange = {
        "xmin":obj.xmin,
        "xmax":obj.xmax,
        "ymin":obj.ymin,
        "ymax":obj.ymax
      };
      // console.log(displayRange);
      
      let parents = obj["properties"]["PARENTS"];
      for (let i = 0; i < parents.length; i++) {
        let parent = parents[i];
        let parentFeature = features.filter(item => item["properties"]["NAME"] === parent)[0];
        // console.log(parentFeature);
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
      
      // console.log("x : " + box.data.range.x.min + " to " + box.data.range.x.max);
      
      for (let i = 0; i < parents.length; i++) {
        let parentName = parents[i];
        let parentFeature = features.filter(item => item["properties"]["NAME"] === parentName)[0];
        drawFeature(b_=box, feature_=parentFeature);
      }
      
      
      drawFeature(b_=box, feature_=obj, selected_=true);
      geometryNameOutputEl.innerHTML = "?";
      phase = true;
      

      
    }); // closing fn
      
    
    
    
    
     /*
     ANIMATION = window.setInterval(function(){
       abc();
     }, 1000);
     */
     
     function abc() {

      if (phase) {
        geometryNameOutputEl.innerHTML = obj["properties"]["NAME"];
        phase = false;
        return;
      }
      
      console.log(indices.length);
      
      if (indices.length == 0) {
        indices = features.map((x, i) => i);
        shuffle(indices);
        console.log("restart");
        console.log(indices);
      }
      
      index = indices.splice(0,1)[0];
      obj = features[index];

      // console.log(obj["properties"]["NAME"].toUpperCase());

      box.CLEAR_CANVAS();

      
      
      let displayRange = {
        "xmin":obj.xmin,
        "xmax":obj.xmax,
        "ymin":obj.ymin,
        "ymax":obj.ymax
      };
      // console.log(displayRange);
      
      let parents = obj["properties"]["PARENTS"];
      //console.log("n_parents : " + parents.length);
      
      for (let i = 0; i < parents.length; i++) {
        let parent = parents[i];
        let parentFeature = features.filter(item => item["properties"]["NAME"] === parent)[0];
        //console.log(parentFeature);
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

      for (let i = 0; i < parents.length; i++) {
        let parentName = parents[i];
        let parentFeature = features.filter(item => item["properties"]["NAME"] === parentName)[0];
        drawFeature(b_=box, feature_=parentFeature);
      }
      
      drawFeature(b_=box, feature_=obj, selected_=true);
        
      geometryNameOutputEl.innerHTML = "?";
      phase = true;
      
     }; // closing abc

  }); // closing then-2

  
}); // closing onload





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