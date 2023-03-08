import React from "react";
import {useLocation, Link} from "react-router-dom";
import "./head.css";

const head = () => {
    const location = useLocation()
    return(
        <>
        <section className="image-heading">
            <div className="container">
                <h1>{location.pathname.split("/")[1]}</h1>

                <button>
                    <Link to='/'>Home / </Link>
                    <h1>{location.pathname.split("/")[1]}</h1>
                </button>
            </div>
        </section>
        </>
    )
}

export default head