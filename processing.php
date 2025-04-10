<!DOCTYPE html>

<meta charset="utf-8">
<title> processing &middot; </title>

<p><a href='./'>back</a></p>

<p style='border-bottom: 1px solid black;'></p>

<?php
  
  // this first part adds border data. each feature has ["properties"]["PARENTS"] = []
  
  $file = __DIR__ . '/africa.geojson';
  $bordersFile = __DIR__ . '/borders.json';
  
  $borders = file_exists($bordersFile) ? json_decode(file_get_contents($bordersFile), true) : [];
  
  $bordersObj = [];
  
  foreach ($borders as $border) {
    $target = $border["target"];
    $bordersObj[$target] = $border;
    // echo $target . "<br>";
  } // closing foreach
  
  // first to create the arr
  $bordersObj2 = [];
  foreach ($bordersObj as $borderVector => $arr) {
    echo $borderVector . "<br>";
    $bordersObj2[$borderVector] = [];
    foreach ($arr as $key => $value) {
      if ($key == "target") {continue;}
      $bordersObj2[$borderVector][$key] = $value;
    } // closing foreach
  } // closing foreach

  foreach ($bordersObj2 as $borderVector => $arr) {
    foreach ($arr as $key => $value) {
       if ($bordersObj2[$borderVector][$key] == "1" || $bordersObj2[$key][$borderVector] == "1") {
         $bordersObj2[$borderVector][$key] = "1";
         $bordersObj2[$key][$borderVector] = "1";
         // echo $borderVector . " + " . $key . "<br>";
       }
    } // closing foreach
  } // closing foreach

?>

<p style='border-bottom: 1px solid black;'></p>

<?php
  
  // mainly, this sorts the geojson file to make it look nice
  
  $FeatureCollection = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
  
  // make a copy
  file_put_contents("./_other/africa_". time() .".geojson", json_encode($FeatureCollection, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

  $features = $FeatureCollection["features"];
  
  $featureProperties = array_column($features, 'properties');
  $featureNames = array_column($featureProperties, 'NAME');

  array_multisort($featureNames, SORT_ASC, $features);

  
  $output_arr = [];
  
  foreach ($features as $feature) {
    
    $featureName = $feature["properties"]["NAME"];
    
    if (!isset($feature["properties"]["PARENTS"])) {
      $feature["properties"]["PARENTS"] = []; 
    }
    
    if ( !isset($feature["zoomLevel"]) ) {
      $feature["zoomLevel"] = 3.4; 
    }
    
    if ( !isset($feature["geometry"]["defaults"]) ) {
      $feature["geometry"]["defaults"] = [];
      $feature["geometry"]["defaults"]["zoom"] = 3.4;
      $feature["geometry"]["defaults"]["center"] = array(0, 0);
    }
    
    if ($feature["geometry"]["defaults"]["center"] == [0,0]) {
      $feature["geometry"]["defaults"]["center"] = array(27.5, -5);
    }
    
    
    
    if (isset($bordersObj2[$featureName])) {
      $feature["properties"]["PARENTS"] = [];
      $borderVector = $bordersObj2[$featureName];

      foreach ($borderVector as $key => $value) {
        if ($value == "1") {
          $feature["properties"]["PARENTS"][] = $key;
        }
      }
      
    }
    
    $output_arr[] = $feature;    
    echo $featureName . "<br>";
    
  }
  
  $FeatureCollection["features"] = $output_arr;
  file_put_contents("./africa.geojson", json_encode($FeatureCollection, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));


/*
usort($inventory, function ($item1, $item2) {
    return $item1['price'] <=> $item2['price'];
});
*/
// https://stackoverflow.com/questions/1597736/sort-an-array-of-associative-arrays-by-column-value
?>