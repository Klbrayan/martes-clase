import React, { useState, useEffect } from "react";
import "./Login.css";
import { iniDatabase } from "../../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Registro = () => {

  const [usuarios, setUsuarios] = useState([])
  const [user, setuser] = useState("");
  const [password, setpassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  let redireccion = useNavigate();

  async function getUsuarios() {

    let resultado = collection(iniDatabase, 'usuarios');
    let data = await getDocs(resultado)
    /* Si es un arreglo, puedo iterarlo conlos métodos de JS
    map */
    console.log(data.docs.map((doc) => ({ ...doc.data() })));
    setUsuarios(data.docs.map((doc) => ({ ...doc.data() })));

    // console.log(data.docs.map(function(){});

  }
  // para que deje de hacer la funcion infinita y se guarde el cambio 
  useEffect(() => {
    getUsuarios();
  }, [])


  // es importante colocar los [] porque aqui se guarda los datos

  const buscarUsuario = () => {
    let estado = usuarios.some((usuario) => usuario.user === user );

    return estado
  };

  const registrarUsuario = () => {
    if (!buscarUsuario()) {

      Swal.fire({
        title: "Bienvenido",
        text: "Será redireccionado al panel principal",
        icon: "success"

      });
      redireccion('/home')
    } else {
      console.log("Error de credenciales")
      Swal.fire({
        title: "ERROR",
        text: "El usuario ya existe en la base de datos",
        icon: "error"
      });
    }
  };



  //console.log(iniDatabase)
  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form">

          <input onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="email" />
          <input onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="name" />
          <input onChange={(e) => setpassword(e.target.value)}
            type="password"
            placeholder="password" />
          <input onChange={(e) => setuser(e.target.value)}
            type="text"
            placeholder="username" />



          <button onClick={registrarUsuario} type="button">Registro</button>
          <p className="message">
            Ya está registrado? <Link to="/">Iniciar sesion</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registro;
