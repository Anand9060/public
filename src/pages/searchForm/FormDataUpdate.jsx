import React from 'react'
import { useLocation } from 'react-router-dom'

const FormDataUpdate = () => {
    const {state} = useLocation()

  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
      {`The Row ID is : ${state?.rowId} fetch the details using API Todo` }
    </div>
  )
}

export default FormDataUpdate
