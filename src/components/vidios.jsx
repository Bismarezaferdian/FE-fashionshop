import React from "react";
import { vidio } from "../data";

function vidios() {
  return (
    <div>
      <video width="320" height="240" autoPlay controls>
        <source src={vidio} />
      </video>
    </div>
  );
}

export default vidios;
