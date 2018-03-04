//moving the image
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

//handling the counter variable 
var button = document.getElementById('counter');
button.onclick= function(){
    var request = new XMLHttpRequest();
    request.onreadystatechange= function(){
      //take the required action
      if(request.readyState===XMLHttpRequest.DONE){
        if(request.status==200){
          var counter = request.responseText;
          var span = document.getElementById('count');
          span.innerHTML = counter.toString();
        }
      }
    }

    //make the request
    request.open('GET','/counter',true);
    request.send(null);
};

// for entering names into the array
var submit = document.getElementById('submit');
submit.onclick=function(){

  var request = new XMLHttpRequest();
  request.onreadystatechange= function(){
    //take the required action
    if(request.readyState===XMLHttpRequest.DONE){
      if(request.status==200){
        var names = request.responseText;
        names = JSON.parse(names);
        var list='';
        for(var i=0;i<names.length;i++){
          list += '<li>'+names[i]+'</li>';
        }
        var listp = document.getElementById('listpr');
        listp.innerHTML= list;
      }
    }
  }
  var nameInput = document.getElementById('namein');
  var name = nameInput.value;

    request.open('GET','/submtname?name='+name,true);
    request.send(null);
};

// for logging in
var username = document.getElementById('username').value;
var password = document.getElementById('password').value;
var login = document.getElementById('login');
login.onclick=function(){

  var request = new XMLHttpRequest();
  request.onreadystatechange= function(){
    //take the required action
    if(request.readyState===XMLHttpRequest.DONE){
      if(request.status==200){
        console.log('user logged in successfully');
        alert('congrats! logged in successfully');
        
      }
      else{
          console.log('error in logging in');
          alert('username / password incorrect or some internal server error');
      }
    }
  }

    console.log(username);
    request.open('POST','/login',true);
    request.send(JSON.stringify({username : ussername, password : password}));
};