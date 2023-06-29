import '../styles/Chat.css';
import { BsSun } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import Loading from '../components/Loading';
import React, { useState, useEffect } from "react";
import { AiOutlineSend, AiOutlineThunderbolt, AiOutlineWarning } from "react-icons/ai";

const Months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const Chat = () => {
    document.title = 'AGChatify | Chatbot';
    const [value, setValue] = useState(null);
    const [valued, setValued] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [currentTitle, setCurrentTitle] = useState(null);

    const createNewChat = () => {
        setMessage(null);
        setValue("");
        setValued("");
        setCurrentTitle(null);
        setIsLoading(false);
    }

    const getMessages = async () => {
        setIsLoading(true);
        const options = {
            method: "POST",
            body: JSON.stringify({
                message: value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        };
        try {
            const response = await fetch("http://localhost:8000/completions", options);
            const data = await response.json();
            setMessage(data.choices[0].message);
            setIsLoading(false);
            setValued(value);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!currentTitle && value && message) {
            setCurrentTitle(value);
        }
        if (currentTitle && value && message) {
            setCurrentTitle(value);
        }
    }, [message, currentTitle]);

    if (isLoading && !message) {
        return (
            <>
                <div className="app">
                    <section className="side-bar">
                        <button onClick={createNewChat} style={{ color: "white" }}>+ &nbsp; New Chat</button>
                        <button><NavLink className="nav-link text-white" to="/">Home Page</NavLink></button>
                        <button><NavLink className="nav-link text-white" to="/images">Generate Images</NavLink></button>
                        <button><NavLink className="nav-link text-white" to="/generateImageVariations">Image Variations</NavLink></button>
                        <button><NavLink className="nav-link text-white" to="/generateQueries">SQL Queries</NavLink></button>
                        <nav>
                            <p>Made by Aryan Garg</p>
                        </nav>
                    </section>
                    <section className="main">
                        <Loading />
                    </section>
                </div>
            </>
        );
    }

    return (
        <div className="app">
            <section className="side-bar">
                <button onClick={createNewChat}>+ &nbsp; New Chat</button>
                <button><NavLink className="nav-link text-white" to="/">Home Page</NavLink></button>
                <button><NavLink className="nav-link text-white" to="/images">Generate Images</NavLink></button>
                <button><NavLink className="nav-link text-white" to="/generateImageVariations">Image Variations</NavLink></button>
                <button><NavLink className="nav-link text-white" to="/generateQueries">SQL Queries</NavLink></button>
                <nav>
                    <p>Made by Aryan Garg</p>
                </nav>
            </section>
            <section className="main">
                {!currentTitle && <h1>AGChatify</h1>}
                {!message && <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-lg-4">
                            <BsSun />
                            Examples
                        </div>
                        <div className="col-sm-6 col-lg-4">
                            <AiOutlineThunderbolt />
                            Capabilities
                        </div>
                        <div className="col-sm-6 col-lg-4">
                            <AiOutlineWarning />
                            Limitations
                        </div>
                    </div>
                    <div className="row1">
                        <div className="col-sm-6 col-lg-4">
                            "Explain Quantum Computing in simple terms"
                        </div>
                        <div className="col-sm-6 col-lg-4">
                            Remembers what user said earlier in the conversation
                        </div>
                        <div className="col-sm-6 col-lg-4">
                            May occasionally generate incorrect information
                        </div>
                    </div>
                    <div className="row1">
                        <div className="col-sm-6 col-lg-4">
                            "Got any creative ideas for a 10 year old's birthday?"
                        </div>
                        <div className="col-sm-6 col-lg-4">
                            Allows user to provide follow-up corrections
                        </div>
                        <div className="col-sm-6 col-lg-4">
                            May occasionally produce harmful or biased content
                        </div>
                    </div>
                    <div className="row1">
                        <div className="col-sm-6 col-lg-4">
                            "How do i make an HTTP request in JavaScript?"
                        </div>
                        <div className="col-sm-6 col-lg-4">
                            Trained to decline inappropriate requests
                        </div>
                        <div className="col-sm-6 col-lg-4">
                            Limited knowledge of world and events after 2021
                        </div>
                    </div>
                </div>}
                <ul className="feed">
                    {valued && <li id="val">
                        <p>{""}</p>
                        <p style={{ marginLeft: "70px" }}>{valued}</p>
                    </li>}
                    {message && <li>
                        <img src="https://i.ibb.co/4731Xq7/logo-ag.png" style={{ marginRight: "20px" }} height="50px" width="50px" alt="" />
                        <p>{message.content}</p>
                    </li>}
                </ul>
                <div className="bottom-section">
                    <div className="input-container">
                        <input type="text" placeholder="Send a Message." value={value} onChange={(e) => setValue(e.target.value)} />
                        <div id="submit" onClick={getMessages}><AiOutlineSend style={{ marginTop: "30px", color: "#fff" }} /></div>
                    </div>
                    <p className="info">
                        It is AGChatify's {Months[new Date().getMonth()]} Version. Free Research Preview.
                        Our Goal is to make a chatbot that can talk to you about anything.
                        Your Feedback will be helpful.
                    </p>
                </div>
            </section>
        </div>
    );
}

export default Chat;
