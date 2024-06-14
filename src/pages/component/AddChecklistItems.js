import React, { useState } from "react";
import axios from "axios";
import { IoIosAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function AddChecklistItems({ id }) {
  console.log(id);
  const [showModal, setShowModal] = useState(false);
  const [newChecklist, setNewChecklist] = useState({
    itemName: "",
  });
  const [error, setError] = useState("");

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setNewChecklist({ ...newChecklist, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(`/checklist/${id}/item`, newChecklist, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Checklist added:", response.data);
      handleCloseModal();
      setNewChecklist({ itemName: "" });
      window.location.reload();
    } catch (error) {
      setError("Failed to add checklist.");
      console.error("Add checklist error:", error);
    }
  };

  return (
    <div className="w-100">
      <div className="d-flex w-100">
        <div className="d-flex justify-content w-100">
          <button
            className="btn btn-sm btn-primary p-1"
            onClick={handleShowModal}
          >
            <IoIosAdd size={20} />
          </button>
        </div>
      </div>

      {showModal && (
        <div
          className="modal-backdrop p-3"
          style={{
            display: "block",
            backgroundColor: "rgba(52, 52, 52, 0.289)",
          }}
        >
          <div
            className="modal-dialog bg-light rounded p-3"
            style={{ maxWidth: "400px" }}
          >
            <div className="modal-content">
              <div className="modal-header justify-content-between">
                <h5 className="modal-title">Add Checklist Items</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <br />{" "}
              <div className="modal-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="itemName"
                      value={newChecklist.itemName}
                      onChange={handleChange}
                      placeholder="Name"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Add
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddChecklistItems;
