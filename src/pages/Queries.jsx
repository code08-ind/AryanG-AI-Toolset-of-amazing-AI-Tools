import '../styles/Queries.css';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Loading from '../components/Loading';
import CodeDisplay from '../components/CodeDisplay';

const Queries = () => {
    document.title = "Querify | A SQL Query Generation Tool";
    const [query, setQuery] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState("");

    const getQuery = async () => {
        setIsLoading(true);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: value
            })
        };
        try {
            // const response = await fetch('http://localhost:8000/query', options);
            const response = await fetch('https://aryang-ai.onrender.com/query', options);
            const data = await response.json();
            const userMessage = {
                role: "user",
                content: value
            };
            setQuery(oldQuery => [...oldQuery, data, userMessage]);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    const clearChat = () => {
        setValue("");
        setQuery([]);
    }

    const filteredUserMessages = query.filter(message => message.role === "user");
    const latestQueryCode = query.filter(message => message.role === "assistant").pop();

    if (isLoading) {
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-light" style={{ borderBottom: "1px solid #E8E8E8" }}>
                    <NavLink className="navbar-brand" to="/generateQueries">
                        <img src="https://i.ibb.co/4731Xq7/logo-ag.png" width="35" height="35" className="d-inline-block align-top" alt="AryanG AI Logo" />
                        <span style={{ color: "black", fontWeight: "bold" }}>&nbsp; Querify</span>
                    </NavLink>
                    <div className="collapse navbar-collapse" style={{ color: "black" }} id="navbarNav">
                        <ul className="navbar-nav" style={{ color: "black" }}>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item" style={{ color: "black" }}>
                                <NavLink className="nav-link" to="/chat">ChatBot</NavLink>
                            </li>
                            <li className="nav-item" style={{ color: "black" }}>
                                <NavLink className="nav-link" to="/images">Generate Images</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/generateImageVariations">Image Variations</NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="apps" style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Loading />
                </div >
            </>
        );
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ borderBottom: "1px solid #E8E8E8" }}>
                <NavLink className="navbar-brand" to="/generateQueries">
                    <img src="https://i.ibb.co/4731Xq7/logo-ag.png" width="35" height="35" className="d-inline-block align-top" alt="AryanG AI Logo" />
                    <span style={{ color: "black", fontWeight: "bold" }}>&nbsp; Querify</span>
                </NavLink>
                <div className="collapse navbar-collapse" style={{ color: "black" }} id="navbarNav">
                    <ul className="navbar-nav" style={{ color: "black" }}>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item" style={{ color: "black" }}>
                            <NavLink className="nav-link" to="/chat">ChatBot</NavLink>
                        </li>
                        <li className="nav-item" style={{ color: "black" }}>
                            <NavLink className="nav-link" to="/images">Generate Images</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/generateImageVariations">Image Variations</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="apps">
                {filteredUserMessages.map((message, index) => {
                    return (
                        <div key={index} className="message-display">
                            <p id="icon" >⊚</p>
                            <p style={{ textTransform: "capitalize", color: "black" }}>{message.content}</p>
                        </div>
                    );
                })}
                <input id="inp" type="text" value={value} style={{ textTransform: "capitalize", color: "black" }} placeholder="Ask For A SQL Query (Eg: Retrieve All Records From A Table Named 'Customers')" onChange={(e) => setValue(e.target.value)} />
                <CodeDisplay queryCode={latestQueryCode?.content || ""} />
                <div className="button-container">
                    <button id="get-query" onClick={getQuery}>Get Query</button>
                    <button id="clear-chat" onClick={clearChat}>Clear Chat</button>
                </div>
            </div>
            <section style={{ height: "50px", backgroundColor: "black", color: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div className="containers" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <p className="text-center mt-1 mb-0" style={{ fontWeight: "bold", fontSize: "1.1rem" }}>&copy; Created By Aryan Garg @{new Date().getFullYear()}</p>
                </div>
            </section>
        </>
    );
}

export default Queries;