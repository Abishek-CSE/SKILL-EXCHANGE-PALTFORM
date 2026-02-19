import { Route, Routes } from "react-router-dom"
import Login from "../components/Login"
import Register from "../components/Register"
import Skill from "../components/Skill"
import Profile from "../components/Profile"
import Explore from '../components/Explore'
import Layout from "../components/Layout"
import LearnMore from "../components/LearnMore"

import Dashboard from "../components/Dashboard"

const AppRouting = () => {
  return (
    <>
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Explore/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/skill" element={<Skill/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Route>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/learnmore" element={<LearnMore/>}/>
    </Routes>
    </>
  )
}

export default AppRouting