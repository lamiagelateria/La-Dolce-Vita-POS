import { useState, useEffect } from "react";
import { menu } from "./menu";
import { creaTavoli, pagamenti, statiAsporto } from "./dati";


export default function App(){


const [tavoli,setTavoli]=useState(
JSON.parse(localStorage.getItem("tavoli")) || creaTavoli()
);


const [asporti,setAsporti]=useState(
JSON.parse(localStorage.getItem("asporti")) || []
);


const [cucina,setCucina]=useState(
JSON.parse(localStorage.getItem("cucina")) || []
);



const [tavolo,setTavolo]=useState(null);


const [ordine,setOrdine]=useState([]);


const [categoria,setCategoria]=useState("pizze");


const [persone,setPersone]=useState(0);


const [cliente,setCliente]=useState("");



const [tastiera,setTastiera]=useState(false);



const [extra,setExtra]=useState([]);

const [nota,setNota]=useState("");

const [impasto,setImpasto]=useState("Classico");

const [cottura,setCottura]=useState("Normale");



const [cassa,setCassa]=useState(false);

const [pagamento,setPagamento]=useState("");

const [ricevuto,setRicevuto]=useState(0);





// ASPORTO


const [asporto,setAsporto]=useState(false);

const [nomeAsporto,setNomeAsporto]=useState("");

const [oraRitiro,setOraRitiro]=useState("");

const [ordineAsporto,setOrdineAsporto]=useState([]);

const [categoriaAsporto,setCategoriaAsporto]=useState("pizze");

const [statoAsporto,setStatoAsporto]=useState(statiAsporto[0]);





useEffect(()=>{

localStorage.setItem(
"tavoli",
JSON.stringify(tavoli)
);

},[tavoli]);



useEffect(()=>{

localStorage.setItem(
"asporti",
JSON.stringify(asporti)
);

},[asporti]);



useEffect(()=>{

localStorage.setItem(
"cucina",
JSON.stringify(cucina)
);

},[cucina]);





function apriTavolo(t){

setTavolo(t);

setOrdine(t.ordine || []);

setPersone(t.persone || 0);

setCliente(t.cliente || "");

}





function totale(){

return ordine
.reduce((a,b)=>a+b.prezzo,0)
.toFixed(2);

}



function totaleAsporto(){

return ordineAsporto
.reduce((a,b)=>a+b.prezzo,0)
.toFixed(2);

}



function chiudiTavolo(){

setTavoli(

tavoli.map(t=>

t.numero===tavolo.numero

?

{
...t,
stato:"libero",
ordine:[],
persone:0,
cliente:""
}

:t

)

);


setTavolo(null);

setOrdine([]);

setCassa(false);

setPagamento("");

}
function aggiungiProdotto(p){

const nuovo=[

...ordine,

{
...p,
extra,
nota,
impasto,
cottura
}

];


setOrdine(nuovo);



setTavoli(

tavoli.map(t=>

t.numero===tavolo.numero

?

{
...t,
stato:"occupato",
ordine:nuovo,
persone:persone,
cliente:cliente
}

:t

)

);



setCucina([

...cucina,

{
tipo:"Tavolo",
numero:tavolo.numero,
zona:tavolo.zona,
prodotto:p.nome,
extra:extra,
nota:nota,
impasto:impasto,
cottura:cottura,
stato:"Da fare"
}

]);



setExtra([]);

setNota("");

}




function aggiungiAsporto(p){

setOrdineAsporto([

...ordineAsporto,

p

]);

}




function salvaAsporto(){


const nuovo={

nome:nomeAsporto,

ora:oraRitiro,

ordine:ordineAsporto,

stato:statoAsporto,

totale:Number(totaleAsporto())

};



setAsporti([

...asporti,

nuovo

]);



setCucina([

...cucina,

...ordineAsporto.map(o=>({

tipo:"Asporto",

nome:nomeAsporto,

prodotto:o.nome,

nota:"",

impasto:"",

cottura:"",

stato:"Da fare"

}))

]);



setOrdineAsporto([]);

setNomeAsporto("");

setOraRitiro("");

setAsporto(false);

}





function inserisciLettera(l){

setCliente(cliente+l);

}



function cancellaLettera(){

setCliente(cliente.slice(0,-1));

}





const lettere="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

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
textAlign:"center",
borderRadius:"10px"
}}>
🍕 La Dolce Vita POS
</h1>



{!tavolo && !asporto &&

<div>

<h2>
🪑 Mappa Tavoli
</h2>



<h3>
🍽️ Sala A
</h3>


<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,120px)",
gap:"15px"
}}>


{tavoli
.filter(t=>t.zona==="🍽️ Sala A")
.map(t=>

<button

key={t.numero}

onClick={()=>apriTavolo(t)}

style={{

height:"100px",

background:
t.stato==="occupato"
?"#d32f2f"
:"#2e7d2f",

color:"white",

borderRadius:"20px",

fontSize:"18px",

fontWeight:"bold"

}}

>

🪑 {t.numero}

<br/>

👥 {t.persone || 0}

</button>

)}

</div>





<h3>
🍽️ Sala B
</h3>


<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,120px)",
gap:"15px"
}}>


{tavoli
.filter(t=>t.zona==="🍽️ Sala B")
.map(t=>

<button

key={t.numero}

onClick={()=>apriTavolo(t)}

style={{

height:"100px",

background:
t.stato==="occupato"
?"#d32f2f"
:"#2e7d32",

color:"white",

borderRadius:"20px",

fontSize:"18px"

}}

>

🪑 {t.numero}

<br/>

👥 {t.persone || 0}

</button>

)}

</div>




<h3>
🌳 Esterno
</h3>


<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,120px)",
gap:"15px"
}}>


{tavoli
.filter(t=>t.zona==="🌳 Esterno")
.map(t=>

<button

key={t.numero}

onClick={()=>apriTavolo(t)}

style={{

height:"100px",

background:
t.stato==="occupato"
?"#d32f2f"
:"#2e7d32",

color:"white",

borderRadius:"20px",

fontSize:"18px"

}}

>

🪑 {t.numero}

<br/>

👥 {t.persone || 0}

</button>

)}

</div>



<button

onClick={()=>setAsporto(true)}

style={{
marginTop:"20px",
padding:"15px",
fontSize:"18px"
}}

>

📦 Nuovo Asporto

</button>


</div>

}
{tavolo &&

<div>

<h2>
🪑 Tavolo {tavolo.numero}
</h2>


<h3>
{tavolo.zona}
</h3>


<h3>
👤 Cliente
</h3>


<div style={{
background:"#222",
padding:"10px",
borderRadius:"10px",
fontSize:"22px"
}}>

{cliente || "Inserisci nome"}

</div>


<button

onClick={()=>setTastiera(!tastiera)}

style={{
marginTop:"10px",
padding:"12px"
}}

>

⌨️ Inserisci nome

</button>



{tastiera &&

<div style={{
background:"#333",
padding:"15px",
borderRadius:"15px",
marginTop:"10px",
display:"grid",
gridTemplateColumns:"repeat(6,50px)",
gap:"8px"
}}>


{lettere.map(l=>

<button

key={l}

onClick={()=>inserisciLettera(l)}

style={{
height:"45px"
}}

>

{l}

</button>

)}



<button

onClick={cancellaLettera}

style={{
gridColumn:"span 3"
}}

>

⌫ Cancella

</button>



<button

onClick={()=>setTastiera(false)}

style={{
gridColumn:"span 3"
}}

>

✅ OK

</button>


</div>

}



<h3>
👥 Persone
</h3>


<input

type="number"

min="1"

value={persone}

onChange={(e)=>setPersone(e.target.value)}

style={{
padding:"10px",
fontSize:"18px"
}}

/>



<h3>
🍽️ Menu
</h3>



<select

value={categoria}

onChange={(e)=>setCategoria(e.target.value)}

>

<option value="pizze">🍕 Pizze</option>

<option value="bevande">🥤 Bevande</option>

<option value="caffetteria">☕ Caffè</option>

<option value="dolci">🍰 Dolci</option>

<option value="gelati">🍦 Gelati</option>

<option value="bimbi">🧒 Bimbi</option>

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



<h2>
📋 Ordine
</h2>


{ordine.map((o,i)=>

<p key={i}>
{o.nome} €{o.prezzo}
</p>

)}



<h2>
Totale €{totale()}
</h2>


<button

onClick={()=>setCassa(true)}

>

💳 Cassa

</button>



<button

onClick={()=>setTavolo(null)}

style={{
marginLeft:"10px"
}}

>

⬅ Indietro

</button>


</div>

}
{cassa &&

<div style={{
background:"#222",
padding:"20px",
borderRadius:"15px",
marginTop:"20px"
}}>


<h2>
💳 Cassa
</h2>


<h3>
Totale €{totale()}
</h3>



<h3>
💶 Contanti ricevuti
</h3>


<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,80px)",
gap:"10px"
}}>


{[50,20,10,5,2,1].map(n=>

<button

key={n}

onClick={()=>setRicevuto(ricevuto+n)}

>

€{n}

</button>

)}

</div>



<p>
Ricevuto: €{ricevuto.toFixed(2)}
</p>


<p>
Resto: €{(ricevuto-Number(totale())).toFixed(2)}
</p>



<h3>
Pagamento
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



<br/><br/>


{pagamento &&

<button

onClick={chiudiTavolo}

>

✅ Chiudi conto

</button>

}


</div>

}





{asporto &&

<div style={{
background:"#333",
padding:"20px",
borderRadius:"15px"
}}>


<h2>
📦 Nuovo Asporto
</h2>


<input

placeholder="Nome cliente"

value={nomeAsporto}

onChange={(e)=>setNomeAsporto(e.target.value)}

/>


<br/><br/>


<input

placeholder="Ora ritiro"

value={oraRitiro}

onChange={(e)=>setOraRitiro(e.target.value)}

/>



<h3>
Menu
</h3>


<select

value={categoriaAsporto}

onChange={(e)=>setCategoriaAsporto(e.target.value)}

>

<option value="pizze">🍕 Pizze</option>

<option value="bevande">🥤 Bevande</option>

<option value="caffetteria">☕ Caffè</option>

<option value="dolci">🍰 Dolci</option>

<option value="gelati">🍦 Gelati</option>

<option value="bimbi">🧒 Bimbi</option>

</select>



<div>

{menu[categoriaAsporto].map(p=>

<button

key={p.nome}

onClick={()=>aggiungiAsporto(p)}

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



<h3>
Ordine
</h3>


{ordineAsporto.map((o,i)=>

<p key={i}>
{o.nome} €{o.prezzo}
</p>

)}



<h2>
Totale €{totaleAsporto()}
</h2>


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


<br/><br/>


<button

onClick={salvaAsporto}

>

✅ Salva Asporto

</button>


</div>

}




<h2>
👨‍🍳 Cucina
</h2>



{cucina.map((c,i)=>

<div key={i} style={{
background:"#222",
padding:"10px",
margin:"10px",
borderRadius:"10px"
}}>


<h3>
{c.tipo}
</h3>


<p>
{c.prodotto}
</p>


<p>
Cliente: {c.nome}
</p>


<p>
Nota: {c.nota}
</p>


<p>
Stato: {c.stato}
</p>


<button

onClick={()=>{

setCucina(

cucina.map((x,index)=>

index===i

?

{
...x,
stato:"Pronto"
}

:x

)

)

}}

>

✅ Pronto

</button>


</div>

)}



</div>

);

}
