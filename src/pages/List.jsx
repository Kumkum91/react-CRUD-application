import { useEffect, useState } from "react"
import api from "../api/axios"
import {useNavigate} from "react-router-dom"

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
        
        

export default function List({toast}){
    const [users,setUsers]= useState([]);
    const navigate= useNavigate();
    
    const fetchUsers=async () => {
        const res = await api.get("/users")
        console.log(res)
        setUsers(res.data)
    }

    useEffect(()=>{
        fetchUsers();
    },[]);

    const deleteUser =(id) =>{
      confirmDialog({
            message: 'Are you sure you want to delete the user Data?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: async() =>{
                await api.delete(`/users/${id}`);
                toast.current.show({ severity: 'success', summary: 'Deleted', detail: 'Data Deleted', life: 2000 });
                fetchUsers();
            },
        });
    }

    const actionButton = (rowData)=>(
        <>
           <Button icon="pi pi-file-edit" className="p-button-sm p-button-warning mr-2" 
           onClick={()=> navigate(`/edit/${rowData.id}`)}/>

           <Button icon="pi pi-eraser" className="p-button-sm p-button-danger mr-2"
           onClick={()=> deleteUser(rowData.id)} />
        </>
    );

    return(
    <div>
        <div className="flex justify-content-between mb-2">
            <h2>USERS</h2>
            <Button label="ADD USERS" icon="pi pi-plus" size="small" 
            onClick={()=>navigate("/add")}/>
        </div>
        <DataTable 
        value={users} 
        showGridlines
        stripedRows
        paginator 
        rows={5}
        size="large"
        filterDisplay="row">
         <Column field="name" header="Name" filter filterPlaceholder="Search by Name" sortable></Column>
         <Column field="username" header="UserName" filter filterPlaceholder="Search by UserName"></Column>
         <Column field="email" header="Email" filter filterPlaceholder="Search by Email"></Column>
         <Column field="age" header="Age" filter filterPlaceholder="Search by Age" sortable></Column>
         <Column  header="Action" 
         body={actionButton}
         style= {{width:"13%"}}></Column>
        </DataTable>
    </div>
    )
}