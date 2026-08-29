import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE } from "../api";
import { useNavigate, useLocation } from "react-router";

import catImage from "../assets/pets/cat_normalState.png";
import dogImage from "../assets/pets/dog_normalState.png";
import bunnyImage from "../assets/pets/bunny_normalState.png";

import parkImage from "../assets/background/park.jpg";
import beachImage from "../assets/background/beach.jpg";
import nightImage from "../assets/background/night.jpg";

function PetSetup() {
  const navigate = useNavigate();
  const location = useLocation();
  const editing = location.state?.editing === true;

  const [petType, setPetType] = useState("");
  const [background, setBackground] = useState("");
  const [petName, setPetName] = useState("");
  const [loading, setLoading] = useState(editing);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!editing) {
      return;
    }

    async function fetchPet() {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${API_BASE}/pets`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const pet = response.data;

        setPetName(pet.name);

        setPetType(pet.type);

        setBackground(pet.background);
      } catch (err) {
        console.error("Failed to fetch pet:", err);

        setError("Could not load your current pet.");
      } finally {
        setLoading(false);
      }
    }

    fetchPet();
  }, [editing]);

  async function handlePetSubmit() {
    if (!petType || !background || !petName.trim()) {
      setError("Please complete all pet details.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      let response;

      if (editing) {
        // UPDATE existing pet
        response = await axios.put(
          `${API_BASE}/pets`,
          {
            name: petName.trim(),
            type: petType,
            background: background,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("Pet updated:", response.data);
      } else {
        // CREATE new pet
        response = await axios.post(
          `${API_BASE}/pets`,
          {
            name: petName.trim(),
            type: petType,
            background: background,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("Pet created:", response.data);
      }

      navigate("/home", {
        replace: true,
      });
    } catch (err) {
      console.error(
        editing ? "Failed to update pet:" : "Failed to create pet:",
        err,
      );

      if (err.response) {
        setError(
          err.response.data.message ||
            (editing ? "Could not update pet." : "Could not create pet."),
        );
      } else {
        setError("Could not reach the server.");
      }
    }
  }

  if (loading) {
    return <p>LOADING YOUR PET...</p>;
  }

  return (
    <div className="pixel-auth-page">
      <div className="pixel-cloud pixel-cloud-1"></div>
      <div className="pixel-cloud pixel-cloud-2"></div>
      <div className="pixel-auth-container">
        <div className="pixel-top-decoration">♡ ♡ ♡</div>
        <section className="pixel-login-section">
          <div className="pixel-section-label">
            <span>{editing ? "EDIT YOUR PET!" : "NEW PET OWNER!"}</span>
          </div>
          <h1 className="pixel-title">
            {editing ? "EDIT YOUR PET" : "CREATE YOUR PET"}
          </h1>
          <p className="pixel-login-description">
            {editing ? (
              <>
                CHOOSE YOUR NEW COMPANION
                <br />
                AND UPDATE YOUR WORLD
              </>
            ) : (
              <>
                CHOOSE YOUR COMPANION
                <br />
                AND CREATE YOUR WORLD
              </>
            )}
          </p>

          <div className="pet-setup-group">
            <h3 className="pet-setup-label">CHOOSE YOUR PET</h3>

            <div className="pet-options">
              <button
                type="button"
                className={`pet-option ${petType === "cat" ? "selected" : ""}`}
                onClick={() => setPetType("cat")}
              >
                <img src={catImage} alt="Cat" />
                <span>CAT</span>
              </button>

              <button
                type="button"
                className={`pet-option ${petType === "dog" ? "selected" : ""}`}
                onClick={() => setPetType("dog")}
              >
                <img src={dogImage} alt="Dog" />
                <span>DOG</span>
              </button>

              <button
                type="button"
                className={`pet-option ${
                  petType === "bunny" ? "selected" : ""
                }`}
                onClick={() => setPetType("bunny")}
              >
                <img src={bunnyImage} alt="Bunny" />
                <span>BUNNY</span>
              </button>
            </div>
          </div>

          <div className="pet-setup-group background-group">
            <h3 className="pet-setup-label">CHOOSE YOUR WORLD</h3>
            <div className="background-options">
              <button
                type="button"
                className={`background-option ${
                  background === "park" ? "selected" : ""
                }`}
                onClick={() => setBackground("park")}
              >
                <img src={parkImage} alt="Park" />
                <span>PARK</span>
              </button>
              <button
                type="button"
                className={`background-option ${
                  background === "beach" ? "selected" : ""
                }`}
                onClick={() => setBackground("beach")}
              >
                <img src={beachImage} alt="Beach" />
                <span>BEACH</span>
              </button>

              <button
                type="button"
                className={`background-option ${
                  background === "night" ? "selected" : ""
                }`}
                onClick={() => setBackground("night")}
              >
                <img src={nightImage} alt="Night" />
                <span>NIGHT</span>
              </button>
            </div>
          </div>
          <div className="pet-name-group">
            <label className="pixel-form-label" htmlFor="petName">
              NAME YOUR PET
            </label>
            <input
              id="petName"
              type="text"
              className="pixel-form-input"
              placeholder="ENTER PET NAME"
              value={petName}
              onChange={(event) => setPetName(event.target.value)}
            />
          </div>

          {error && <p className="dashboard-error">{error}</p>}
          <button
            type="button"
            className="pixel-login-button"
            onClick={handlePetSubmit}
          >
            {editing ? "UPDATE PET" : "CREATE PET"}
          </button>
        </section>

        <div className="pixel-bottom-scene">
          <div className="pixel-city">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="pixel-water">
            <div className="pixel-wave"></div>
            <div className="pixel-wave"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetSetup;
