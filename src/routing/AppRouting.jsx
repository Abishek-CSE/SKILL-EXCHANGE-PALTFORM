import { Route, Routes } from "react-router-dom"
import Login from "../components/Login"
import Register from "../components/Register"
import Skill from "../components/Skill"
import Profile from "../components/Profile"
import Explore from '../components/Explore'
import Layout from "../components/Layout"
import LearnMore from "../components/LearnMore"
import Dashboard from "../components/Dashboard"
import Setting from "../components/setting"

const AppRouting = () => {
  return (
    <Routes>
      {/* Routes with Layout (Navbar and common layout) */}
      <Route element={<Layout/>}>
        <Route path="/" element={<Explore/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/skill" element={<Skill/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/settings" element={<Setting/>}/> {/* New Settings route */}
      </Route>

      {/* Routes without Layout (Auth pages) */}
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/learnmore" element={<LearnMore/>}/>
    </Routes>
  )
}

export default AppRouting