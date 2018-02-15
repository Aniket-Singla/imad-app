var img1 = document.getElementById('img');
var marginval= 0;
function margin(){
    return marginval = marginval +10;
}
img1.onclick= function(){
    img.style.marginLeft=margin()+'px';
};