import React, { useContext } from 'react';
import { globalVar } from './../globalContext/GlobalContext';
import toast from 'react-hot-toast';
import axios from 'axios';

const UpdateNotify = () => {
  let { updateNotify,setupdateNotify,updateData,setUpdateData,updateCount,setUpdateCount} = useContext(globalVar);

  const handleCancel = () => {
    setupdateNotify(false); 
  };

  const handleUpdate =async () => {
    console.log(updateData);
    setupdateNotify(false); 
    try {
      const response = await axios.put(`http://localhost:8080/${updateData?.comp}/update`, updateData?.data, {
        headers: {
            ContentType: "application/json",
          Authorization: `Bearer ${localStorage.getItem('auth')}`
        } 
      });
      console.log('Theatre updated successfully:', response.data);
      // Optionally reset form fields after successful submission
      toast.success(`${updateData.comp} is updated`)
      setUpdateCount(updateCount+1)
      return { id: '', name: '', address: '' }
    } catch (error) {
      console.error('Error updating theatre:', error);
    }
  };

  return (
    updateNotify && (
      <div className="update-modal-backdrop-updatenotify" onClick={handleCancel}>
        <div className="update-modal-container-updatenotify" onClick={(e) => e.stopPropagation()}>
          <h2 className="update-modal-title-updatenotify">Updating the Item</h2>
          <p className="update-modal-message-updatenotify">
           <strong> You have selected to update this item.</strong>
            <br />
            If this was the action that you wanted to do, please confirm your choice, or cancel and return to the page.
          </p>
          <div className="update-modal-actions-updatenotify">
            <button className="btn-updatenotify update-cancel-btn-updatenotify" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn-updatenotify update-confirm-btn-updatenotify" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default UpdateNotify;
