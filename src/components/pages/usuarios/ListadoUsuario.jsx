import Header from "../../helpers/Header";
import './ListadoUsuario.css'
import React, { useState, useEffect } from "react";
import { iniDatabase } from "../../config/firebaseConfig";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const ListadoUsuario = () => {
    const [usuarios, setUsuarios] = useState([])
    let redireccion = useNavigate();

    async function getUsuarios() {

        let resultado = collection(iniDatabase, 'usuarios');
        let data = await getDocs(resultado)
        /* Si es un arreglo, puedo iterarlo con los métodos de JS
        map */
        console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setUsuarios(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

        // console.log(data.docs.map(function(){});

    }
    // para que deje de hacer la funcion infinita y se guarde el cambio 
    useEffect(() => {
        getUsuarios();
    }, [])

    // Logica para eliminar un usuario
    const eliminarUsuario = async (id) => {
        console.log("eliminando :" + id);
        let deleteUser = doc(iniDatabase, "usuarios", id);
        await deleteDoc(deleteUser);
        getUsuarios()
    }

    //Animacion donde sale desea confirmar eliminar o no 

    function confirmar(id){
        Swal.fire({
            title: "Está seguro pedazo de basura?",
            text: "si elimina esto ya no lo vuelve a ver!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, parcero quiero borrar esto"
          }).then((result) => {
            if (result.isConfirmed) {
                eliminarUsuario(id)
              Swal.fire({
                title: "Eliminado!",
                text: "Fue eliminado como el amor de ella.",
                icon: "success"
              });
            }
          });
    }

    return (
        <section className="panel">
            <Header />
            <main className="panel-contenido">
                {
                    usuarios.map((usuario) => (
                        <section>
                            <section>
                                <p>Nombre: {usuario.name}</p>
                                <p>Usuario: {usuario.user}</p>
                                <p>Correo: {usuario.email}</p>
                            </section>
                            <div>
                                <Link>Editar  </Link>
                                <button onClick={() => confirmar(usuario.id)}>Eliminar</button>

                            </div>
                        </section>
                    ))


                }


            </main>
        </section>
    );
};

export default ListadoUsuario;
