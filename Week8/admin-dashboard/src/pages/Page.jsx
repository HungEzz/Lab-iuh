import React from 'react'

function Page({titleProp}) {

  
  return (
    <div className = "page">
      <h1 >{titleProp}</h1>
      <img src="/404.png" alt=""  width={"50%"}/>
        
    </div>
  )
}

export default Page
