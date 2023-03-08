import React from "react";
//import "./About.css";
import paradisimg from "../images/paradis.png";
const AboutCard = () =>{
    return(
        <>
           <div className="section">
            <div className="container">
                <div className="title">
                    <h1>About us</h1>
                </div>
                <div className="content">
                    <div className="article">
                        <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati eligendi, enim, illo voluptatibus tempore perspiciatis recusandae quod commodi maxime dolorum omnis placeat. Quae, excepturi nobis iusto voluptate porro modi adipisci.</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda excepturi unde sint, eligendi labore soluta nesciunt at! Natus possimus magni autem laborum, modi ab aliquid eos vitae alias id nesciunt?</p>
                        <div className="button">
                            <a href="">Read</a>
                        </div>
                    </div>
                </div>
                <div className = "image-section">
                    <img src={paradisimg} alt=""/>
                </div>
            </div>
           </div>
        </>
    )
}
export default AboutCard