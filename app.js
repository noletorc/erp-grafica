
let pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]")

function showPage(id){

document.querySelectorAll(".page").forEach(p=>p.style.display="none")
document.getElementById(id).style.display="block"

}

function calcular(){

let l=parseFloat(document.getElementById("largura").value||0)
let a=parseFloat(document.getElementById("altura").value||0)
let p=parseFloat(document.getElementById("preco").value||0)

let area=l*a
let total=area*p

document.getElementById("resultado").innerText="Valor: R$ "+total.toFixed(2)

}

function criarPedido(){

let cliente=document.getElementById("cliente").value
let valor=document.getElementById("resultado").innerText.replace("Valor: R$ ","")

let pedido={cliente,valor,status:"orcamento"}

pedidos.push(pedido)

salvar()
render()

}

function salvar(){

localStorage.setItem("pedidos",JSON.stringify(pedidos))

}

function mover(i){

let ordem=["orcamento","arte","producao","acabamento","concluindo","pago"]
let atual=pedidos[i].status
let pos=ordem.indexOf(atual)

if(pos<ordem.length-1) pedidos[i].status=ordem[pos+1]

salvar()
render()

}

function render(){

["orcamento","arte","producao","acabamento","concluindo","pago"].forEach(c=>{

document.getElementById(c).innerHTML=""

})

pedidos.forEach((p,i)=>{

let card=document.createElement("div")
card.className="task"
card.innerText=p.cliente+" - R$ "+p.valor

card.onclick=()=>mover(i)

document.getElementById(p.status).appendChild(card)

})

document.getElementById("totalPedidos").innerText=pedidos.length

let receber=0
let recebido=0

pedidos.forEach(p=>{

if(p.status=="pago") recebido+=parseFloat(p.valor)
else receber+=parseFloat(p.valor)

})

document.getElementById("totalReceber").innerText="R$ "+receber.toFixed(2)
document.getElementById("totalRecebido").innerText="R$ "+recebido.toFixed(2)

grafico(receber,recebido)

}

function grafico(receber,recebido){

let ctx=document.getElementById("graficoFinanceiro")

new Chart(ctx,{
type:"pie",
data:{
labels:["A receber","Recebido"],
datasets:[{
data:[receber,recebido]
}]
}
})

}

render()
