import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Content from '../pages/Content'
import Page from '../pages/Page'

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Content />} />
      <Route path="/" element={<Content />} />
      <Route path="/logo" element={<Page />} />
      <Route path="/teams" element={<Page titleProp="TEAMS" />} />
      <Route path="/anatylics" element={<Page titleProp="ANALYTICS" />} />
      <Route path="/messengers" element={<Page titleProp="MESSENGERS" />} />
      <Route path="/intergrations" element={<Page titleProp="INTEGRATIONS" />} />
    </Routes>
  )
}

export default AppRoutes
