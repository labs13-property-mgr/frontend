import React, { Component, useState, useEffect } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

const ManagerCard = props => {
  const [manager, setManagers] = useState([]);

  useEffect(() => {
    axios
      .get("https://rent-me-app.herokuapp.com/api/users")
      .then(res => {
        setManagers(
          res.data.find(manager => `${manager.id}` === props.match.params.id)
        );
      })
      .catch(console.log("Error"));
  }, []);

  return (
    <>
      <p>Name: {manager && manager.First_name + " " + manager.Last_name}</p>
      <p>Role: {manager && manager.role}</p>
      <p>Email: {manager && manager.email}</p>
    </>
  );
};

export default ManagerCard;
