var cont = 0
var cadeia = []
var pilha = ['$','E']
//a,b,c,d,e,f,g,h,i,j

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
function reconhecer(vetorCadeia){
  d3.csv("data/tabela.csv").then(function(data) {
    var matriz = [[]];
    for(var i=0;i<3;i++){
      matriz[i] = [];
      for(var j=0;j<4;j++){
        matriz[i][j] = 0;
      }
    }
    
    for(var j=0;j<data.length;j++){
      matriz[j] = [];
    }
    for(var j=0;j<data.length;j++){
      matriz[j][0] = data[j].a;
    }
    for(var j=0;j<data.length;j++){
      matriz[j][1] = data[j].b;
    }
    for(var j=0;j<data.length;j++){
      matriz[j][2] = data[j].c;
    }
    for(var j=0;j<data.length;j++){
      matriz[j][3] = data[j].d;
    }
    for(var j=0;j<data.length;j++){
      matriz[j][4] = data[j].i;
    }
    for(var j=0;j<data.length;j++){
      matriz[j][5] = data[j].j;
    }
    
    var vetorCadeia = []
    for(var i=0;i<cadeia.length;i++){
      vetorCadeia[i] = cadeia[i][1]
    }
  
    
    console.log(pilha)
    console.log(vetorCadeia)
    console.log(matriz)
    var teste = pilha.length
    var tabela = []
    for(var i=0;i<10;i++){
      tabela[i] = [pilha,vetorCadeia,matriz]
    }
    console.log(pilha[pilha.length-1])
    mostraTabela2(tabela)
  });
}