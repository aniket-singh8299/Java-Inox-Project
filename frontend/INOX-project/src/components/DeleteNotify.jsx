import React, { useContext } from 'react';
import { globalVar } from './../globalContext/GlobalContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const DeleteNotify = () => {
let {isModalOpen, setIsModalOpen,deleteData,setDeleteData,deleteCount,setDeleteCount} = useContext(globalVar) 

  const handleCancel = () => {
    setIsModalOpen(false); 
  };


  const handleDelete =async () => {
    console.log(deleteData);
    setIsModalOpen(false); 
 
    try {
      const response = await axios.delete(`http://localhost:8080/${deleteData?.comp}/delete/${deleteData?.data?.id}` ,{
        headers: {
            ContentType: "application/json",
          Authorization: `Bearer ${localStorage.getItem('auth')}`
        } 
      });
      console.log('Theater Deleted successfully:', response.data);
      // Optionally reset form fields after successful submission
      toast.success(`${deleteData.comp} is deleted`)
      setDeleteCount(deleteCount+1)
      return { id: '', name: '', address: '' }
    } catch (error) {
      console.error('Error Deleting theater:', error);
    }
  };

  return (
    isModalOpen && (
      <div className="modal-backdrop-deletenotify" onClick={handleCancel}>
        <div className="modal-container-deletenotify" onClick={(e) => e.stopPropagation()}>
          <h2 className="modal-title-deletenotify">Delete Item</h2>
          <p className="modal-message-deletenotify">
           <strong> You have selected to delete this item.</strong>
            <br />
            If this was the action that you wanted to do, please confirm your choice, or cancel and return to the page.
          </p>
          <div className="modal-actions-deletenotify">
            <button className="btn-deletenotify cancel-btn-deletenotify" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn-deletenotify delete-btn-deletenotify" onClick={handleDelete}>
              Delete
             </button>  {/* Put api to delete the selected item */}
          </div>
        </div>
      </div>
    )
  );
};

export default DeleteNotify;
