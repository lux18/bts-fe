import React, { useEffect, useState } from "react";
import axios from "axios";
import Checklist from "./component/Checklist";
import AddChecklist from "./component/AddChecklist";

function Home() {
  return (
    <div className="container">
      <br />
      <h1>Checklist Page</h1>
      <p>Welcome to the Checklist page!</p>
      <br />

      <Checklist />
    </div>
  );
}

export default Home;
