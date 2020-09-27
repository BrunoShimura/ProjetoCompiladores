var cont = 0
var cadeia = []
var pilha = ['$','E']
var vetorCadeia = []
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
      matriz[j][4] = data[j].e;
    }
    for(var j=0;j<data.length;j++){
      matriz[j][5] = data[j].f;
    }
    for(var j=0;j<data.length;j++){
      matriz[j][6] = data[j].g;
    }
    for(var j=0;j<data.length;j++){
      matriz[j][7] = data[j].h;
    }
    for(var j=0;j<data.length;j++){
      matriz[j][8] = data[j].i;
    }
    for(var j=0;j<data.length;j++){
      matriz[j][9] = data[j].j;
    }
    
    
    for(var i=0;i<cadeia.length;i++){
      vetorCadeia[i] = cadeia[i][1]
    }
    
    var cont = 0
    var tabela = []

    for(var i=0;i<5;i++){
      

      //procura pilha e cadeia
      for(var j=0;j<6;j++){
        if(pilha[pilha.length-1]==matriz[j][0])
          var y = j
      }
      for(var j=0;j<10;j++){
        if(vetorCadeia[cont]==matriz[0][j])
          var k = j
      }
      //vetor com as informações
      tabela[i] = [pilha.join(),vetorCadeia.join(),matriz[y][k]]
      
      //divide a regra matriz encontrada
      var regra = matriz[y][k].split(' ')
      
      //se regra igual a cadeia tida da pilha 
      if(regra[2]==vetorCadeia[cont]){
        pilha.pop();
        pilha.push(regra[2])
        vetorCadeia.shift();
        cont+=1
      }else{
        // se não divide a regra e coloca na pilha
        pilha.pop();
        regra = regra[2].split('')
        regra = regra.reverse()
        console.log(regra)
        for(var j=0;j<regra.length;j++){
          pilha.push(regra[j])
        }
      }
      
    }

    
    
    
    mostraTabela2(tabela)
  });
}