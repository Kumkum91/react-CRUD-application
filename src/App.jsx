import {BrowserRouter, Routes, Route} from "react-router-dom";
import List from './pages/List';
import AddEdit from "./pages/AddEdit";
import MainLayout from "./layouts/mainLayout";

import React, { useRef } from 'react';
import { ConfirmDialog} from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

function App() {

  const toast = useRef(null);
  return (
     <BrowserRouter>
      <Toast ref={toast} />
      <ConfirmDialog />
       
       <Routes>
         <Route element={<MainLayout />}>
          <Route path="/" element={<List toast={toast}/>} />
          <Route path="/add" element={<AddEdit toast={toast}/>} />
          <Route path="/edit/:id" element={<AddEdit toast={toast}/>} />
         </Route>
       </Routes>
     </BrowserRouter> 
  );
}

export default App
