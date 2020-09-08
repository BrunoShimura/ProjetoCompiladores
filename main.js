var contTabela = 1

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
            mostraTabela(num,palavra[i],data[j].simbolo)
          }
        }
      }
  });
}

function mostraTabela(num,palavra,simbolo){

  var text = '<tr><td>ola</td><td>ola</td><td>ola</td></tr><div id="tabela2"></div>'
  document.getElementById("tabela"+contTabela).innerHTML = text;
  console.log(contTabela)
  contTabela+=1
}