import React from "react";
import axios from "axios"
import Traseu from "./components/Traseu";
import Header from "./components/Header";

export default function App() {

  const [listaTrasee, setListaTrasee] = React.useState([])

  //Mapare lista de trasee catre componenta Traseu
  const lista = listaTrasee.map((value, key) => {
    return(
      <Traseu
        key = {value.id}
        oras_pornire = {value.oras_pornire}
        oras_1 = {value.oras_1}
        oras_2 = {value.oras_2}
        oras_3 = {value.oras_3}
        oras_sosire = {value.oras_sosire}
        /*onClick = {()=>{navigate(`/post/${value.id}`)}}*/
      />
    )
  }) 

  //Request catre API pentru lista de trasee
  React.useEffect(()=> {
    axios.get("http://localhost:3002/trasee").then((response)=> {
      setListaTrasee(response.data)
    })
  }, [])



  return(
    <div>
      <Header />
      {lista}
    </div>
  )
}
