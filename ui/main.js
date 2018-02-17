var img1 = document.getElementById('img');
var marginval= 0;
function margin(){
    if (marginval===500){
        marginval= 0;
    }
    return marginval = marginval +1;
}
function moveright(){
    img1.style.marginLeft=margin()+'px';
}
img1.onclick= function(){
    var interval = setInterval(moveright,10);
    
};
var val= 0;
var button = document.getElementById('counter');
var count = document.getElementById('count');
button.onClick= function(){
    val = val+1;
    count.innerHtml= val.toString();
};