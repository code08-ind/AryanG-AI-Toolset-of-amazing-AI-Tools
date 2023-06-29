import React from 'react';
import '../styles/Home.css';
import { NavLink } from 'react-router-dom';

const Home = () => {
    document.title = "AryanG AI | Toolset of amazing AI Tools";
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light">
                <NavLink className="navbar-brand" to="/" style={{ fontWeight: "bold" }}>
                    <img src="https://i.ibb.co/4731Xq7/logo-ag.png" width="35" height="35" className="d-inline-block align-top" alt="AryanG AI Logo" />
                    <span style={{ color: "black", fontWeight: "bold" }}>&nbsp; AryanG AI</span>
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/chat">ChatBot</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/images">Image Generations</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/generateImageVariations">Image Variations</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/generateQueries">SQL Queries</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="p-5 text-center bg-image rounded-3" style={{
                backgroundImage: "url('https://mdbcdn.b-cdn.net/img/new/slides/041.webp')",
                height: "400px",
                diplay: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
            }}
            >
                <div className="mask mt-4">
                    <div className="text-white" style={{ diplay: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "60px" }}>
                        <h1 className="mt-4 mb-1" style={{ fontWeight: "bold" }}>AryanG AI</h1>
                        <h5 className="mt-4 mb-1">Experience the power of AryanG AI: A dynamic web application offering seamless conversations with chatbots, stunning image generation and variation, and effortless SQL query creation. Unleash the possibilities of AI at your fingertips...</h5>
                    </div>
                </div >
            </div >
            <div className="container">
                <div className="row">
                    <div className="card" style={{ width: "16rem" }}>
                        <img className="card-img-top" src="https://plus.unsplash.com/premium_photo-1681380409766-792f2bbb3ffe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80" alt="Chat With Us" />
                        <div className="card-body">
                            <h5 className="card-title">Chat With Us</h5>
                            <p className="card-text">You can chat with us on any topic and our chatbot will answer your quesries.</p>
                            <NavLink to="/chat" className="btn btn-primary">Try The Tool</NavLink>
                        </div>
                    </div>
                    <div className="card" style={{ width: "16rem" }}>
                        <img className="card-img-top" src="https://images.unsplash.com/photo-1655720406100-3f1eda0a4519?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80" alt="Generate Pics" />
                        <div className="card-body">
                            <h5 className="card-title">Generate Images</h5>
                            <p className="card-text">You can generate the images by writing the text and AI will generate images.</p>
                            <NavLink to="/images" className="btn btn-primary">Try The Tool</NavLink>
                        </div>
                    </div>
                    <div className="card" style={{ width: "16rem" }}>
                        <img className="card-img-top" src="https://images.unsplash.com/photo-1655635643568-f30d5abc618a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80" alt="Generate Pic Variations" />
                        <div className="card-body">
                            <h5 className="card-title">Image Variations</h5>
                            <p className="card-text">You can generate variations of the images by submitting the actual image.</p>
                            <NavLink to="/generateImageVariations" className="btn btn-primary">Try The Tool</NavLink>
                        </div>
                    </div>
                    <div className="card" style={{ width: "16rem" }}>
                        <img className="card-img-top" src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1031&q=80" alt="Generate SQL Queries" />
                        <div className="card-body">
                            <h5 className="card-title">SQL Queries</h5>
                            <p className="card-text">You can generate SQL Queries of any problem and can copy & save them.</p>
                            <NavLink to="/generateQueries" className="btn btn-primary">Try The Tool</NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <section style={{ height: "50px", backgroundColor: "black", color: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div className="containers" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <p className="text-center mt-1 mb-0" style={{fontWeight:"bold", fontSize:"1.1rem"}}>&copy; Created By Aryan Garg @{new Date().getFullYear()}</p>
                </div>
            </section>
        </>
    );
}

export default Home;