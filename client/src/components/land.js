import "../style/map.css";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const Land = (land) => {
  const [modal, setModal] = useState(false);
  const [owner, setOwner] = useState("");
  const [check, setCheck] = useState(true);
  const saleStatus = land.land.isForSale;
  const [grid, setGrid] = useState([]);
  const [point, setPoint] = useState("");
  const [updateLand, setUpdateLand] = useState({});
  const [gameMode, setGameMode] = useState(false);

  useEffect(() => {
    setUpdateLand(land.land);
  }, [land]);

  const update = async () => {
    const response = await fetch("http://localhost:8080/land/setLand", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        updateLand,
      }),
    });

    window.location.reload();
  };

  const ownerName = async () => {
    const response = await fetch("http://localhost:8080/user/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: land.land.ownerId,
      }),
    });
    const data = await response.json();

    setOwner(data);
  };

  const toggleModal = (e) => {
    console.log("on click");
    setModal(!modal);
    setPoint(e.target.id);
    //console.log(e.target.id);
  };

  useEffect(() => {
    modal && ownerName();
  }, [modal]);

  const buyLand = async () => {
    const response = await fetch("http://localhost:8080/land/buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        buyerId: localStorage.getItem("userId"),
        landId: land.land._id,
      }),
    });
    console.log(response);
    if (response.status === 500) alert("Guest cannot buy nothing!!");
    else window.location.reload();
  };

  const paintMe = () => {
    if (land.land.ownerId === localStorage.getItem("userId")) {
      return "ownerColor";
    } else if (saleStatus) return land.land.isForSale;
    else return land.land.type;
  };

  if (typeof land !== "undefined") {
    if (gameMode) {
      return <Navigate to="/game" />;
    }
    return (
      <>
        <div className={`land ${paintMe()}`} onClick={toggleModal} />
        {modal && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>

            <div className="modal-content">
              <label>Type: {land.land.type}</label>
              <br />
              <label>Status: </label>
              <input
                type="checkbox"
                id="forSale"
                name="sale"
                defaultChecked={updateLand.isForSale}
                disabled={localStorage.getItem("userId") !== land.land.ownerId}
                onChange={(e) =>
                  setUpdateLand({ ...updateLand, isForSale: e.target.checked })
                }
              />
              <br />
              <label>Price: </label>
              <input
                type="number"
                value={updateLand.cost}
                disabled={localStorage.getItem("userId") !== land.land.ownerId}
                onChange={(e) =>
                  setUpdateLand({ ...updateLand, cost: Number(e.target.value) })
                }
              />
              <br />
              <label>Owner:</label>
              <input
                type="text"
                // defaultValue={land.land.ownerId}
                defaultValue={owner}
                disabled={true}
              />
              <br />
              <label>Game:</label>
              <select
                style={{
                  width: "120px",
                }}
                defaultValue={updateLand.game}
                disabled={localStorage.getItem("userId") !== land.land.ownerId}
                onChange={(e) =>
                  setUpdateLand({ ...updateLand, game: e.target.value })
                }
              >
                {[
                  "",
                  "baby wants milk",
                  "dancing man",
                  "snake",
                  "ants colony",
                ].map((nameGame) => (
                  <option value={nameGame}>{nameGame}</option>
                ))}
              </select>
              <br />
              <div style={{ float: "left", display: "flex" }}>
                {check ? <button onClick={buyLand}>Buy</button> : "false"}
                <button className="close-modal" onClick={toggleModal}>
                  X
                </button>
                <button
                  onClick={() => {
                    if (land.land.game !== "") {
                      localStorage.setItem("gameName", land.land.game);
                      setGameMode(true);
                    }
                  }}
                >
                  Play
                </button>
                <button onClick={update}>Update</button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
};

export default Land;