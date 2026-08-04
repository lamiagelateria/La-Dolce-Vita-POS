import { useState } from "react";

const pizze = [
  {nome:"Margherita", prezzo:7},
  {nome:"Marinara", prezzo:6},
  {nome:"Napoli", prezzo:8},
  {nome:"Prosciutto", prezzo:8.5},
  {nome:"Prosciutto e Funghi", prezzo:9},
  {nome:"Capricciosa", prezzo:10},
  {nome:"Quattro Stagioni", prezzo:10},
  {nome:"Quattro Formaggi", prezzo:10},
  {nome:"Diavola", prezzo:9},
  {nome:"Vegetariana", prezzo:9},
  {nome:"Tonno e Cipolla", prezzo:9.5},
  {nome:"Bufalina", prezzo:11},
  {nome:"Speck e Brie", prezzo:11},
  {nome:"Mortadella e Pistacchio", prezzo:12},
  {nome:"La Dolce Vita Special", prezzo:14}
];


export default function App(){

const [tavoli,setTavoli]=useState(
Array.from({length:120},(_,i)=>({
numero:i+1,
occupato:false,
ordine:[]
}))
);

const [tavoloAperto,setTavoloAperto]=useState(null);


function apriTavolo(t){
setTavoloAperto(t);
}


function aggiungiPizza(pizza){

setTavoli(
tavoli.map(t=>
t.numero===tavoloAperto.numero
?
{
...t,
occupato:true,
ordine:[...t.ordine,pizza]
}
:t
)
);

setTavoloAperto({
...tavoloAperto,
occupato:true,
ordine:[
...tavoloAperto.ordine,
pizza
]
});

}


function totale(){

return tavoloAperto?.ordine
.reduce((a,b)=>a+b.prezzo,0)
.toFixed(2);

}



return (

<div style={{
background:"#111",
minHeight:"100vh",
color:"white",
fontFamily:"Arial"
}}>


<header style={{
background:"#b71c1c",
padding:"20px",
fontSize:"28px",
textAlign:"center"
}}>
🍕 La Dolce Vita POS
</header>


{!tavoloAperto &&

<div style={{
padding:"20px",
display:"grid",
gridTemplateColumns:"repeat(6,1fr)",
gap:"12px"
}}>

{tavoli.map(t=>(

<button
key={t.numero}
onClick={()=>apriTavolo(t)}
style={{
height:"70px",
borderRadius:"10px",
background:t.occupato?"red":"green",
color:"white",
fontSize:"18px"
}}
>
Tavolo {t.numero}
</button>

))}

</div>

}



{tavoloAperto &&

<div style={{padding:"20px"}}>

<h2>
🪑 Tavolo {tavoloAperto.numero}
</h2>


<h3>🍕 Pizze</h3>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"10px"
}}>

{pizze.map(p=>(

<button
key={p.nome}
onClick={()=>aggiungiPizza(p)}
style={{
padding:"15px"
}}
>
{p.nome}
<br/>
€{p.prezzo}
</button>

))}

</div>


<h2>
Ordine
</h2>

{tavoloAperto.ordine.map((p,i)=>
<p key={i}>
🍕 {p.nome} - €{p.prezzo}
</p>
)}


<h2>
Totale: €{totale()}
</h2>


<button
onClick={()=>setTavoloAperto(null)}
>
⬅ Torna ai tavoli
</button>


</div>

}


</div>

);

}
