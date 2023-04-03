import React from "react";
import MembersList from "../components/membershipList"; 
import Login from "../pages/Login"

function Home() {
  return (
    <main>
      <div className="bg-auto">
        <div className="w-full">
        <Login/>
        </div>
      </div>
    </main>
  );
}

export default Home;
