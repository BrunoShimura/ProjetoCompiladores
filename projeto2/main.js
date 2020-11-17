var cont = 0
var cadeia = []
cadeia[0] = ['']

function compilar(cod){
  var linha = cod.split('\n'); 
  var cont2 = 1;
  for(var i = 0, len = linha.length; i < len; ++i) {
    percorre(linha[i],cont2);
    cont2+=1;
  }
  reconhecer()
  
  //document.getElementById("btn1").style.display = "none";
  document.getElementById("line_numbers").disabled = true;
}

function percorre(linha,num){
  var palavra = linha.split(' ');
  for(var i = 0, len = palavra.length; i < len; ++i) {
      cadeia[cont] = [num,palavra[i]]
      cont+=1
    }
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
//==============================================================================



function reconhecer(){
  cont = 0
  contTab = 0
  aux = 0
  varWhile=0
  fim=null
  fimElse=null
  var tabela = []
  var variaveis = []
  for (var i=0 ; i< cadeia.length;){
    console.log(cadeia[i][1]);

//  0 ponto ====================================================================
//  INPP - main()
    if(cadeia[i][1]=="main"){
      tabela[contTab] =  ["","INPP",""]
      contTab++
    }
//  0 ponto ====================================================================
//  CRCT - carrega 0
//  ARMZ - armazena 1

    for(var j=0 ; j < variaveis.length;j++){
      if(cadeia[i][1]==variaveis[j]){
        if(cadeia[i+1][1] == "="&&cadeia[i+3][1] == ";"){
          aux=0
          
          for(var g=0  ; g < variaveis.length;g++){
            if(cadeia[i+2][1]==variaveis[g]){
              aux=g
            }
          }
          if(aux>=1){
              tabela[contTab] =  ["","CRCT",aux]
              contTab++
              tabela[contTab] =  ["","ARMZ",j]
              contTab++
              i+=3
          }else{
            tabela[contTab] =  ["","CRCT",cadeia[i+2][1]]
            contTab++
            tabela[contTab] =  ["","ARMZ",j]
            contTab++
            i+=3
          }
        }
        if(cadeia[i+1][1] == "="&& cadeia[i+3][1] == "+"){
          for(var g=0 ; g < variaveis.length;g++){
            if(cadeia[i+2][1]==variaveis[g]){
              tabela[contTab] =  ["","CRCT",g]
              contTab++
            }
          }
          aux=null
          
          for(var g=0  ; g < variaveis.length;g++){
            if(cadeia[i+4][1]==variaveis[g]){
              aux=g
            }
          }
          if(aux!=null){
            tabela[contTab] =  ["","CRCT",aux]
            contTab++
          }else{
            tabela[contTab] =  ["","CRVL",cadeia[i+4][1]]
            contTab++
          }
          tabela[contTab] =  ["","SOMA",""]
          contTab++

          for(var g=0 ; g < variaveis.length;g++){
            if(cadeia[i][1]==variaveis[g]){
              tabela[contTab] =  ["","ARMZ",g]
              contTab++
            }
          }
          i+=5
        }
      }
    }


//  1 ponto ====================================================================
//  AMEM n - aloca espaço na memória (pilha M) para n variáveis.
    if(cadeia[i][1]=="int"){
      i++
      while (cadeia[i][1] !== ";"){
        if (cadeia[i][1] != ",")
          variaveis.push(cadeia[i][1])
        i++
      }
      tabela[contTab] =  ["","AMEM",variaveis.length]
      contTab++
    }
//  DMEM n - desaloca o espaço das n variáveis alocadas em AMEM

//  1 ponto ====================================================================
//  LEIT - scanf(a) scanf(b)
    if(cadeia[i][1]=="scanf"){
      while (cadeia[i+2][1] !== variaveis[aux]){
        aux++
      }
      tabela[contTab] =  ["","LEIT",""]
      contTab++
      tabela[contTab] =  ["","ARMZ",aux]
      contTab++
    }
//  2 pontos ===================================================================
//  IMPR - printf(a)
    if(cadeia[i][1]=="printf"){
      aux=null
      for(var g=0  ; g < variaveis.length;g++){
        if(cadeia[i+2][1]==variaveis[g]){
          aux=g
        }
      }
      if(aux!=null){
        tabela[contTab] =  ["","CRCT",aux]
        contTab++
        tabela[contTab] =  ["","IMPR",""]
        contTab++
      }else{
        tabela[contTab] =  ["","CRVL",cadeia[i+2][1]]
        contTab++
        tabela[contTab] =  ["","IMPR",""]
        contTab++
      }
      i+=2
    }   
//  2 pontos ===================================================================
//  Expressão

//  2 pontos ===================================================================
//  IF com ELSE
//  DSVF p - desvia para p se topo for falso; (p é endereço)
//  DSVS q - desvia sempre para q (q é endereço)
    if(cadeia[i][1]=="if"){
      aux = 0
      while (cadeia[i+1][1] !== variaveis[aux]){
        aux++
      }
      tabela[contTab] =  ["","CRCT",aux]
      contTab++

      aux = 0
      while (cadeia[i+3][1] !== variaveis[aux]){
        aux++
      }
      tabela[contTab] =  ["","CRCT",aux]
      contTab++

      if(cadeia[i+2][1]=="<="){
        tabela[contTab] =  ["","CMEG",""]
        contTab++
      }
      if(cadeia[i+2][1]==">"){
        tabela[contTab] =  ["","CMMA",""]
        contTab++
      }
      
      tabela[contTab] =  ["","DSVF","L3"]
      contTab++
    }
    if(cadeia[i][1]=="else"){
      fimElse=1
      tabela[contTab] =  ["","DSVS","L4"]
      contTab++
      tabela[contTab] =  ["L3","NADA",""]
      contTab++
    }
//  2 pontos ===================================================================
//  WHILE
    if(cadeia[i][1]=="while"){
      varWhile=1
      tabela[contTab] =  ["L1","NADA",""]
      contTab++

      aux = 0
      while (cadeia[i+1][1] !== variaveis[aux]){
        aux++
      }
      tabela[contTab] =  ["","CRCT",aux]
      contTab++

      aux = 0
      while (cadeia[i+3][1] !== variaveis[aux]){
        aux++
      }
      tabela[contTab] =  ["","CRCT",aux]
      contTab++

      if(cadeia[i+2][1]=="<="){
        tabela[contTab] =  ["","CMEG",""]
        contTab++
      }
      
      tabela[contTab] =  ["","DSVF","L2"]
      contTab++
    }

    if(varWhile==1&&cadeia[i][1]=='}'){
      tabela[contTab] =  ["","DSVS","L1"]
      contTab++
      tabela[contTab] =  ["L2","NADA",""]
      contTab++
      varWhile=0
    }
//  0 ponto ====================================================================
//  FIM
  if(cadeia[i][1]=="}"&&fimElse==1){
    tabela[contTab] =  ["L4","NADA",""]
    contTab++
    fimElse=null
  }


  if(cadeia[i][1]=="{"){
    fim+=1
  }
  if(cadeia[i][1]=="}"){
    fim-=1
  }
  if(fim==0){
    tabela[contTab] =  ["","DMEM",variaveis.length]
    contTab++
    tabela[contTab] =  ["","PARA",""]
    contTab++
  }

    i++
  }
  mostraTabela2(tabela)
}