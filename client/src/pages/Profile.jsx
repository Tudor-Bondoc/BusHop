import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Rezervare from "../components/Rezervare"
import { AuthContext } from '../helpers/AuthContext';
import axios from "axios";
import Slider from "react-slick"
import "../styles/Profile.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", color: "blue", fontSize: "24px" }}
        onClick={onClick}
      >
        {'Next'}
      </div>
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", color: "blue", fontSize: "24px" }}
        onClick={onClick}
      >
        {'Prev'}
      </div>
    );
  }

export default function Profile() {

    const { authState } = React.useContext(AuthContext);
    const [user, setUser] = React.useState(
        {
            nume: "",
            email: "",
            telefon: ""
        }
    )

    const [rezervari, setRezervari] = React.useState([]);
    const [listaCurse, setListaCurse] = React.useState([])
    const [listaTrasee, setListaTrasee] = React.useState([])
    const [listaAutocare, setListaAutocare] = React.useState([])

    const [currentIndex, setCurrentIndex] = React.useState(0);
    const totalRezervari = rezervari.length;

    const getUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:3002/pasageri/${authState.id}`);
            if (response.data.error)
                console.log("Aici e problema")
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    React.useEffect(()=>{

        getUserData()

        axios.get(`http://localhost:3002/rezervari/byuser/${user.nume}`).then((response)=>{
            setRezervari(response.data)
        })

        axios.get("http://localhost:3002/curse").then((response)=> {
            setListaCurse(response.data)
        })

        axios.get("http://localhost:3002/trasee").then((response)=> {
            setListaTrasee(response.data)
        })

        axios.get("http://localhost:3002/autocare").then((response)=> {
            setListaAutocare(response.data)
        })

    }, [authState.id, user.nume])

    const getCursaDetails = (cursaID) => {
        const cursa = listaCurse.find(cursa => cursa.id === cursaID);
        if (cursa) {
            const traseu = listaTrasee.find(traseu => traseu.id === cursa.TraseuID);
            const autocar = listaAutocare.find(autocar => autocar.id === cursa.AutocarID);
            const status = cursa.status
            return { traseu, autocar, cursa };
        }
        return null;
    };

    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      arrows: false
    };

  
    return (
      <div className="profile--container">
          <Header />
          <div className="profile--tabs">
              <div className="profile--tab1">
                  <h1>{user.nume}</h1>
                  <h2>{user.email}</h2>
                  <h3>{user.telefon}</h3>
              </div>
              <div className="profile--tab2">
              <h1 className="profile--tab2--title">Rezervari</h1>
              <div className="rezervari-container slick-slider">
                <Slider {...settings}>  
                  {rezervari.map((rezervare, index) => {
                      const { traseu, autocar, cursa } = getCursaDetails(rezervare.CursaID);
                      return (
                          <Rezervare
                              key={index}
                              idCursa={rezervare.CursaID}
                              orasplecare={traseu.oras_pornire}
                              orassosire={traseu.oras_sosire}
                              autocar={autocar.numar_inmatriculare}
                              status={cursa.status}
                              ziplecare={cursa.zi_plecare}
                              oraplecare={cursa.ora_plecare}
                              orasosire={cursa.ora_sosire}
                              loc={rezervare.loc}
                          />
                      );
                  })}
                  </Slider>
              </div>
              </div>
          </div>
      </div>
  );
}