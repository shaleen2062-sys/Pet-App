import {useState, useEffect} from "react";
import axios from "axios";
import {API_BASE} from "../api";

import catImage from "../assets/pets/cat_normalState.png";
import dogImage from "../assets/pets/dog_normalState.png";
import bunnyImage from "../assets/pets/bunny_normalState.png";

import catEatImage from "../assets/pets/cat_eatState.png";
import catPlayImage from "../assets/pets/cat_playState.png";
import catSleepImage from "../assets/pets/cat_sleepState.png";

import dogEatImage from "../assets/pets/dog_eatState.png";
import dogPlayImage from "../assets/pets/dog_playState.png";
import dogSleepImage from "../assets/pets/dog_sleepState.png";

import bunnyEatImage from "../assets/pets/bunny_eatState.jpg";
import bunnyPlayImage from "../assets/pets/bunny_playState.jpg";
import bunnySleepImage from "../assets/pets/bunny_sleepState.jpg";

import parkImage from "../assets/background/park.jpg";
import beachImage from "../assets/background/beach.jpg";
import nightImage from "../assets/background/night.jpg";

function PetDashboard(){
    const [pet,setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [action, setAction] = useState("normal");

    async function fetchPet(){
        try{
            const token = localStorage.getItem("token");
            const response = await axios.get(`${API_BASE}/pets`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            setPet(response.data);
        }catch(err){
            console.error("Failed to fetch Pet:",err);
            if (err.response){
                setError(err.response.data.message || "could not load pet.");
            }else{
                setError("could not reach the server")
            }
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        fetchPet();
    },[]);

    async function feedPet() {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.put(`${API_BASE}/pets/feed`,{},
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
            );

            setPet(response.data);

            setAction("eating");

            setTimeout(() => {
            setAction("normal");
            }, 1500);

        } catch (err) {
            console.error("Failed to feed pet:", err);

            if (err.response) {
            setError(
                err.response.data.message || "Could not feed pet."
            );
            } else {
            setError("Could not reach the server.");
            }
        }
    }

    async function playPet() {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.put(`${API_BASE}/pets/play`,{},
            {
                headers: {
                Authorization: `Bearer ${token}`,},
            }
            );

            setPet(response.data);

            setAction("playing");

            setTimeout(() => {
            setAction("normal");
            }, 1500);

        } catch (err) {
            console.error("Failed to play with pet:", err);

            if (err.response) {
            setError(
                err.response.data.message ||
                "Could not play with pet."
            );
            } else {
            setError("Could not reach the server.");
            }
        }
    }

    async function sleepPet() {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.put(`${API_BASE}/pets/sleep`,{},
            {
                headers: {
                Authorization: `Bearer ${token}`,},
            }
            );

            setPet(response.data);

            setAction("sleeping");

            setTimeout(() => {
            setAction("normal");
            }, 1500);

        } catch (err) {
            console.error("Failed to put pet to sleep:", err);

            if (err.response) {
            setError(
                err.response.data.message ||
                "Could not put pet to sleep."
            );
            } else {
            setError("Could not reach the server.");
            }
        }
    }

    function getPetImage() {
        if (pet.type === "cat") {
            if (action === "eating") {
            return catEatImage;
            }

            if (action === "playing") {
            return catPlayImage;
            }

            if (action === "sleeping") {
            return catSleepImage;
            }
            return catImage;
        }
    

        if (pet.type === "dog") {
            if (action === "eating") {
            return dogEatImage;
            }

            if (action === "playing") {
            return dogPlayImage;
            }

            if (action === "sleeping") {
            return dogSleepImage;
            }
            return dogImage;
        }

        if (pet.type === "bunny") {
            if (action === "eating") {
            return bunnyEatImage;
            }

            if (action === "playing") {
            return bunnyPlayImage;
            }

            if (action === "sleeping") {
            return bunnySleepImage;
            }

            return bunnyImage;
        }
        return null;
    }

    function getBackgroundImage() {

        if (pet.background === "park") {
            return parkImage;
        }

        if (pet.background === "beach") {
            return beachImage;
        }

        if (pet.background === "night") {
            return nightImage;
        }

        return parkImage;
    }



    if (loading) {
        return <p>LOADING YOUR PET...</p>;
    }

    if (error && !pet) {
        return (
            <div className="pet-dashboard-page">
                <div className="pet-game-container">
                    <p className="dashboard-message">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    return (

        <div className="pet-dashboard-page">

            <div className="pet-game-container">

                <div className="dashboard-header">

                    <div className="dashboard-decoration">
                        ♡ ♡ ♡
                    </div>

                    <h1>PET CONTROLLER</h1>

                    <p>YOUR PIXEL PET COMPANION</p>

                </div>

                <div className="pet-name-display">

                    <span className="pet-name-label">
                        YOUR PET
                    </span>

                    <h2>{pet.name}</h2>

                    <div className="pet-hearts">
                        ♥ ♥ ♥
                    </div>

                </div>

                <div
                    className="pet-game-scene"
                    style={{
                        backgroundImage: `url(${getBackgroundImage()})`
                    }}
                >

                    <div className="pet-character">

                        <img
                            src={getPetImage()}
                            alt={pet.type}
                        />

                    </div>

                </div>

                <div className="pet-status">

                    <div className="status-row">

                        <div className="status-label">
                            HUNGER
                        </div>

                        <div className="status-bar">

                            <div
                                className="status-fill hunger-fill"
                                style={{
                                    width: `${pet.hunger}%`
                                }}
                            ></div>

                        </div>

                        <div className="status-value">
                            {pet.hunger}
                        </div>

                    </div>

                    <div className="status-row">

                        <div className="status-label">
                            ENERGY
                        </div>

                        <div className="status-bar">

                            <div
                                className="status-fill energy-fill"
                                style={{
                                    width: `${pet.energy}%`
                                }}
                            ></div>

                        </div>

                        <div className="status-value">
                            {pet.energy}
                        </div>

                    </div>

                </div>

                {error && (

                    <div className="dashboard-error">
                        {error}
                    </div>

                )}

                <div className="pet-actions">

                    <button
                        type="button"
                        className="pet-action-button"
                        onClick={feedPet}
                    >FEED
                    </button>

                    <button
                        type="button"
                        className="pet-action-button"
                        onClick={playPet}
                    >
                        PLAY
                    </button>

                    <button
                        type="button"
                        className="pet-action-button"
                        onClick={sleepPet}
                    >
                        SLEEP
                    </button>

                </div>

                <div className="dashboard-footer">
                    <span>
                        TYPE: {pet.type.toUpperCase()}
                    </span>
                    <span>
                        WORLD: {pet.background.toUpperCase()}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default PetDashboard;