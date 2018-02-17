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
var counter= 0;
var button = document.getElementById('counter');
var span = document.getElementById('count');
button.onclick= function(){
    counter = counter+1;
    span.innerHTML= val.toString();
};