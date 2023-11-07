import React from 'react'

const DashCard = ({cardtitle, cardnumber, cardpara, iclass, bgclass}) => {
  return (
    <>
    <div className={bgclass}>
    <div className='dashboard-card d-flex align-items-center justify-content-center'>
    <i class={iclass}></i>
    <div className='dashcard-data'>
        <span>{cardtitle}</span>
        <h3>{cardnumber}</h3>
        <p>{cardpara}</p>
    </div>
    </div>
    </div>
    </>
  )
}

export default DashCard