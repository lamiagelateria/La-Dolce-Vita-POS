import { useState } from "react";
import { menu } from "./menu";
import { creaTavoli, pagamenti, statiAsporto } from "./dati";


export default function App(){

const [tavoli,setTavoli]=useState(creaTavoli());

const [tavolo,setTavolo]=useState(null);

const [categoria,setCategoria]=useState("pizze");

const [ordine,setOrdine]=useState([]);

const [extra,setExtra]=useState([]);

const [nota,setNota]=useState("");

const [impasto,setImpasto]=useState("Classico");

const [cottura,setCottura]=useState("Normale");

const [cassa,setCassa]=useState(false);

const [pagamento,setPagamento]=useState("");

const [asporto,setAsporto]=useState(false);

const [cliente,setCliente]=useState("");

const [oraRitiro,setOraRitiro]=useState("");

const [statoAsporto,setStatoAsporto]=useState(statiAsporto[0]);



function apriTavolo(t){

setTavolo(t);

setOrdine(t.ordine);

}



function aggiungiProdotto(p){

setOrdine([

...ordine,

{
...p,
extra,
nota,
impasto,
cottura
}

]);


setExtra([]);

setNota("");

}



function totale(){

return ordine
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



{!tavolo &&

<div>

<h2>🪑 Tavoli</h2>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(6,1fr)",
gap:"10px"
}}>


{tavoli.map(t=>

<button
key={t.numero}
onClick={()=>apriTavolo(t)}
style={{
height:"70px",
background:t.stato==="occupato"?"red":"green",
color:"white",
borderRadius:"10px"
}}
>

Tavolo {t.numero}

</button>

)}

</div>

</div>

}




{tavolo &&

<div>


<h2>
🪑 Tavolo {tavolo.numero}
</h2>


<h3>Menu</h3>


<select
value={categoria}
onChange={(e)=>setCategoria(e.target.value)}
>

<option value="pizze">🍕 Pizze</option>
<option value="bevande">🥤 Bevande</option>
<option value="caffetteria">☕ Caffetteria</option>
<option value="dolci">🍰 Dolci</option>
<option value="gelati">🍦 Gelati</option>
<option value="bimbi">🧒 Menù bimbi</option>

</select>



<div>

{menu[categoria].map(p=>

<button
key={p.nome}
onClick={()=>aggiungiProdotto(p)}
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

</div>



<h3>➕ Extra pizza</h3>

{menu.extra.map(e=>

<button
key={e.nome}
onClick={()=>setExtra([...extra,e])}
style={{
margin:"5px"
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



<h3>📝 Nota</h3>

<textarea
value={nota}
onChange={(e)=>setNota(e.target.value)}
placeholder="Note cliente"
/>



<h2>Ordine</h2>

{ordine.map((o,i)=>

<p key={i}>
{o.nome} - €{o.prezzo}
</p>

)}



<h2>
Totale: €{totale()}
</h2>



<button
onClick={()=>setCassa(true)}
>
💳 Vai alla cassa
</button>


<button
onClick={()=>setTavolo(null)}
style={{marginLeft:"10px"}}
>
⬅ Tavoli
</button>


</div>

}
{cassa &&

<div style={{
background:"#222",
padding:"20px",
marginTop:"20px",
borderRadius:"15px"
}}>

<h2>
💳 Cassa
</h2>


<h3>
Totale conto: €{totale()}
</h3>


{pagamenti.map(p=>

<button
key={p}
onClick={()=>setPagamento(p)}
style={{
margin:"5px",
padding:"10px"
}}
>

{p}

</button>

)}


{pagamento &&

<div>

<h3>
Pagamento scelto: {pagamento}
</h3>


<button
onClick={()=>{

setTavoli(
tavoli.map(t=>
t.numero===tavolo.numero
?
{
...t,
stato:"libero",
ordine:[],
totale:0
}
:t
)
);

setTavolo(null);
setOrdine([]);
setPagamento("");
setCassa(false);

}}
>
✅ Chiudi conto
</button>


</div>

}


</div>

}





{asporto &&

<div style={{
background:"#333",
padding:"20px",
marginTop:"20px"
}}>

<h2>
📦 Asporto
</h2>


<input
placeholder="Nome cliente"
value={cliente}
onChange={(e)=>setCliente(e.target.value)}
/>


<br/><br/>


<input
placeholder="Ora ritiro"
value={oraRitiro}
onChange={(e)=>setOraRitiro(e.target.value)}
/>



<h3>
Stato:
</h3>


<select
value={statoAsporto}
onChange={(e)=>setStatoAsporto(e.target.value)}
>

{statiAsporto.map(s=>

<option key={s}>
{s}
</option>

)}

</select>


</div>

}



<button
onClick={()=>setAsporto(true)}
style={{
marginTop:"20px"
}}
>
📦 Nuovo asporto
</button>



</div>

);

}
