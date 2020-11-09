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

}
//  1 ponto ====================================================================
//  AMEM n - aloca espaço na memória (pilha M) para n variáveis.
//  DMEM n - desaloca o espaço das n variáveis alocadas em AMEM

//  1 ponto ====================================================================
//  LEIT - scanf(a) scanf(b)

//  2 pontos ===================================================================
//  IMPR - printf(a)

//  2 pontos ===================================================================
//  Expressão
//  SOMA (Somar)
//  SUBT (Subtração)
//  MULT (Multiplicação)
//  DIVI (Divisão)

//  2 pontos ===================================================================
//  IF com ELSE
//  DSVF p - desvia para p se topo for falso; (p é endereço)
//  DSVS q - desvia sempre para q (q é endereço)
        
//  2 pontos ===================================================================
//  WHILE