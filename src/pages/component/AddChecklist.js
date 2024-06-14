import React, { useState } from "react";
import axios from "axios";

function AddChecklist({ onAddChecklist }) {
  const [showModal, setShowModal] = useState(false);
  const [newChecklist, setNewChecklist] = useState({
    name: "",
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
      const response = await axios.post(`/checklist`, newChecklist, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Checklist added:", response.data);
      onAddChecklist(response.data.data);
      handleCloseModal();
      setNewChecklist({ name: "" });
    } catch (error) {
      setError("Failed to add checklist.");
      console.error("Add checklist error:", error);
    }
  };

  return (
    <div>
      <button className="btn btn-success" onClick={handleShowModal}>
        Add Checklist
      </button>

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
                <h5 className="modal-title">Add Checklist</h5>
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
                      name="name"
                      value={newChecklist.name}
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

export default AddChecklist;
