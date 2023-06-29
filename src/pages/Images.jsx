import '../styles/Images.css';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Loading from '../components/Loading';

const Images = () => {
    document.title = "Pixify | Images Generation Tool";
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState(null);

    const prompts = [
        "A whimsical forest made entirely of candy.",
        "An underwater city populated by friendly mermaids.",
        "A futuristic metropolis with flying cars and skyscrapers.",
        "A serene mountain landscape with a cascading waterfall.",
        "A mystical dragon guarding a treasure-filled cave.",
        "A surreal garden filled with floating flowers and glowing mushrooms.",
        "A steampunk-inspired world with clockwork machinery and gears.",
        "A vibrant cityscape at night with neon lights and bustling streets.",
        "An alien planet with colorful flora and unusual wildlife.",
        "A cozy cottage surrounded by fields of blooming sunflowers.",
        "A celestial sky filled with swirling galaxies and shooting stars.",
        "A futuristic space station orbiting a distant planet.",
        "A tranquil beach scene with crystal-clear turquoise water and palm trees.",
        "A mystical forest inhabited by mythical creatures like unicorns and fairies.",
        "An ancient temple hidden deep within a dense jungle.",
        "A surreal desert landscape with towering sand dunes and a blazing sun.",
        "A magical castle floating in the clouds.",
        "A bustling marketplace in a bustling Arabian city.",
        "A serene zen garden with carefully arranged rocks and raked sand.",
        "A fantastical underwater world with vibrant coral reefs and exotic marine life."
    ];

    const getImages = async () => {
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
            // const response = await fetch("http://localhost:8000/generations", options);
            const response = await fetch("https://aryang-ai.onrender.com/generations", options);
            const data = await response.json();
            let imagesGenerated = [];
            imagesGenerated = [...imagesGenerated, data.data];
            setImages(data.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const writePrompt = () => {
        const randomIndex = Math.floor(Math.random() * prompts.length);
        const randomPrompt = prompts[randomIndex];
        setValue(randomPrompt);
    }

    if (isLoading) {
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-light" style={{ borderBottom: "1px solid #E8E8E8" }}>
                    <NavLink className="navbar-brand" to="/images">
                        <img src="https://i.ibb.co/4731Xq7/logo-ag.png" width="35" height="35" className="d-inline-block align-top" alt="" />
                        <span style={{ color: "black", fontWeight: "bold" }}>&nbsp; Pixify</span>
                    </NavLink>
                    <div className="collapse navbar-collapse" style={{ color: "black" }} id="navbarNav">
                        <ul className="navbar-nav" style={{ color: "black" }}>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item" style={{ color: "black" }}>
                                <NavLink className="nav-link" to="/chat">ChatBot</NavLink>
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
                <div className="app1">
                    <section className="main">
                        <div className="input-container1">
                            <p>Start with a detailed description <span onClick={writePrompt}>Surprise Me</span></p>
                        </div>
                        <div className="input-container">
                            <input type="text" placeholder="An Impressionist oil painting of sunflowers in a purple vase…" value={value} onChange={(e) => setValue(e.target.value)} />
                            <input type="button" id="submit" onClick={getImages} value="Generate" />
                        </div>
                        <Loading style={{ marginTop: "100px" }} />
                    </section>
                </div>
            </>
        );
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ borderBottom: "1px solid #E8E8E8" }}>
                <NavLink className="navbar-brand" to="/images">
                    <img src="https://i.ibb.co/4731Xq7/logo-ag.png" width="35" height="35" className="d-inline-block align-top" alt="AryanG AI Logo" />
                    <span style={{ color: "black", fontWeight: "bold" }}>&nbsp; Pixify (Generate Images)</span>
                </NavLink>
                <div className="collapse navbar-collapse" style={{ color: "black" }} id="navbarNav">
                    <ul className="navbar-nav" style={{ color: "black" }}>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item" style={{ color: "black" }}>
                            <NavLink className="nav-link" to="/chat">ChatBot</NavLink>
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
            <div className="app1">
                <section className="main">
                    <div className="input-container1">
                        <p>Start with a detailed description <span onClick={writePrompt}>Surprise Me</span></p>
                    </div>
                    <div className="input-container">
                        <input type="text" placeholder="An Impressionist oil painting of sunflowers in a purple vase…" value={value} onChange={(e) => setValue(e.target.value)} />
                        <input type="button" id="submit" onClick={getImages} value="Generate" />
                    </div>
                    <div id="cover">
                        {images?.map((image, index) => {
                            return (
                                <img src={image.url} key={index} alt='Generated' />
                            )
                        })}
                    </div>
                </section>
            </div>
            <section style={{ height: "50px", backgroundColor: "black", color: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div className="containers" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <p className="text-center mt-1 mb-0" style={{ fontWeight: "bold", fontSize: "1.1rem" }}>&copy; Created By Aryan Garg @{new Date().getFullYear()}</p>
                </div>
            </section>
        </>
    );
}

export default Images;