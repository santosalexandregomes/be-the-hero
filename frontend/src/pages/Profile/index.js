import React, {  useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile(){
    const history = useHistory();
    const [incidents, setIncidents] = useState([]);
    const ongNome = localStorage.getItem('ongNome');
    const ongId = localStorage.getItem('ongId');

    useEffect(() => {
        api.get("profile", {
            headers:{
                Authorization : ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`,{
                headers:{
                    Authorization: ongId,
                }
            });

        setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
            alert("Erro ao deletar, Tente novamente.");
        }
    }

    function handleLogof(){
        localStorage.clear();

        history.push("/");
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongNome}!</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>

                <button onClick={handleLogof} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
               {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.titulo}</p>
                        
                        <strong>Descrição: </strong>
                        <p>{incident.descriptions}</p>

                        <strong>Valor</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button  onClick={() => handleDeleteIncident(incident.id)}  type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>

                    </li>
               ))}
            </ul>
        </div>

    );
}