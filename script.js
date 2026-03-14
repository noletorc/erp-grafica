
function abrirOrcamento(){
document.getElementById('modalOrcamento').style.display='flex'
}

function fecharOrcamento(){
document.getElementById('modalOrcamento').style.display='none'
}

function calcular(){

let largura=document.getElementById('largura').value
let altura=document.getElementById('altura').value
let preco=document.getElementById('preco').value
let qtd=document.getElementById('qtd').value

let m2=(largura/100)*(altura/100)
let total=m2*preco*qtd

document.getElementById('m2').value=m2.toFixed(2)
document.getElementById('total').value=total.toFixed(2)
document.getElementById('valorTotal').innerText="R$ "+total.toFixed(2)

}
