import React from 'react';
import '../styles/Error.css';
import {NavLink} from 'react-router-dom';

const Error = () => {
    document.title="Error 404 | Page Not Found, Go to Home Page";
    return (
        <section class="page_404">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 ">
                        <div class="col-sm-10 col-sm-offset-1  text-center">
                            <div class="four_zero_four_bg">
                                <h1 class="text-center" style={{color:"black"}}>404</h1>
                            </div>
                            <div class="contant_box_404">
                                <h3 class="h2" style={{color:"black"}}>
                                    Look's like you're lost
                                </h3>
                                <p style={{color:"black"}}>The page you are looking for is not available!</p>
                                <NavLink to="/" class="link_404" style={{color:"white", backgroundColor:"#39ac31", padding: "10px 20px", textDecoration:"none"}}>Go to Home</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Error;