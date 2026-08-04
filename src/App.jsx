import { useState, useEffect } from "react";
import { menu } from "./menu";
import { creaTavoli, pagamenti, statiAsporto } from "./dati";


export default function App(){


const [tavoli,setTavoli]=useState(
JSON.parse(localStorage.getItem("tavoli")) || creaTavoli()
);


const [tavolo,setTavolo]=useState(null);

const [ordine,setOrdine]=useState([]);


const [categoria,setCategoria]=useState("pizze");


const [cliente,setCliente]=useState("");

const [persone,setPersone]=useState(1);


const [nota,setNota]=useState("");

const [impasto,setImpasto]=useState("Classico");

const [cottura,setCottura]=useState("Normale");



const [cassa,setCassa]=useState(false);

const [pagamento,setPagamento]=useState("");

const [ricevuto,setRicevuto]=useState("");



const [cucina,setCucina]=useState(

JSON.parse(localStorage.getItem("cucina")) || []

);



const [asporto,setAsporto]=useState(false);

const [asporti,setAsporti]=useState(

JSON.parse(localStorage.getItem("asporti")) || []

);



const [nomeAsporto,setNomeAsporto]=useState("");

const [oraRitiro,setOraRitiro]=useState("");

const [ordineAsporto,setOrdineAsporto]=useState([]);

const [categoriaAsporto,setCategoriaAsporto]=useState("pizze");

const [statoAsporto,setStatoAsporto]=useState(
statiAsporto[0]
);



const [pizzaModifica,setPizzaModifica]=useState(null);

const [senza,setSenza]=useState([]);

const [aggiunte,setAggiunte]=useState([]);





useEffect(()=>{

localStorage.setItem(
"tavoli",
JSON.stringify(tavoli)
);

},[tavoli]);



useEffect(()=>{

localStorage.setItem(
"cucina",
JSON.stringify(cucina)
);

},[cucina]);



useEffect(()=>{

localStorage.setItem(
"asporti",
JSON.stringify(asporti)
);

},[asporti]);





function apriTavolo(t){

setTavolo(t);

setOrdine(t.ordine || []);

setCliente(t.cliente || "");

setPersone(t.persone || 1);

}




function totale(){

return ordine.reduce(

(a,b)=>a+b.prezzo+(b.extraPrezzo||0),

0

).toFixed(2);

}




function totaleAsporto(){

return ordineAsporto.reduce(

(a,b)=>a+b.prezzo,

0

).toFixed(2);

}




function salvaOrdine(nuovo){


setOrdine(nuovo);


setTavoli(

tavoli.map(t=>

t.numero===tavolo.numero

?

{

...t,

stato:"occupato",

ordine:nuovo,

cliente,

persone

}

:

t

)

);


}
function aggiungiProdotto(p){


if(p.ingredienti){


setPizzaModifica(p);

setSenza([]);

setAggiunte([]);

return;

}



const nuovo=[

...ordine,

{

...p,

nota,

impasto,

cottura,

extraPrezzo:0

}

];



salvaOrdine(nuovo);



setCucina([

...cucina,

{

tipo:"Tavolo",

numero:tavolo.numero,

cliente,

prodotto:p.nome,

nota,

impasto,

cottura,

stato:"Da fare"

}

]);



setNota("");

}





function confermaPizza(){


const prezzoExtra=

aggiunte.reduce(

(a,b)=>a+b.prezzo,

0

);



const nuovo={

...pizzaModifica,

senza,

aggiunte,

extraPrezzo:prezzoExtra,

nota,

impasto,

cottura

};



salvaOrdine([

...ordine,

nuovo

]);



setCucina([

...cucina,

{

tipo:"Tavolo",

numero:tavolo.numero,

cliente,

prodotto:pizzaModifica.nome,

senza,

aggiunte,

nota,

impasto,

cottura,

stato:"Da fare"

}

]);



setPizzaModifica(null);

setSenza([]);

setAggiunte([]);

}




function togliIngrediente(i){


if(senza.includes(i)){


setSenza(

senza.filter(x=>x!==i)

);


}else{


setSenza([

...senza,

i

]);

}


}





function aggiungiIngrediente(e){


setAggiunte([

...aggiunte,

e

]);

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

cliente:"",

persone:1

}

:

t

)

);



setTavolo(null);

setOrdine([]);

setCassa(false);

setPagamento("");

setRicevuto("");

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

cliente:nomeAsporto,

prodotto:o.nome,

stato:"Da fare"

}))

]);



setOrdineAsporto([]);

setNomeAsporto("");

setOraRitiro("");

setAsporto(false);

}





function pronto(i){


setCucina(

cucina.map((c,index)=>

index===i

?

{

...c,

stato:"Pronto"

}

:

c

)

);


}





function numeroCassa(n){


setRicevuto(

ricevuto+n

);


}



function virgolaCassa(){


if(!ricevuto.includes(",")){


setRicevuto(

ricevuto+","

);


}


}



function cancellaCassa(){


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

(

valoreRicevuto()

-

Number(totale())

)

.toFixed(2);





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
{!tavolo && !asporto &&

<div>

<h2>
🪑 Mappa Tavoli
</h2>


<div

style={{

display:"grid",

gridTemplateColumns:"repeat(4,120px)",

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

?

"#d32f2f"

:

"#2e7d32",

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

padding:"15px"

}}

>

📦 Nuovo Asporto

</button>


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

fontSize:"20px",

padding:"10px"

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

fontSize:"20px"

}}

/>



<h3>
🍕 Menu
</h3>


<select

value={categoria}

onChange={(e)=>setCategoria(e.target.value)}

>

<option value="pizze">
🍕 Pizze
</option>

<option value="bevande">
🥤 Bevande
</option>

<option value="dolci">
🍰 Dolci
</option>

<option value="caffetteria">
☕ Caffè
</option>

<option value="gelati">
🍦 Gelati
</option>

<option value="bimbi">
🧒 Bimbi
</option>


</select>



<div>


{menu[categoria]?.map(p=>

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
📝 Nota
</h3>


<textarea

value={nota}

onChange={(e)=>setNota(e.target.value)}

style={{

width:"90%"

}}

/>


{pizzaModifica &&

<div style={{
background:"#333",
padding:"20px",
borderRadius:"15px",
marginTop:"20px"
}}>

<h2>
🍕 Modifica {pizzaModifica.nome}
</h2>


<h3>
Togli ingredienti
</h3>


{pizzaModifica.ingredienti.map(i=>

<button

key={i}

onClick={()=>togliIngrediente(i)}

style={{

margin:"5px",

padding:"10px",

background:

senza.includes(i)

?

"#b71c1c"

:

"#444",

color:"white"

}}

>

{i}

</button>

)}



<h3>
Aggiungi ingredienti
</h3>


{menu.extra.map(e=>

<button

key={e.nome}

onClick={()=>aggiungiIngrediente(e)}

style={{

margin:"5px",

padding:"10px"

}}

>

+ {e.nome} €{e.prezzo}

</button>

)}



<button

onClick={confermaPizza}

style={{

marginTop:"20px",

padding:"15px",

background:"#2e7d32",

color:"white"

}}

>

✅ Conferma pizza

</button>


</div>

}
<h2>
📋 Ordine
</h2>


{ordine.map((o,i)=>

<p key={i}>

{o.nome}

€{(o.prezzo+(o.extraPrezzo||0)).toFixed(2)}

</p>

)}



<h2>
Totale €{totale()}
</h2>



<button

onClick={()=>setCassa(true)}

style={{

padding:"15px"

}}

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

fontSize:"35px",

background:"#000",

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

gap:"10px"

}}

>


{"123456789".split("").map(n=>

<button

key={n}

onClick={()=>numeroCassa(n)}

style={{

height:"70px",

fontSize:"25px"

}}

>

{n}

</button>

)}


<button onClick={()=>numeroCassa("0")}>
0
</button>


<button onClick={virgolaCassa}>
,
</button>


<button onClick={cancellaCassa}>
⌫
</button>


</div>


<h2>
Resto €{resto}
</h2>


<h3>
Pagamento
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

padding:"20px"

}}

>

✅ Chiudi conto

</button>

}


</div>

}




{asporto &&

<div

style={{

background:"#333",

padding:"20px"

}}

>


<h2>
📦 Nuovo Asporto
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



{menu[categoriaAsporto]?.map(p=>

<button

key={p.nome}

onClick={()=>aggiungiAsporto(p)}

>

{p.nome} €{p.prezzo}

</button>

)}



<h2>
Totale €{totaleAsporto()}
</h2>



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

onClick={()=>pronto(i)}

>

✅ Pronto

</button>


</div>

)}



</div>

);

}  
