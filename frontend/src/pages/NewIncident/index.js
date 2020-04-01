import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

export default function NewIncident(){
    const ongId = localStorage.getItem('ongId');
    const [titulo, setTitulo] = useState('');
    const [descriptions, setDescriptions] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();
        const data = {
            titulo,
            descriptions,
            value
        };
        try{
            await api.post("incidents", data, {
                headers: {
                    Authorization: ongId,
                }
            })
            alert("Cadastro realizado com sucesso!");

            history.push("/profile");
        }catch(err){
            alert("Não foi possivel realizar o cadastro, tende novamente.");

        }
    }

    
    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Casdastrar novo caso</h1>
                    <p>Descreva seu caso detalhadamete para encontrar um heroi que resolvera isto.</p>

                    <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Titulo do caso"
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}
                    />

                    <textarea 
                        placeholder="Descrição"
                        value={descriptions}
                        onChange={e => setDescriptions(e.target.value)}    
                    />

                    <input 
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}    
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}