var img1 = document.getElementById('img');
var marginval= 0;
function margin(){
    return marginval = marginval +10;
}
function moveright(){
    img1.style.marginLeft=margin()+'px';
}
img1.onclick= function(){
    var interval = setInterval(moveright,50);
    
};