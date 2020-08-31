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
            //console.log(num);
            //console.log(palavra[i]);
            //console.log(data[j].simbolo);
          }
        }
      }
  });
}
function lista(){
  let head = null;
  let length = 0;
  const Node = (value) => {
    return{
      value,
      next:null
    }
  }
  const add = (value) => {
    if(!head){
      head = Node(value)
      length++;
      return head;
    }
    let node = head
    while(node.next){
      node = node.next
    }
    node.next = Node(value)
    length++;
    return node.next
  }
  return{
    length: () => length,
    add: (value) => add(value),
    print: () => console.log(head)
  }
}
const list = lista();
console.log(list.length())
list.add((1,1))
list.add(2,4)
console.log(list.length())
console.log(list.print())