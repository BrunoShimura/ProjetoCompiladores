function compilar(cod){
  var a = cod.split('\n');
  for(var i = 0, len = a.length; i < len; ++i) {
    console.log(a[i]);
  }
  percorre();
}
function percorre(){
  var a = d3.csv("data/simbolos.csv").then(function(data) {
      var a = data[0];
      
      console.log(a.classificacao);
      bd(a.simbolo);
  });
}
function bd(a){
  console.log(a);
}