import '../styles/Variations.css';
import { ImCross } from "react-icons/im";
import { NavLink } from 'react-router-dom';
import Loading from '../components/Loading';
import React, { useState, useRef } from 'react';

const Variations = () => {
    document.title = "Pixify | Image Variations Generation Tool";
    const [selectedImage, setSelectedImage] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [variations, setVariations] = useState(null);
    const [error, setError] = useState(null);
    const ref = useRef(null);

    const closeModal = () => {
        setModalOpen(false);
        setSelectedImage(null);
    }

    const uploadImage = async (e) => {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        setModalOpen(true);
        setSelectedImage(e.target.files[0]);
        e.target.value = null;

        try {
            const options = {
                method: 'POST',
                body: formData,
            };
            const response = await fetch('http://localhost:8000/upload', options);
            const data = await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    const generateVariations = async () => {
        setIsLoading(true);
        setVariations(null);
        if (selectedImage == null) {
            setModalOpen(false);
            return;
        }
        try {
            const options = {
                method: 'POST',
            };
            // const response = await fetch('http://localhost:8000/variations', options);
            const response = await fetch('https://aryang-ai.onrender.com/variations', options);
            setModalOpen(false);
            const data = await response.json();
            setIsLoading(false);
            setVariations(data);
        } catch (error) {
            console.error(error);
        }
    }


    const checkSize = () => {
        if (ref.current.width === 256 && ref.current.height === 256) {
            generateVariations();
        } else {
            setError("Error: Image must be 256x256 px");
        }
    }

    if (isLoading && !variations) {
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-light" style={{ borderBottom: "1px solid #E8E8E8" }}>
                    <NavLink className="navbar-brand" to="/generateImageVariations">
                        <img src="https://i.ibb.co/4731Xq7/logo-ag.png" width="35" height="35" className="d-inline-block align-top" alt="AryanG AI Logo" />
                        <span style={{ color: "black", fontWeight: "bold" }}>&nbsp; Pixify (Image Variations)</span>
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
                                <NavLink className="nav-link" to="/generateQueries">SQL Queries</NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="containerss">
                    {!variations && <p style={{ marginTop: "100px" }}>Transforming Images with Pixify: Discover Captivating Variations</p>}
                    <span style={{ cursor: "pointer" }}>
                        <label htmlFor="files" style={{ color: "black", margin: "100px", marginTop: "100px", cursor: "pointer" }}>Upload An Image</label>
                        <input id="files" accept="image/*" type="file" hidden onChange={uploadImage} />
                    </span>
                    <p style={{ color: "red" }}>* Image Should Be (256x256) px</p>
                    {modalOpen &&
                        <div className="overlay">
                            <div className="modal">
                                <div onClick={closeModal} style={{ marginRight: "-270px" }}><ImCross /></div>
                                <div className="img-container">
                                    {selectedImage && <img ref={ref} src={URL.createObjectURL(selectedImage)} alt="Uploaded Pic" />}
                                </div>
                                <p className="mt-2" style={{ color: "red" }}>{error || "* Image Must Be 256x256 px"}</p>
                                {!error && <button onClick={checkSize} style={{ color: "black", cursor: "pointer" }}>Generate Variations</button>}
                                {error && <button onClick={closeModal} style={{ color: "black", cursor: "pointer" }}>Close this and try again</button>}
                            </div>
                        </div>
                    }
                    <Loading />
                </div >
            </>
        );
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ borderBottom: "1px solid #E8E8E8" }}>
                <NavLink className="navbar-brand" to="/generateImageVariations">
                    <img src="https://i.ibb.co/4731Xq7/logo-ag.png" width="35" height="35" className="d-inline-block align-top" alt="AryanG AI Logo" />
                    <span style={{ color: "black", fontWeight: "bold" }}>&nbsp; Pixify (Image Variations)</span>
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
                            <NavLink className="nav-link" to="/generateQueries">SQL Queries</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="containerss">
                {!variations && <p style={{ marginTop: "100px" }}>Transforming Images with Pixify: Discover Captivating Variations</p>}
                {!variations && <span style={{ cursor: "pointer" }}>
                    <label htmlFor="files" style={{ color: "black", margin: "100px", marginTop: "100px", cursor: "pointer" }}>Upload An Image</label>
                    <input id="files" accept="image/*" type="file" hidden onChange={uploadImage} />
                </span>}
                {!variations && <p style={{ color: "red" }}>* Image Should Be (256x256) px</p>}
                {modalOpen &&
                    <div className="overlay">
                        <div className="modal">
                            <div onClick={closeModal} style={{ marginRight: "-270px" }}><ImCross /></div>
                            <div className="img-container">
                                {selectedImage && <img ref={ref} src={URL.createObjectURL(selectedImage)} alt="Uploaded Pic" />}
                            </div>
                            <p className="mt-2" style={{ color: "red" }}>{error || "* Image Must Be 256x256 px"}</p>
                            {!error && <button onClick={checkSize} style={{ color: "black", cursor: "pointer" }}>Generate Variations</button>}
                            {error && <button onClick={closeModal} style={{ color: "black", cursor: "pointer" }}>Close this and try again</button>}
                        </div>
                    </div>
                }
                <div id="cover">
                    {variations && variations.map((variation, index) => (
                        <img key={index} src={variation.url} height="256px" width="256px" alt={`Variation ${index + 1}`} />
                    ))}
                </div>
            </div >
            <section style={{ height: "50px", backgroundColor: "black", color: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div className="containers" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <p className="text-center mt-1 mb-0" style={{ fontWeight: "bold", fontSize: "1.1rem" }}>&copy; Created By Aryan Garg @{new Date().getFullYear()}</p>
                </div>
            </section>
        </>
    );
};

export default Variations;
