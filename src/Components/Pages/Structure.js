import React from "react";
import { useContext } from "react";
import { StructuresContext } from "../../store/StructuresReducer";
import { useParams } from "react-router-dom";

export default function Structure() {
  const { structures } = useContext(StructuresContext);
  const { id } = useParams();

  const structure = structures.find((structure) => structure._id === id);

  return (
    <>
      <h1>Structure</h1>
      <p>{structure.nom}</p>
      <p>{structure.adresse}</p>
    </>
  );
}
