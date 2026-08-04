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



const [asporto,setAsporto]=useState(false);

const [nomeAsporto,setNomeAsporto]=useState("");

const [oraRitiro,setOraRitiro]=useState("");

const [ordineAsporto,setOrdineAsporto]=useState([]);

const [categoriaAsporto,setCategoriaAsporto]=useState("pizze");

const [statoAsporto,setStatoAsporto]=useState(
statiAsporto[0]
);



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



function inserisciLettera(l){

setCliente(cliente+l);

}



function cancellaLettera(){

setCliente(cliente.slice(0,-1));

}



const lettere=[
..."QWERTYUIOP",
..."ASDFGHJKL",
..."ZXCVBNM"
];
function aggiungiProdotto(p){

const nuovoOrdine=[

...ordine,

{
...p,
extra,
nota,
impasto,
cottura
}

];


setOrdine(nuovoOrdine);



setTavoli(

tavoli.map(t=>

t.numero===tavolo.numero

?

{
...t,
stato:"occupato",
ordine:nuovoOrdine,
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
cliente:cliente,
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

setRicevuto(0);

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



{["🍽️ Sala A","🍽️ Sala B","🌳 Esterno"].map(z=>

<div key={z}>

<h3>{z}</h3>


<div style={{
display:"grid",
gridTemplateColumns:"repeat(5,120px)",
gap:"15px"
}}>


{tavoli
.filter(t=>t.zona===z)
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

fontSize:"18px",

fontWeight:"bold",

border:"2px solid white"

}}

>


🪑 {t.numero}

<br/>

👥 {t.persone || 0}


</button>

)}


</div>

</div>

)}



<button

onClick={()=>setAsporto(true)}

style={{

marginTop:"25px",

padding:"15px",

fontSize:"20px"

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
padding:"15px",
borderRadius:"10px",
fontSize:"24px"
}}>

{cliente || "Nessun nome"}

</div>



<button

onClick={()=>setTastiera(!tastiera)}

style={{
marginTop:"10px",
padding:"15px",
fontSize:"18px"
}}

>

⌨️ Inserisci nome

</button>



{tastiera &&

<div style={{
background:"#222",
padding:"20px",
borderRadius:"20px",
marginTop:"15px"
}}>


<h2>
⌨️ Tastiera Cassa
</h2>


<div style={{
background:"#000",
padding:"15px",
fontSize:"30px",
borderRadius:"10px",
marginBottom:"15px"
}}>

{cliente || "..."}

</div>



<div style={{
display:"grid",
gridTemplateColumns:"repeat(10,1fr)",
gap:"8px"
}}>


{lettere.map(l=>

<button

key={l}

onClick={()=>inserisciLettera(l)}

style={{

height:"60px",

fontSize:"25px",

borderRadius:"10px"

}}

>

{l}

</button>

)}


</div>



<div style={{
display:"flex",
gap:"10px",
marginTop:"15px"
}}>


<button

onClick={cancellaLettera}

style={{

flex:1,

height:"60px",

background:"#b71c1c",

color:"white",

fontSize:"20px"

}}

>

⌫ Cancella

</button>



<button

onClick={()=>setTastiera(false)}

style={{

flex:1,

height:"60px",

background:"#2e7d32",

color:"white",

fontSize:"20px"

}}

>

✅ OK

</button>


</div>


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

padding:"15px"

}}

>

{p.nome}

<br/>

€{p.prezzo}

</button>

)}

</div>
<h3>
➕ Extra
</h3>


{menu.extra.map(e=>

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



<h3>
🍞 Impasto
</h3>


<select

value={impasto}

onChange={(e)=>setImpasto(e.target.value)}

>

<option>Classico</option>

<option>Integrale</option>

<option>Senza glutine</option>

</select>



<h3>
🔥 Cottura
</h3>


<select

value={cottura}

onChange={(e)=>setCottura(e.target.value)}

>

<option>Normale</option>

<option>Ben cotta</option>

<option>Poco cotta</option>

</select>



<h3>
📝 Nota cucina
</h3>


<textarea

value={nota}

onChange={(e)=>setNota(e.target.value)}

style={{
width:"100%",
height:"70px"
}}

/>



<h2>
📋 Ordine
</h2>



{ordine.map((o,i)=>

<div key={i}>

{o.nome} €{o.prezzo}

</div>

)}



<h2>
Totale €{totale()}
</h2>



<button

onClick={()=>setCassa(true)}

style={{
padding:"15px",
fontSize:"18px"
}}

>

💳 Apri Cassa

</button>



<button

onClick={()=>setTavolo(null)}

style={{
marginLeft:"10px",
padding:"15px"
}}

>

⬅ Tavoli

</button>



</div>

}



{cassa &&

<div style={{

background:"#222",

padding:"20px",

borderRadius:"15px"

}}>


<h2>
💳 Cassa
</h2>



<h2>
Totale €{totale()}
</h2>



<h3>
💶 Contanti
</h3>



<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,100px)",
gap:"15px"
}}>


{[50,20,10,5,2,1].map(n=>

<button

key={n}

onClick={()=>setRicevuto(ricevuto+n)}

style={{

height:"70px",

fontSize:"25px"

}}

>

€{n}

</button>

)}

</div>



<h3>
Ricevuto €{ricevuto.toFixed(2)}
</h3>


<h3>
Resto €{(ricevuto-Number(totale())).toFixed(2)}
</h3>



<h3>
Metodo pagamento
</h3>


{pagamenti.map(p=>

<button

key={p}

onClick={()=>setPagamento(p)}

style={{

margin:"5px",

padding:"15px"

}}

>

{p}

</button>

)}



<br/><br/>


{pagamento &&

<button

onClick={chiudiTavolo}

style={{

padding:"15px",

background:"#2e7d32",

color:"white"

}}

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

style={{
padding:"12px",
fontSize:"18px"
}}

/>


<br/><br/>


<input

placeholder="Ora ritiro"

value={oraRitiro}

onChange={(e)=>setOraRitiro(e.target.value)}

style={{
padding:"12px",
fontSize:"18px"
}}

/>



<h3>
🍽️ Menu asporto
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

padding:"15px"

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

style={{
padding:"15px"
}}

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

padding:"15px",

borderRadius:"10px",

marginBottom:"10px"

}}>


<h3>
{c.tipo}
</h3>


<p>
👤 {c.cliente || c.nome}
</p>


<p>
🍕 {c.prodotto}
</p>


<p>
Extra: {c.extra?.map(e=>e.nome).join(", ")}
</p>


<p>
📝 {c.nota}
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
