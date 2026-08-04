export const creaTavoli = () => {

const zone = [
"🍽️ Sala A",
"🍽️ Sala B",
"🌳 Esterno"
];


return Array.from({length:120},(_,i)=>({

numero:i+1,

zona:zone[i%3],

stato:"libero",

ordine:[],

totale:0,

persone:0,

cliente:""

}));

};



export const pagamenti = [

"Contanti",
"Carta",
"Bancomat",
"Satispay"

];



export const statiAsporto = [

"In preparazione",
"Pronto",
"Consegnato"

];
