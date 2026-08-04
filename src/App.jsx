import { useState } from "react";

const pizze = [
{nome:"Margherita", prezzo:7},
{nome:"Marinara", prezzo:6},
{nome:"Napoli", prezzo:8},
{nome:"Romana", prezzo:8},
{nome:"Prosciutto e Funghi", prezzo:9},
{nome:"Capricciosa", prezzo:10},
{nome:"Quattro Stagioni", prezzo:10},
{nome:"Quattro Formaggi", prezzo:10},
{nome:"Diavola", prezzo:9},
{nome:"Wurstel e Patatine", prezzo:9},
{nome:"Tonno e Cipolla", prezzo:9.5},
{nome:"Vegetariana", prezzo:9},
{nome:"Bufalina", prezzo:11},
{nome:"Parmigiana", prezzo:11},
{nome:"Mortadella e Pistacchio", prezzo:12},
{nome:"Salsiccia e Friarielli", prezzo:11},
{nome:"Funghi Porcini", prezzo:12},
{nome:"Tartufo e Funghi", prezzo:14},
{nome:"La Dolce Vita Special", prezzo:14},
{nome:"Chef Special", prezzo:15},
{nome:"Tartufata", prezzo:15},
{nome:"Bianca Speck", prezzo:10},
{nome:"Bianca Patate", prezzo:9},
{nome:"Bianca Salmone", prezzo:13}
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
const [impasto,setImpasto]=useState("Classico");
const [cottura,setCottura]=useState("Normale");


function aggiungiPizza(){

let prezzoFinale=
pizzaScelta.prezzo+
extra.reduce((a,b)=>a+b.prezzo,0);


const pizza={
...pizzaScelta,
extra,
nota,
impasto,
cottura,
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
fontFamily:"Arial",
padding:"20px"
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
gap:"10px"
}}>

{tavoli.map(t=>

<button
key={t.numero}
onClick={()=>setTavoloAperto(t)}
style={{
height:"70px",
background:t.occupato?"red":"green",
color:"white",
borderRadius:"10px"
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


<h3>🍕 Menu pizze</h3>


<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"10px"
}}>


{pizze.map(p=>

<button
key={p.nome}
onClick={()=>{
setPizzaScelta(p);
setExtra([]);
setNota("");
}}
style={{
padding:"15px"
}}
>

{p.nome}
<br/>
€{p.prezzo}

</button>

)}

</div>



{pizzaScelta &&

<div style={{
background:"#222",
padding:"20px",
marginTop:"20px",
borderRadius:"15px"
}}>


<h2>
🍕 {pizzaScelta.nome}
</h2>



<h3>➕ Extra</h3>


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



<h3>🍞 Impasto</h3>

<select
value={impasto}
onChange={(e)=>setImpasto(e.target.value)}
>

<option>Classico</option>
<option>Integrale</option>
<option>Senza glutine</option>

</select>



<h3>🔥 Cottura</h3>

<select
value={cottura}
onChange={(e)=>setCottura(e.target.value)}
>

<option>Normale</option>
<option>Ben cotta</option>
<option>Poco cotta</option>

</select>



<h3>📝 Note</h3>

<textarea
value={nota}
onChange={(e)=>setNota(e.target.value)}
placeholder="es. senza sale, ben cotta..."
/>



<br/><br/>


<button
onClick={aggiungiPizza}
>

✅ Aggiungi all'ordine

</button>


</div>

}




<h2>
📋 Ordine
</h2>


{tavoloAperto.ordine.map((p,i)=>

<div key={i}>

🍕 {p.nome} - €{p.prezzo}

<br/>

{p.impasto} - {p.cottura}

</div>

)}



<h2>
💰 Totale: €{totale()}
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
