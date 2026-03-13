
let pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]")

function salvar(){
localStorage.setItem("pedidos",JSON.stringify(pedidos))
}

function statusPrazo(data){
let hoje=new Date()
let entrega=new Date(data)
let diff=(entrega-hoje)/(1000*60*60*24)
if(diff<0) return "atrasado"
return ""
}

function criarPedido(){
let cliente=document.getElementById("cliente").value
let whats=document.getElementById("whatsapp").value
let servico=document.getElementById("servico").value
let valor=parseFloat(document.getElementById("valor").value || 0)
let prazo=document.getElementById("prazo").value
let pago=document.getElementById("pago").value

let pedido={cliente,whats,servico,valor,prazo,pago,status:"ORCAMENTO"}

pedidos.push(pedido)
salvar()
render()
}

function mover(i){
let ordem=["ORCAMENTO","ARTE","PRODUCAO","ACABAMENTO","CONCLUINDO","PAGO"]
let atual=pedidos[i].status
let idx=ordem.indexOf(atual)
if(idx<ordem.length-1) pedidos[i].status=ordem[idx+1]
salvar()
render()
}

function abrirWhats(num){
window.open("https://wa.me/55"+num)
}

function render(){
document.querySelectorAll(".col").forEach(c=>c.innerHTML="<h3>"+c.id.replace("_"," ")+"</h3>")

pedidos.forEach((p,i)=>{
let card=document.createElement("div")
card.className="card "+statusPrazo(p.prazo)

card.innerHTML=`
<b>${p.cliente}</b><br>
${p.servico}<br>
R$ ${p.valor}<br>
Entrega: ${p.prazo}<br>
Pago: ${p.pago}<br>
<button onclick="abrirWhats('${p.whats}')">Whats</button>
`

card.onclick=()=>mover(i)
document.getElementById(p.status).appendChild(card)
})

gerarGraficos()
}

function gerarGraficos(){
let statusCount={ORCAMENTO:0,ARTE:0,PRODUCAO:0,ACABAMENTO:0,CONCLUINDO:0,PAGO:0}
let pago=0
let receber=0

pedidos.forEach(p=>{
statusCount[p.status]++
if(p.pago=="sim") pago+=p.valor
else receber+=p.valor
})

let ctx=document.getElementById("graficoProducao")
new Chart(ctx,{type:"bar",data:{labels:Object.keys(statusCount),datasets:[{label:"Pedidos",data:Object.values(statusCount)}]}})

let ctx2=document.getElementById("graficoFinanceiro")
new Chart(ctx2,{type:"pie",data:{labels:["Recebido","Falta Receber"],datasets:[{data:[pago,receber]}]}})
}

render()
