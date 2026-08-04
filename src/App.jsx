import { useState } from "react";

const pizze = [
{nome:"Margherita", prezzo:7},
{nome:"Marinara", prezzo:6},
{nome:"Napoli", prezzo:8},
{nome:"Romana", prezzo:8},
{nome:"Prosciutto e Funghi", prezzo:9},
{nome:"Capricciosa", prezzo:10},
{nome:"Quattro Formaggi", prezzo:10},
{nome:"Diavola", prezzo:9},
{nome:"Wurstel e Patatine", prezzo:9},
{nome:"Bufalina", prezzo:11},
{nome:"Mortadella e Pistacchio", prezzo:12},
{nome:"La Dolce Vita Special", prezzo:14},
{nome:"Tartufata", prezzo:15},
{nome:"Bianca Salmone", prezzo:13}
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


function aggiungiPizza(pizza){

const nuovoOrdine=[
...tavoloAperto.ordine,
pizza
];

setTavoli(
tavoli.map(t=>
t.numero===tavoloAperto.numero
?
{
...t,
occupato:true,
ordine:nuovoOrdine
}
:t
)
);


setTavoloAperto({
...tavoloAperto,
occupato:true,
ordine:nuovoOrdine
});

}


function totale(){

return tavoloAperto.ordine
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


<h1 style={{
background:"#b71c1c",
padding:"20px",
textAlign:"center"
}}>
🍕 La Dolce Vita POS
</h1>


{!tavoloAperto &&

<div style={{
display:"grid",
gridTemplateColumns:"repeat(6,1fr)",
gap:"10px",
padding:"20px"
}}>

{tavoli.map(t=>

<button
key={t.numero}
onClick={()=>setTavoloAperto(t)}
style={{
height:"70px",
background:t.occupato?"red":"green",
color:"white"
}}
>
Tavolo {t.numero}
</button>

)}

</div>

}



{tavoloAperto &&

<div style={{padding:"20px"}}>

<h2>
🪑 Tavolo {tavoloAperto.numero}
</h2>


<h3>🍕 Pizze</h3>


{pizze.map(p=>

<button
key={p.nome}
onClick={()=>aggiungiPizza(p)}
style={{
margin:"5px",
padding:"12px"
}}
>
{p.nome}
<br/>
€{p.prezzo}
</button>

)}



<h2>Ordine</h2>


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
