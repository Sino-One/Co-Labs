import React from "react";
import "./Annuaire.css";
import { useNavigate } from "react-router-dom";

export default function AnnuaireStructure({ data }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="annuaire">
        <div className="annuaire__list">
          {data.map((item, index) => {
            return (
              <div
                className="annuaire__item"
                key={index}
                onClick={() => navigate("/structure/" + item._id)}
              >
                <h3>{item.nom}</h3>
                <p>{item.adresse}</p>
                <p>{item.code_postal}</p>
                <p>{item.telephone}</p>
                {/* <p>{item.email}</p>
                <p>{item.site_internet}</p> */}
                <p>{item.type}</p>
                <p>{item.secteur}</p>
                <p>Effectif dans la structure : {item.effectif}</p>
                <p>{item.description}</p>
                <p>Nombre de projet : {item.projets.length}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
