var cont = 0
var cadeia = []

function compilar(cod){
  var linha = cod.split('\n'); 
  var cont2 = 1;
  
  for(var i = 0, len = linha.length; i < len; ++i) {
    percorre(linha[i],cont2);
    cont2+=1;
  }
  mostraTabela(cadeia)
  reconhecer(cadeia)
  
}

function percorre(linha,num){
  cont=0
  d3.csv("data/simbolos.csv").then(function(data) {
      var palavra = linha.split(' ');
      for(var i = 0, len = palavra.length; i < len; ++i) {
        for(var j = 0, a = data.length; j < a; ++j) {
          if(palavra[i]==data[j].token){
            cadeia[cont] = [num,palavra[i],data[j].simbolo]
            cont+=1
          }
        }
      }
  });
}


function reconhecer(cadeia){
  var teste = []
  for(var i=0;i<cadeia.length;i++){
    teste[i] = cadeia[i][1]
  }
  
  d3.csv("data/tabela.csv").then(function(data) {
    var tabela = []
    tabela[0] = [['$E'],teste.join(''),['E->TS']]
    mostraTabela2(tabela)
    console.log(data[2])
});
}

function mostraTabela(tokens){
  var text = ''
  for (var i=0 ; i< tokens.length; i++){
    text+= '<tr><td>'+tokens[i][0]+'</td><td>'+tokens[i][1]+'</td><td>'+tokens[i][2]+'</td></tr>'
  }
  document.getElementById("tabela1").innerHTML = text;
  //document.getElementById("btn1").style.display = "none";
}

function mostraTabela2(tokens){
  var text = ''
  for (var i=0 ; i< tokens.length; i++){
    text+= '<tr><td>'+tokens[i][0]+'</td><td>'+tokens[i][1]+'</td><td>'+tokens[i][2]+'</td></tr>'
  }
  document.getElementById("tabela2").innerHTML = text;
}