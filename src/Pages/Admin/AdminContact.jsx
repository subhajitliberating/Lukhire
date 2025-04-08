import { header } from 'framer-motion/client';
import React, { useEffect, useState } from 'react';
import DynamicTable from '../../Component/Admin/DynamicTable';
import axios from 'axios';
import DeletedModal from '../../Component/Admin/DeletedModal';
import Modalmessage from '../../Component/Admin/Modalmessage';

const AdminContact = ({token})=>{
const [contact,setContact]=useState([])
const[currentPage,setCurrentPage]=useState(1)
const [totalPage,setTotalPages]=useState(0)
const [loding,setLoading]=useState(false)
  const [showModal, setShowModal] = useState(false);

const [searchTerm,setSearchTerm]=useState('')
const [modalMessage,setModalMessage]=useState('')
const [d_id,setD_id]=useState(0)
const [alartshow,setAleartShow]=useState(false)
const [showmessage,setShowmessage]=useState('')
  const [MessageModal,setMessageModal]=useState(false)
  const [Message,setMessage]=useState({})

const columns = [
    {
        header : 'ID',
        accessor : 'id',
    },
    {
        header : 'Name',
        accessor : 'name',

    }
    ,
    {
        header : 'Email',
        accessor : 'email',
    },
    {
        header : 'Phone',
        accessor : 'phone',
    },
    

]
const Api_url = import.meta.env.VITE_API_URL;
const FetchContacts = async ()=>{
    try{
        setLoading(true)
        const response = await axios.get(`${Api_url}/contact/get`,{
            params : {
                page : currentPage,
                limit : 8,
                search : searchTerm
            }
            ,
            
            headers : {
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json',
            }   
})

setContact(response.data.data)
setLoading(false)


    }
    catch(error){
    console.log(error)
    }
    finally{
        setLoading(false)
    }


}
useEffect(()=>{
    if(alartshow){
    const timer = setTimeout(() => {
        setAleartShow(false)
    },3000)
  return () => clearTimeout(timer)
    }
},[alartshow])


useEffect(()=>{
    FetchContacts()
},[currentPage])

const handleDeleteConfrom = async(id)=>{
    try{
        setShowModal(true)
        setModalMessage(
            'Are you sure you want to delete this message?  This action cannot be undone.'
          );
          setD_id(id)
    }
    catch (error) {
        console.error('Error deleting contact:', error);
      }
};

const handleDelete = async () => {
    try {

     
      await axios.delete(`${Api_url}/contact/deleted/${d_id}`,{
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': `Bearer ${token}` }
      });
      FetchContacts()
      setD_id(0)
      setShowModal(false)
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };
  const HandelView= (data) =>{
    setMessageModal(true)
    setMessage(data)
    console.log(data)
   
  }


return(
    <div className="container">

<div className="d-flex bg-secondary justify-content-between align-items-center my-4">
        <h4 className=" text-white p-2 m-0">Messages</h4>
     
    </div>
   
        <DynamicTable
       
          data={contact}
          columns={columns}
          currentPage={currentPage}
          totalPages={totalPage}
          onPageChange={setCurrentPage}
         onView={HandelView}

         //   onEdit={handelEdite}
          onDelete={handleDeleteConfrom}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          tableCheck={false}
          chechk={true}
        />
          
         {showModal && (
           <DeletedModal message={modalMessage} show={showModal} onClose={()=>setShowModal(false)} onDelete={handleDelete}/>
         )}

      
         {MessageModal && (
           <Modalmessage message={Message} show={MessageModal} onClose={()=>setMessageModal(false)}/>
         )}
         
     

    </div>
)

}

export default AdminContact