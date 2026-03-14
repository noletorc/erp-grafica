let pedidos=[]

function showPage(id){
document.querySelectorAll('.page').forEach(p=>p.style.display='none')
document.getElementById(id).style.display='block'
}

function calcular(){
let l=document.getElementById('largura').value
let a=document.getElementById('altura').value
let p=document.getElementById('preco').value
let total=l*a*p
document.getElementById('valor').innerText='Valor: R$ '+total
}

function criarPedido(){
let cliente=document.getElementById('cliente').value
let servico=document.getElementById('servico').value
let valor=document.getElementById('valor').innerText.replace('Valor: R$ ','')
let pedido={cliente,servico,valor,status:'orcamento'}
pedidos.push(pedido)
render()
}

function render(){
document.querySelectorAll('.column div').forEach(c=>c.innerHTML='')
pedidos.forEach((p,i)=>{
let card=document.createElement('div')
card.className='task'
card.innerText=p.cliente+' - '+p.servico+' - R$ '+p.valor
card.onclick=()=>mover(i)
document.getElementById('col-'+p.status).appendChild(card)
})

document.getElementById('totalPedidos').innerText=pedidos.length

let receber=0,recebido=0
pedidos.forEach(p=>{
if(p.status!='pago') receber+=parseFloat(p.valor||0)
else recebido+=parseFloat(p.valor||0)
})

document.getElementById('totalReceber').innerText='R$'+receber
document.getElementById('totalRecebido').innerText='R$'+recebido
document.getElementById('finReceber').innerText='R$'+receber
document.getElementById('finRecebido').innerText='R$'+recebido
}

function mover(i){
let ordem=['orcamento','arte','producao','acabamento','entrega','pago']
let pos=ordem.indexOf(pedidos[i].status)
if(pos<ordem.length-1) pedidos[i].status=ordem[pos+1]
render()
}
