import React, { useEffect, useState } from "react";
import axios from "axios";
import AddChecklist from "./AddChecklist";
import AddChecklistItems from "./AddChecklistItems";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Checklist() {
  const navigate = useNavigate();

  const [checklistData, setChecklistData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.replace("/login");
      return;
    }

    const fetchChecklist = async () => {
      try {
        const response = await axios.get(`/checklist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChecklistData(response.data.data);
      } catch (error) {
        setError("Gagal mengambil data checklist.");
        console.error("Fetch checklist error:", error);
      }
    };

    fetchChecklist();
  }, []);

  const handleAddChecklist = (newChecklist) => {
    setChecklistData([...checklistData, newChecklist]);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`/checklist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Checklist deleted:", id);
      setChecklistData(
        checklistData.filter((checklist) => checklist.id !== id),
      );
    } catch (error) {
      setError("Failed to delete checklist.");
      console.error("Delete checklist error:", error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <AddChecklist onAddChecklist={handleAddChecklist} />
      </div>

      <br />

      {checklistData.length > 0 ? (
        <div className="row">
          {checklistData.map((checklist) => (
            <div key={checklist.id} className="col-12 col-sm-6 col-lg-4 mb-3">
              <div className="card shadow p-3">
                <h5>{checklist.name}</h5>
                <hr />
                <div className="d-flex w-100">
                  <button
                    className="btn btn-sm btn-dark p-1 me-2 w-100 px-5"
                    onClick={() => navigate(`/checklist-items/${checklist.id}`)}
                  >
                    Detail
                  </button>

                  <button
                    className="btn btn-sm btn-danger p-1 ms-2"
                    onClick={() => handleDelete(checklist.id)}
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No checklist items found.</p>
      )}

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Checklist;
