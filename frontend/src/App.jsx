import React from 'react'
import FaceExpression from './features/Expression/components/FaceExpression'
import {RouterProvider} from 'react-router'
import {router} from './appRouter'
import './features/shared/style/global.scss'
import './features/shared/style/button.scss'
import { AuthProvider } from './features/auth/AuthContext'
import { SongContextProvider } from './features/home/songContext'

const App = () => {
  return (
    <div>
      
<AuthProvider>
  <SongContextProvider>
     <RouterProvider router={router}></RouterProvider>
  </SongContextProvider>
</AuthProvider>
    </div>
  )
}

export default App
