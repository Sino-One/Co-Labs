import React from "react";
import "./Annuaire.css";

export default function Annuaire({ data }) {
  return (
    <>
      <div className="annuaire">
        <h2>Annuaire</h2>
        <div className="annuaire__list">
          {data.map((item, index) => {
            return (
              <div className="annuaire__item" key={index}>
                <h3>{item.nom}</h3>
                <p>{item.adresse}</p>
                <p>{item.code_postal}</p>
                <p>{item.telephone}</p>
                {/* <p>{item.email}</p>
                <p>{item.site_internet}</p> */}
                <p>{item.type}</p>
                <p>{item.secteur}</p>
                <p>{item.effectif}</p>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
