import { useState } from "react";

const pizze = [
{nome:"Margherita", prezzo:7},
{nome:"Marinara", prezzo:6},
{nome:"Napoli", prezzo:8},
{nome:"Prosciutto e Funghi", prezzo:9},
{nome:"Capricciosa", prezzo:10},
{nome:"Diavola", prezzo:9},
{nome:"Quattro Formaggi", prezzo:10},
{nome:"Bufalina", prezzo:11},
{nome:"Mortadella e Pistacchio", prezzo:12},
{nome:"La Dolce Vita Special", prezzo:14},
{nome:"Tartufata", prezzo:15}
];


const extraIngredienti=[
{nome:"Funghi",prezzo:1},
{nome:"Prosciutto",prezzo:2},
{nome:"Olive",prezzo:1},
{nome:"Patatine",prezzo:1.5},
{nome:"Mozzarella extra",prezzo:2},
{nome:"Burrata",prezzo:3},
{nome:"Pistacchio",prezzo:2.5}
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
const [pizzaScelta,setPizzaScelta]=useState(null);
const [extra,setExtra]=useState([]);
const [nota,setNota]=useState("");


function aggiungiPizza(){

const prezzoFinale=
pizzaScelta.prezzo+
extra.reduce((a,b)=>a+b.prezzo,0);


const pizza={
...pizzaScelta,
extra,
nota,
prezzo:prezzoFinale
};


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


setPizzaScelta(null);
setExtra([]);
setNota("");

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
padding:"20px"
}}>


<h1>
🍕 La Dolce Vita POS
</h1>


{!tavoloAperto &&

<div>

{tavoli.map(t=>

<button
key={t.numero}
onClick={()=>setTavoloAperto(t)}
style={{
margin:"5px",
padding:"15px",
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

<div>

<h2>
🪑 Tavolo {tavoloAperto.numero}
</h2>


<h3>🍕 Scegli pizza</h3>

{pizze.map(p=>

<button
key={p.nome}
onClick={()=>setPizzaScelta(p)}
style={{
margin:"5px",
padding:"10px"
}}
>
{p.nome}
<br/>
€{p.prezzo}
</button>

)}



{pizzaScelta &&

<div style={{
background:"#222",
padding:"20px",
marginTop:"20px"
}}>

<h2>
🍕 {pizzaScelta.nome}
</h2>


<h3>➕ Aggiungi ingredienti</h3>

{extraIngredienti.map(e=>

<button
key={e.nome}
onClick={()=>setExtra([...extra,e])}
style={{
margin:"5px",
padding:"10px"
}}
>
{e.nome} +€{e.prezzo}
</button>

)}


<h3>📝 Note</h3>

<textarea
value={nota}
onChange={(e)=>setNota(e.target.value)}
placeholder="es. ben cotta, senza sale..."
/>


<br/><br/>

<button
onClick={aggiungiPizza}
>
✅ Aggiungi al tavolo
</button>


</div>

}



<h2>Ordine</h2>

{tavoloAperto.ordine.map((p,i)=>

<p key={i}>
🍕 {p.nome} - €{p.prezzo}
</p>

)}


<h2>
Totale €{totale()}
</h2>


<button
onClick={()=>setTavoloAperto(null)}
>
⬅ Tavoli
</button>


</div>

}


</div>

);

}
