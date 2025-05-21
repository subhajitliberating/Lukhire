import React  from "react";
import DynamicTable from "../../Component/Admin/DynamicTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeletedModal from "../../Component/Admin/DeletedModal";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
const Producets = ({token})=>{
      const { id } = useParams();
    const [producets, setproducets] = useState([]);
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
      { header: 'Name', accessor: 'name' },
      {
        header: 'Image',
        accessor: 'image',
        render: (value) => (
          <img
            src={`${Api_url}/uploads/${value}`}
            alt="Category"
            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
          />
        ),
      },
    
      {
        header: 'Category',
        accessor: 'Category'
      },
      {
        header: 'Quntity',
        accessor: 'quntity'
      }
    ];
    
  
    const fetchproducets = async () => {
      try {
          setLoading(true);
          const response = await axios.get(`${Api_url}/products/prouct/all/${id ? id : 0}`, {
              params: {
                  page: currentPage,
                  limit: 8,
                  search: searchTerm, // Pass search term to the backend
              },
              headers: { 'Content-Type': 'application/json' ,
                'Authorization': `Bearer ${token}` }
          });
          setproducets(response.data.products);
          setTotalPages(response.data.totalPages); // Updated to get total pages directly from the response
      
      } catch (error) {
          console.error('Error fetching producets:', error);
      } finally {
          setLoading(false);
      }
  };
  

  
  
    useEffect(() => {
      fetchproducets();
    }, [currentPage ,id]);
  
    const handleDeleteConfrom = async (id) => {
      try {

        setShowModal(true)
        setModalMessage(
          'Are you sure you want to delete this Product?  This action cannot be undone.'
        );
        setD_Id(id)
        // await axios.delete(`${Api_url}/producets/product/${id}`);
        // fetchproducets();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    };

    const handleDelete = async () => {
      try {

       
        await axios.delete(`${Api_url}/products/prouct/${d_id}`,{
          headers: { 'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${token}` }
        });
        fetchproducets();
        setD_Id(0)
        setShowModal(false)
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    };

   const  handelAddCategory =()=>{
nav('/admin/addproducts')
    }

    const handelEdite = (id)=>{
      nav(`/admin/editproduct/${id}`)
    }

    const HandelView = (row)=>{
      nav(`/admin/productview/${row.id}`)
    }

    const handleSubmit = (e) => {
      e.preventDefault(); // Prevent form from reloading the page
      fetchproducets();
  };
  
    if (loading) return <div>Loading...</div>;
  
    return (
      <div className="container">
        <div className="d-flex bg-secondary justify-content-between align-items-center my-4">
        <h4 className=" text-white p-2 m-0"> Products</h4>
        <button className="btn btn-light m-2" onClick={handelAddCategory} >
            Add Product
        </button>
    </div>
   
        <DynamicTable
        handleSubmit={handleSubmit}
          data={producets}
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

export default Producets;