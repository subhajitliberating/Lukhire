


import React  from "react";
import DynamicTable from "../../Component/Admin/DynamicTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeletedModal from "../../Component/Admin/DeletedModal";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
const Sco = ({token})=>{
      const { id } = useParams();
    const [Sco, setSco] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
      const [modalMessage, setModalMessage] = useState("");
        const [showModal, setShowModal] = useState(false);
        const [d_id, setD_Id] = useState(0);
        const Api_url = import.meta.env.VITE_API_URL;
     const nav =  useNavigate()
     const columns = [
        {
            header: 'Seo ID',
            accessor: 'id'
          },
      { header: 'Page Name', accessor: 'page_name' },
  
   
   { header: 'Slug', accessor: 'slug' },

   { header: 'Title', accessor: 'title' },
  
    ];
    
  
    const fetchSco = async () => {
      try {
          setLoading(true);
          const response = await axios.get(`${Api_url}/sco/sco`, {
              params: {
                  page: currentPage,
                  limit: 8,
                  search: searchTerm, // Pass search term to the backend
              },
              headers: { 'Content-Type': 'application/json' ,
                'Authorization': `Bearer ${token}` }
          });
          
          setSco(response.data.Scos);
          setTotalPages(response.data.totalPages); // Updated to get total pages directly from the response
      
      } catch (error) {
          console.error('Error fetching Sco:', error);
      } finally {
          setLoading(false);
      }
  };
  

  
  
    useEffect(() => {
      fetchSco();
    }, [currentPage ,id]);
  
    const handleDeleteConfrom = async (id) => {
      try {

        setShowModal(true)
        setModalMessage(
          'Are you sure you want to delete this Sco?  This action cannot be undone.'
        );
        setD_Id(id)
        // await axios.delete(`${Api_url}/Sco/product/${id}`);
        // fetchSco();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    };

    const handleDelete = async () => {
      try {

       
        await axios.delete(`${Api_url}/sco/sco/${d_id}`,{
          headers: { 'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${token}` }
        });
        fetchSco();
        setD_Id(0)
        setShowModal(false)
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    };

   const  handelAddCategory =()=>{
nav('/admin/addseo')
    }

    const handelEdite = (id)=>{
      nav(`/admin/editseo/${id}`)
    }

    const HandelView = (row)=>{
      nav(`/admin/seoview/${row.id}`,{state : {disible : true}})
    }

    const handleSubmit = (e) => {
      e.preventDefault(); // Prevent form from reloading the page
      fetchSco();
  };
  
    if (loading) return <div>Loading...</div>;
  
    return (
      <div className="container">
        <div className="d-flex bg-secondary justify-content-between align-items-center my-4">
        <h4 className=" text-white p-2 m-0"> Seo</h4>
        <button className="btn btn-light m-2" onClick={handelAddCategory} >
            Add Seo 
        </button>
    </div>
   
        <DynamicTable
        handleSubmit={handleSubmit}
          data={Sco}
          columns={columns}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onView={HandelView }
          onEdit={handelEdite}
          onDelete={handleDeleteConfrom}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          tableCheck={false}
        />
          
         {showModal && (
           <DeletedModal message={modalMessage} show={showModal} onClose={()=>setShowModal(false)} onDelete={handleDelete}/>
         )}
     
      </div>
    
    );
}

export default Sco;