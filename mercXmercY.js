
function mercX(lon_, zoomx_) {
  let lon = lon_*Math.PI/180;
  let a = (128/Math.PI) * Math.pow(2, zoomx_);
  let b = lon + Math.PI;
  return a*b;
}

function mercY(lat_, zoomy_) {
  let lat = lat_*Math.PI/180;
  let a = (128/Math.PI) * Math.pow(2, zoomy_);
  let b = Math.tan(Math.PI/4 + lat/2);
  let c = Math.PI - Math.log(b);
  return -a*c;
}