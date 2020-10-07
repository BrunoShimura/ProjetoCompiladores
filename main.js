var cont = 0
var cadeia = []
cadeia[0] = ['']
var pilha = ['$','E']
//a,b,c,d,e,f,g,h,i,j

function compilar(cod){
  var linha = cod.split('\n'); 
  var cont2 = 1;
  for(var i = 0, len = linha.length; i < len; ++i) {
    percorre(linha[i],cont2);
    cont2+=1;
  }
  console.log(cadeia)
  reconhecer(cadeia)

  document.getElementById("btn1").style.display = "none";
  document.getElementById("line_numbers").disabled = true;
}

function percorre(linha,num){
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
      mostraTabela(cadeia)
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
  novoBotao()
}
function novoBotao(){
  var text = ' <button type="button" id="btn2" class="btn btn-primary btn-block" onclick="atualizar()">Compilar novamente</button>'
  document.getElementById("atualizar").innerHTML = text;
}
function atualizar(){
  window.location.href = "index.html";
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
    
    var vetorCadeia = []
    for(var i=0;i<cadeia.length;i++){
      vetorCadeia[i] = cadeia[i][1]
    }
    vetorCadeia[cadeia.length]='$'
    var tabela = []

    for(var i=0;;i++){
      //procura pilha e cadeia
      var y,k = 0
      
      for(var j=0;j<6;j++){
        if(pilha[pilha.length-1]==matriz[j][0]){
          y = j
          break
        }else{
          y = 0
        }
      }
      for(var j=0;j<10;j++){
        if(vetorCadeia[0]==matriz[0][j])
          k = j
      }

      console.log('===='+i+'====')
      console.log(y)
      console.log(matriz[y][k])

      //divide a regra matriz encontrada
      var regra = matriz[y][k].split(' ')
      
      //vetor com as informações
      tabela[i] = [pilha.join(''),vetorCadeia.join(''),regra.join('')]

      if((pilha.length==1)&&(vetorCadeia.length==1)){
        tabela[i] = [pilha.join(''),vetorCadeia.join(''),'sucesso 😀']
        break
      }

      if(regra==''){
        tabela[i] = [pilha.join(''),vetorCadeia.join(''),'erro 😞']
        break
      }

      if(pilha[parseInt(pilha.length)-1]==vetorCadeia[0]){
        tabela[i] = [pilha.join(''),vetorCadeia.join(''),'---------']
        pilha.pop()
        vetorCadeia.shift()
      }
      else{
        if(y == 0){
          tabela[i] = [pilha.join(''),vetorCadeia.join(''),'erro 😞']
          break
      }
        if(regra[2]=='λ')
          pilha.pop();
        
        else{
          pilha.pop();
          regra = regra.reverse()
          for(var j=0;regra[j]!='->';j++){
            pilha.push(regra[j])
          }
        }
      }
      
    }
    mostraTabela2(tabela)
  });
}