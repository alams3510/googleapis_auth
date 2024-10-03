import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [userDta, setUserData] = useState("");
  let user = sessionStorage.getItem("user-info");
  user = JSON.parse(user);
  useEffect(() => {
    if (user) setUserData(user);
  }, []);
  console.log(userDta);

  return (
    <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
      <h1>Welcome to Dashboard</h1>
      <img
        style={{ width: "100px", margin: "0 auto 0 auto" }}
        src={userDta.image}
        alt="picture"
      />
      <h2>{userDta.name}</h2>
      <h2>{userDta.email}</h2>
    </div>
  );
};

export default Dashboard;
