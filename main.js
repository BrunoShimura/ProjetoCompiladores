function compilar(cod){
  var linha = cod.split('\n'); 
  var cont = 1;
  for(var i = 0, len = linha.length; i < len; ++i) {
    percorre(linha[i],cont);
    cont+=1;
  }
}

function percorre(linha,num){
  d3.csv("data/simbolos.csv").then(function(data) {
      var palavra = linha.split(' ');
      for(var i = 0, len = palavra.length; i < len; ++i) {
        for(var j = 0, a = data.length; j < a; ++j) {
          if(palavra[i]==data[j].token){
            console.log(palavra[i]);
            console.log(data[j].simbolo);
          }else{
            var caracter = palavra[i].split('');
            if (caracter[i]==data[j].token){

            }
          }
        }
      }
  });
}
