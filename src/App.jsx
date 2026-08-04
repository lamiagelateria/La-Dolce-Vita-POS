import { useState } from "react";

export default function App() {

  const [tavoli, setTavoli] = useState(
    Array.from({length:120}, (_,i)=>({
      numero:i+1,
      occupato:false
    }))
  );

  const [sezione,setSezione] = useState("tavoli");

  function cambiaTavolo(numero){
    setTavoli(tavoli.map(t =>
      t.numero === numero
      ? {...t, occupato:!t.occupato}
      : t
    ));
  }

  return (

    <div style={{
      minHeight:"100vh",
      background:"#111",
      color:"white",
      fontFamily:"Arial"
    }}>

      <header style={{
        background:"#b71c1c",
        padding:"20px",
        textAlign:"center",
        fontSize:"28px",
        fontWeight:"bold"
      }}>
        🍕 La Dolce Vita POS
      </header>


      <nav style={{
        display:"flex",
        gap:"10px",
        padding:"15px",
        background:"#222"
      }}>

        <button onClick={()=>setSezione("tavoli")}>
          🪑 Tavoli
        </button>

        <button onClick={()=>setSezione("menu")}>
          🍕 Menu
        </button>

        <button onClick={()=>setSezione("cucina")}>
          👨‍🍳 Cucina
        </button>

        <button onClick={()=>setSezione("cassa")}>
          💰 Cassa
        </button>

      </nav>


      {sezione==="tavoli" &&

      <div style={{
        padding:"20px",
        display:"grid",
        gridTemplateColumns:"repeat(6,1fr)",
        gap:"12px"
      }}>

        {tavoli.map(t=>(

          <button
          key={t.numero}
          onClick={()=>cambiaTavolo(t.numero)}
          style={{
            height:"70px",
            background:t.occupato?"#d32f2f":"#2e7d32",
            color:"white",
            border:"none",
            borderRadius:"10px",
            fontSize:"20px"
          }}>

          Tavolo {t.numero}

          </button>

        ))}

      </div>

      }


      {sezione==="menu" &&
      <div style={{padding:"30px"}}>
        <h2>🍕 Menu</h2>
        <p>Pizza classica</p>
        <p>Pizza speciale</p>
        <p>☕ Caffetteria</p>
        <p>🍰 Dolci</p>
        <p>🍨 Gelati</p>
        <p>👶 Menù bimbi</p>
      </div>
      }


      {sezione==="cucina" &&
      <div style={{padding:"30px"}}>
        <h2>👨‍🍳 Cucina</h2>
        <p>Nessun ordine in attesa</p>
      </div>
      }


      {sezione==="cassa" &&
      <div style={{padding:"30px"}}>
        <h2>💰 Cassa</h2>
        <p>Incasso giornata: €0</p>
        <p>Pagamento: Contanti / Carta / Bancomat</p>
      </div>
      }


    </div>

  );
}
