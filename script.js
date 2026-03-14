
function calcular(){

let largura = document.getElementById('largura').value;
let altura = document.getElementById('altura').value;
let preco = document.getElementById('preco').value;

let m2 = (largura/100)*(altura/100);
let total = m2*preco;

document.getElementById('resultado').innerHTML =
"Área: "+m2.toFixed(2)+" m² | Valor: R$ "+total.toFixed(2);

}

window.onload = function(){

let g = document.getElementById('grafico');

if(g){

new Chart(g,{
type:'bar',
data:{
labels:['Jan','Fev','Mar','Abr'],
datasets:[{
label:'Entradas',
data:[3000,2800,3200,2900]
},
{
label:'Saídas',
data:[2000,2400,2500,2300]
}]
}
})

}

}
