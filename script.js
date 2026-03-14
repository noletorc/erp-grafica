
const ctx = document.getElementById('grafico');

if(ctx){

new Chart(ctx,{
type:'bar',
data:{
labels:['Jan','Fev','Mar','Abr','Mai','Jun'],
datasets:[
{
label:'Entradas',
data:[3000,2800,3200,2900,3100,3000]
},
{
label:'Saídas',
data:[2000,2500,2600,2400,2700,2500]
}
]
}
})

}
