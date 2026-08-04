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



// ASPORTO

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



// MODIFICA PIZZA

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

return ordine

.reduce((tot,p)=>{

return tot+p.prezzo+(p.extraPrezzo || 0)

},0)

.toFixed(2);

}



function totaleAsporto(){

return ordineAsporto

.reduce((a,b)=>a+b.prezzo,0)

.toFixed(2);

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

:t

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



const prodotto={

...p,

nota,

impasto,

cottura,

extraPrezzo:0

};



const nuovo=[

...ordine,

prodotto

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



const prodotto={

...pizzaModifica,

senza,

aggiunte,

extraPrezzo:prezzoExtra,

nota,

impasto,

cottura

};



const nuovo=[

...ordine,

prodotto

];



salvaOrdine(nuovo);



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


if(!aggiunte.find(x=>x.nome===e.nome)){


setAggiunte([

...aggiunte,

e

]);


}


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

:t

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





function cambiaStatoAsporto(i,stato){


setAsporti(

asporti.map((a,index)=>

index===i

?

{
...a,
stato
}

:a

)

);


}





function pagaAsporto(i){


setAsporti(

asporti.filter((a,index)=>index!==i)

);


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
function numeroCassa(n){

setRicevuto(

ricevuto+n

);

}



function virgolaCassa(){

if(!ricevuto.includes(",")){

setRicevuto(ricevuto+",");

}

}



function cancellaCassa(){

setRicevuto(

ricevuto.slice(0,-1)

);

}



function ricevutoNumero(){

return Number(

ricevuto.replace(",", ".")

);

}



const resto=

(ricevutoNumero()-Number(totale()))

.toFixed(2);





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

background:"#000",

padding:"20px",

fontSize:"35px",

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


{"123456789".split("").map(n=>

<button

key={n}

onClick={()=>numeroCassa(n)}

style={{

height:"80px",

fontSize:"30px"

}}

>

{n}

</button>

)}



<button

onClick={()=>numeroCassa("0")}

>

0

</button>



<button

onClick={virgolaCassa}

>

,

</button>



<button

onClick={cancellaCassa}

>

⌫

</button>


</div>



<h2>
Resto €{resto}
</h2>



<div>


{[50,20,10,5,2,1].map(n=>

<button

key={n}

onClick={()=>setRicevuto(

String(ricevutoNumero()+n)

)}

style={{

padding:"15px",

margin:"5px"

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

padding:"20px"

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

padding:"12px"

}}

/>



<h3>
🍕 Menu
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
📝 Nota cucina
</h3>


<textarea

value={nota}

onChange={(e)=>setNota(e.target.value)}

style={{

width:"90%",

height:"70px"

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

{o.senza?.map(x=>

<p key={x}>
❌ Senza {x}
</p>

)}


{o.aggiunte?.map(x=>

<p key={x.nome}>
➕ {x.nome}
</p>

)}


€{(o.prezzo+(o.extraPrezzo||0)).toFixed(2)}

</div>

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

>

⬅ Indietro

</button>


</div>

}





{pizzaModifica &&

<div

style={{

background:"#333",

padding:"20px"

}}

>


<h2>
🍕 Modifica {pizzaModifica.nome}
</h2>



<h3>
Togli ingredienti
</h3>


{pizzaModifica.ingredienti?.map((i)=>

<button

key={i}

onClick={()=>togliIngrediente(i)}

style={{

margin:"5px"

}}

>

❌ {i}

</button>

)}



<h3>
Aggiunte
</h3>


{menu.extra.map(e=>

<button

key={e.nome}

onClick={()=>aggiungiIngrediente(e)}

>

➕ {e.nome} +€{e.prezzo}

</button>

)}



<br/><br/>


<button

onClick={confermaPizza}

>

✅ Conferma pizza

</button>


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

✅ Salva

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
