import React from 'react'
import './Input.css'
import Search from '../../assets/images/search.png';

const Input = ({idSearchTerm, setIdSearchTerm}: any) => {
  return (
    <div className='search-container'>
    <input
      type="text"
      placeholder="ID"
      value={idSearchTerm}
      onChange={e => setIdSearchTerm(e.target.value)}
      className='search-input'
    />
    <img src={Search} alt='Search' className='Search-icon' />
  </div>
  )
}

export default Input