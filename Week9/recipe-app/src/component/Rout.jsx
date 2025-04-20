import React from 'react'
import {Routes,Route} from 'react-router-dom'
import NotFind from './NotFind'
import HomePageContent from './HomePageContent '
function Rout() {
  return (
    <div>
      <Routes>
        <Route index element = {<HomePageContent/>}/>
        <Route path="/" element = {<HomePageContent/>}/>
        <Route path="/recipes" element = {<NotFind/>}/>
        <Route path="/ingredients" element = {<NotFind/>}/>
        <Route path="/occasions" element = {<NotFind/>}/>
        <Route path="/about-us" element = {<NotFind/>}/>
      </Routes>
    </div>
  )
}

export default Rout
