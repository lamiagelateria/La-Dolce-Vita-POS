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


const [categoria,setCategoria]=useState("pizze");

const [ordine,setOrdine]=useState([]);


const [persone,setPersone]=useState(0);

const [cliente,setCliente]=useState("");



const [extra,setExtra]=useState([]);

const [nota,setNota]=useState("");

const [impasto,setImpasto]=useState("Classico");

const [cottura,setCottura]=useState("Normale");



const [cassa,setCassa]=useState(false);

const [pagamento,setPagamento]=useState("");



const [ricevuto,setRicevuto]=useState("");



const [asporto,setAsporto]=useState(false);

const [nomeAsporto,setNomeAsporto]=useState("");

const [oraRitiro,setOraRitiro]=useState("");

const [ordineAsporto,setOrdineAsporto]=useState([]);

const [categoriaAsporto,setCategoriaAsporto]=useState("pizze");

const [statoAsporto,setStatoAsporto]=useState(statiAsporto[0]);



// MODIFICA PIZZA


const [pizzaModifica,setPizzaModifica]=useState(null);

const [senzaIngredienti,setSenzaIngredienti]=useState([]);

const [aggiunte,setAggiunte]=useState([]);





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

.reduce((a,b)=>{

let extraPrezzo=b.extraPrezzo || 0;

return a+b.prezzo+extraPrezzo;

},0)

.toFixed(2);

}



function totaleAsporto(){

return ordineAsporto

.reduce((a,b)=>a+b.prezzo,0)

.toFixed(2);

}



function salvaTavolo(nuovoOrdine){


setTavoli(

tavoli.map(t=>

t.numero===tavolo.numero

?

{
...t,
stato:"occupato",
ordine:nuovoOrdine,
persone,
cliente
}

:t

)

);


}
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


const [categoria,setCategoria]=useState("pizze");

const [ordine,setOrdine]=useState([]);


const [persone,setPersone]=useState(0);

const [cliente,setCliente]=useState("");



const [extra,setExtra]=useState([]);

const [nota,setNota]=useState("");

const [impasto,setImpasto]=useState("Classico");

const [cottura,setCottura]=useState("Normale");



const [cassa,setCassa]=useState(false);

const [pagamento,setPagamento]=useState("");



const [ricevuto,setRicevuto]=useState("");



const [asporto,setAsporto]=useState(false);

const [nomeAsporto,setNomeAsporto]=useState("");

const [oraRitiro,setOraRitiro]=useState("");

const [ordineAsporto,setOrdineAsporto]=useState([]);

const [categoriaAsporto,setCategoriaAsporto]=useState("pizze");

const [statoAsporto,setStatoAsporto]=useState(statiAsporto[0]);



// MODIFICA PIZZA


const [pizzaModifica,setPizzaModifica]=useState(null);

const [senzaIngredienti,setSenzaIngredienti]=useState([]);

const [aggiunte,setAggiunte]=useState([]);





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

.reduce((a,b)=>{

let extraPrezzo=b.extraPrezzo || 0;

return a+b.prezzo+extraPrezzo;

},0)

.toFixed(2);

}



function totaleAsporto(){

return ordineAsporto

.reduce((a,b)=>a+b.prezzo,0)

.toFixed(2);

}



function salvaTavolo(nuovoOrdine){


setTavoli(

tavoli.map(t=>

t.numero===tavolo.numero

?

{
...t,
stato:"occupato",
ordine:nuovoOrdine,
persone,
cliente
}

:t

)

);


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

stato:"Da fare"

}))

]);



setOrdineAsporto([]);

setNomeAsporto("");

setOraRitiro("");

setAsporto(false);

}




function aggiornaStatoAsporto(i,valore){


setAsporti(

asporti.map((a,index)=>

index===i

?

{
...a,
stato:valore
}

:a

)

);


}




function eliminaAsporto(i){


setAsporti(

asporti.filter((a,index)=>index!==i)

);


}





function prontoCucina(i){


setCucina(

cucina.map((c,index)=>

index===i

?

{
...c,
stato:"Pronto"
}

:c

)

);


}





return (

<div

style={{

background:"#111",

minHeight:"100vh",

color:"white",

fontFamily:"Arial",

padding:"20px"

}}

>


<h1

style={{

background:"#b71c1c",

padding:"20px",

borderRadius:"10px",

textAlign:"center"

}}

>

🍕 La Dolce Vita POS

</h1>  
function aggiungiNumero(n){

setRicevuto(

ricevuto+n

);

}



function virgola(){

if(!ricevuto.includes(",")){

setRicevuto(ricevuto+",");

}

}



function cancellaNumero(){

setRicevuto(

ricevuto.slice(0,-1)

);

}



function valoreRicevuto(){

return Number(

ricevuto.replace(",", ".")

);

}



const resto=

(valoreRicevuto()-Number(totale()))

.toFixed(2);



return (

<>


{!tavolo && !asporto &&

<>

<h2>
🪑 Mappa Tavoli
</h2>


<div

style={{

display:"grid",

gridTemplateColumns:"repeat(3,120px)",

gap:"15px"

}}

>


{tavoli.map(t=>

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

borderRadius:"15px",

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


</>


}




{cassa &&


<div

style={{

background:"#222",

padding:"20px",

borderRadius:"15px"

}}

>


<h2>
💳 Cassa POS
</h2>


<h2>
Totale €{totale()}
</h2>



<div

style={{

background:"#000",

fontSize:"35px",

padding:"20px",

textAlign:"center"

}}

>

€ {ricevuto || "0,00"}

</div>



<div

style={{

display:"grid",

gridTemplateColumns:"repeat(3,100px)",

gap:"10px",

marginTop:"20px"

}}

>


{"7894561230".split("").map(n=>

<button

key={n}

onClick={()=>aggiungiNumero(n)}

style={{

height:"80px",

fontSize:"30px"

}}

>

{n}

</button>

)}


<button

onClick={virgola}

style={{

fontSize:"30px"

}}

>

,

</button>



<button

onClick={cancellaNumero}

style={{

fontSize:"25px"

}}

>

⌫

</button>


</div>



<h3>
💶 Resto: €{resto}
</h3>



<div>

{[50,20,10,5,2,1].map(n=>

<button

key={n}

onClick={()=>setRicevuto(

(String(valoreRicevuto()+n))

)}

style={{

margin:"5px",

padding:"15px"

}}

>

+€{n}

</button>

)}

</div>



<h3>
Metodo pagamento
</h3>


{pagamenti.map(p=>

<button

key={p}

onClick={()=>setPagamento(p)}

style={{

padding:"15px",

margin:"5px"

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

background:"#2e7d32",

color:"white",

padding:"20px",

fontSize:"20px"

}}

>

✅ Chiudi conto

</button>

}


</div>

}  
{tavolo && !cassa &&

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


<input

value={cliente}

onChange={(e)=>setCliente(e.target.value)}

placeholder="Nome cliente"

style={{

fontSize:"22px",

padding:"15px",

width:"90%"

}}

/>



<h3>
👥 Persone
</h3>


<input

type="number"

value={persone}

onChange={(e)=>setPersone(e.target.value)}

style={{

fontSize:"20px",

padding:"10px"

}}

/>



<h3>
🍕 Menu
</h3>


<select

value={categoria}

onChange={(e)=>setCategoria(e.target.value)}

>

{Object.keys(menu).map(c=>

<option key={c} value={c}>

{c}

</option>

)}

</select>



<div>


{menu[categoria]?.map(p=>

<button

key={p.nome}

onClick={()=>aggiungiProdotto(p)}

style={{

margin:"5px",

padding:"15px",

fontSize:"18px"

}}

>

{p.nome}

<br/>

€{p.prezzo}

</button>

)}


</div>



<h3>
📝 Nota
</h3>


<textarea

value={nota}

onChange={(e)=>setNota(e.target.value)}

style={{

width:"90%",

height:"80px"

}}

/>



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



<h2>
📋 Ordine
</h2>


{ordine.map((o,i)=>

<div key={i}>

🍕 {o.nome}

<br/>

{ o.senza?.map((x)=>(
<p key={x}>❌ Senza {x}</p>
))}

{ o.aggiunte?.map((x)=>(
<p key={x.nome}>➕ {x.nome}</p>
))}

€{(o.prezzo+(o.extraPrezzo||0)).toFixed(2)}

</div>

)}



<h2>
Totale €{totale()}
</h2>



<button

onClick={()=>setCassa(true)}

style={{

padding:"15px",

fontSize:"20px"

}}

>

💳 Cassa

</button>



<button

onClick={()=>setTavolo(null)}

style={{

marginLeft:"10px",

padding:"15px"

}}

>

⬅ Indietro

</button>


</div>

}




{pizzaModifica &&


<div

style={{

background:"#333",

padding:"20px",

borderRadius:"15px"

}}

>


<h2>
🍕 Modifica {pizzaModifica.nome}
</h2>



<h3>
Togli ingredienti
</h3>


{pizzaModifica.ingredienti.map((ing,i)=>

<button

key={ing}

onClick={()=>toggleSenza(ing)}

style={{

margin:"5px",

padding:"10px"

}}

>

❌ {ing}

</button>

)}



<h3>
Aggiungi ingredienti
</h3>


{menu.extra.map(e=>

<button

key={e.nome}

onClick={()=>aggiungiExtraIngrediente(e)}

style={{

margin:"5px",

padding:"10px"

}}

>

➕ {e.nome} +€{e.prezzo}

</button>

)}



<br/><br/>


<button

onClick={confermaPizza}

style={{

background:"#2e7d32",

color:"white",

padding:"15px"

}}

>

✅ Aggiungi ordine

</button>


</div>

}




{asporto &&


<div

style={{

background:"#333",

padding:"20px",

borderRadius:"15px"

}}

>


<h2>
📦 Asporto
</h2>


<input

placeholder="Nome cliente"

value={nomeAsporto}

onChange={(e)=>setNomeAsporto(e.target.value)}

/>


<input

placeholder="Ora ritiro"

value={oraRitiro}

onChange={(e)=>setOraRitiro(e.target.value)}

/>


<div>

{menu[categoriaAsporto]?.map(p=>

<button

key={p.nome}

onClick={()=>aggiungiAsporto(p)}

>

{p.nome} €{p.prezzo}

</button>

)}

</div>


<h3>
Totale €{totaleAsporto()}
</h3>


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

<div

key={i}

style={{

background:"#222",

padding:"15px",

margin:"10px"

}}

>


<h3>
{c.prodotto}
</h3>


<p>
Cliente: {c.cliente}
</p>


<p>
Stato: {c.stato}
</p>


<button

onClick={()=>prontoCucina(i)}

>

✅ Pronto

</button>


</div>

)}



</>

);

}  
