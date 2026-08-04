export const creaTavoli = () => {

return Array.from({length:120},(_,i)=>({

numero:i+1,
stato:"libero",
ordine:[],
totale:0

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
