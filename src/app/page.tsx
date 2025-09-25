import React from 'react'
import { redirect } from "next/navigation";

const Home = () => {

  redirect("/home");

  return (
    <div></div>
  )
}

export default Home