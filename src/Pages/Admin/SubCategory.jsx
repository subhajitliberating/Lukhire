import React  from "react";
import DynamicTable from "../../Component/Admin/DynamicTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeletedModal from "../../Component/Admin/DeletedModal";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
const SubCategory = ({token})=>{
      const { id } = useParams();
    const [categories, setCategories] = useState([]);
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
      { header: 'Category Name', accessor: 'Category' },
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
        header: 'Parent Category',
        accessor: 'Parent'
      },
      {
        header: 'Type',
        accessor: 'Category_Type'
      }
    ];
    
  
    const fetchCategories = async () => {
      try {
          setLoading(true);
          const response = await axios.get(`${Api_url}/categories/main/sub/${id}`, {
              params: {
                  page: currentPage,
                  limit: 8,
                  search: searchTerm, // Pass search term to the backend
              },
              headers: { 'Content-Type': 'application/json' ,
                'Authorization': `Bearer ${token}` }
          });
          setCategories(response.data.categories);
          setTotalPages(response.data.totalPages); // Updated to get total pages directly from the response
          console.log(response);
      } catch (error) {
          console.error('Error fetching categories:', error);
      } finally {
          setLoading(false);
      }
  };
  

  
  
    useEffect(() => {
      fetchCategories();
    }, [currentPage ,id]);
  
    const handleDeleteConfrom = async (id) => {
      try {

        setShowModal(true)
        setModalMessage(
          'Are you sure you want to delete this category? Deleting this category will also remove all related subcategories and associated products. This action cannot be undone.'
        );
        setD_Id(id)
        // await axios.delete(`${Api_url}/categories/main/${id}`);
        // fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    };

    const handleDelete = async () => {
      try {

       
        await axios.delete(`${Api_url}/categories/main/${d_id}`,{
          headers: { 'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${token}` }
        });
        fetchCategories();
        setD_Id(0)
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    };

   const  handelAddCategory =()=>{
nav('/admin/addcategory')
    }

    const handelEdite = (id)=>{
      nav(`/admin/editcategory/${id}`)
    }

    const handleSubmit = (e) => {
      e.preventDefault(); // Prevent form from reloading the page
      fetchCategories();
  };

  const handelView = (row)=>{
 
      nav(`/admin/${row.Category}/productview/${row.id}`)
   

  }
  
    if (loading) return <div>Loading...</div>;
  
    return (
      <div className="container">
        <div className="d-flex bg-secondary justify-content-between align-items-center my-4">
        <h4 className=" text-white p-2 m-0"> Sub Categories</h4>
        <button className="btn btn-light m-2" onClick={handelAddCategory} >
            Add Category
        </button>
    </div>
   
        <DynamicTable
        handleSubmit={handleSubmit}
          data={categories}
          columns={columns}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onView={handelView }
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

export default SubCategory;