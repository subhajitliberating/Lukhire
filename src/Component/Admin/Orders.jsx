import React  from "react";
import DynamicTable from "../../Component/Admin/DynamicTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeletedModal from "../../Component/Admin/DeletedModal";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import Confirmation from "./Confirmation";
const Orders = ({token})=>{
      const { id } = useParams();
    const [Orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
      const [modalMessage, setModalMessage] = useState("");
        const [showModal, setShowModal] = useState(false);
        const [editeModal,setEditeModal]=useState(false)
        const [editeID,setEditeId]=useState(0)
        const [d_id, setD_Id] = useState(0);
        const [alartshow,setAleartShow]=useState(false)
        const [showmessage,setShowmessage]=useState('')
        const Api_url = import.meta.env.VITE_API_URL;
     const nav =  useNavigate()
     const columns = [
        {
            header: 'Order ID',
            accessor: 'id'
          },
      { header: 'Name', accessor: 'name' },
   { header: 'Email', accessor: 'email' },
   
   { header: 'Product', accessor: 'ProductName' },

   { header: 'Status', accessor: 'orderStatus' },
      {
        header: 'Quntity',
        accessor: 'quantity'
      }
    ];
    
  
    const fetchOrders = async () => {
      try {
          setLoading(true);
          const response = await axios.get(`${Api_url}/apiv1/orders`, {
              params: {
                  page: currentPage,
                  limit: 8,
                  search: searchTerm, // Pass search term to the backend
              },
              headers: { 'Content-Type': 'application/json' ,
                'Authorization': `Bearer ${token}` }
          });
          setOrders(response.data.orders);
          setTotalPages(response.data.totalPages); // Updated to get total pages directly from the response
      
      } catch (error) {
          console.error('Error fetching Orders:', error);
      } finally {
          setLoading(false);
      }
  };
  



  
    useEffect(() => {
      if (alartshow) {
        const timer = setTimeout(() => {
          setAleartShow(false);
        }, 3000); // 3000ms = 3 seconds, adjust delay as needed
  
        return () => clearTimeout(timer); // Cleanup on unmount
      }
    }, [alartshow]);
  

  

  
  
  
    useEffect(() => {
      fetchOrders();
    }, [currentPage ,id]);
  
    const handleDeleteConfrom = async (id) => {
      try {

        setShowModal(true)
        setModalMessage(
          'Are you sure you want to delete this Order?  This action cannot be undone.'
        );
        setD_Id(id)
        // await axios.delete(`${Api_url}apiv1/orders/${id}`);
        // fetchOrders();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    };

    const handleDelete = async () => {
      try {

       
       const response =  await axios.delete(`${Api_url}/apiv1/orders/${d_id}`,{
          headers: { 'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${token}` }
        });
        fetchOrders();
        setD_Id(0)
        setShowModal(false)
        setAleartShow(true)
        console.log(response)
        setShowmessage(response.data.message)
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    };

   const  handelAddCategory =()=>{
nav('/admin/addproductes')
    }

    const handelEdite = (id)=>{
    //   nav(`/admin/editproduct/${id}`)

    setEditeModal(true)
    setEditeId(id.id)

    }

    const HandelView = (row)=>{
      nav(`/admin/orderview/${row.id}`)
    }

    const handleSubmit = (e) => {
      e.preventDefault(); // Prevent form from reloading the page
      fetchOrders();
  };


  const handelUpdateStatus = async()=>{
    try{
      const status  = 'processed'
const response = await axios.put(`${Api_url}/apiv1/orders/${editeID}/status`, {status},{
  headers: { 'Content-Type': 'application/json' ,
    'Authorization': `Bearer ${token}` }
});
   console.log(response)
   setShowmessage(response.data.message)
setEditeId(0)
setEditeModal(false)
setAleartShow(true)

fetchOrders()

}
    catch(error){
// console.log(error)
setShowmessage(error.response.data.message)
setEditeModal(false)
setAleartShow(true)
    }
  }

  
    if (loading) return <div>Loading...</div>;
  
    return (
      <div className="container">
  {alartshow && (
          <div class="alert alert-success" role="alert">
        {showmessage}
        </div>
  )}
        <div className="d-flex bg-secondary justify-content-between align-items-center my-4">
        <h4 className=" text-white p-2 m-0"> Orders</h4>
        {/* <button className="btn btn-light m-2" onClick={handelAddCategory} >
            Add Producet
        </button> */}
    </div>
   
        <DynamicTable
        handleSubmit={handleSubmit}
          data={Orders}
          columns={columns}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onView={HandelView }
          onEdit={handelEdite}
          onDelete={handleDeleteConfrom}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          tableCheck={true}
        />
          
         {showModal && (
           <DeletedModal message={modalMessage} show={showModal} onClose={()=>setShowModal(false)} onDelete={handleDelete}/>
         )}

         {editeModal && (
            <Confirmation id={editeID} show={editeModal} onClose={()=>setEditeModal(false)} onConform={handelUpdateStatus}/>
         )}


     
      </div>
    
    );
}

export default Orders;