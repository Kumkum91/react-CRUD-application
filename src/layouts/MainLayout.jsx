import React from 'react'
import Headers from '../components/Headers'
import {Outlet} from 'react-router-dom'


export default function MainLayout() {
  return (
    <>
    <Headers />
    <div className='p-4'>
        <Outlet />
    </div>

    </>
  )
}
