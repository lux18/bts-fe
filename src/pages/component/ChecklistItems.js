import React, { useEffect, useState } from "react";
import axios from "axios";
import AddChecklist from "./AddChecklist";
import AddChecklistItems from "./AddChecklistItems";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";

function ChecklistItems() {
  const { id } = useParams();
  const [checklistData, setChecklistData] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.replace("/login");
      return;
    }

    const fetchChecklist = async () => {
      try {
        const response = await axios.get(`/checklist/${id}/item`, {
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

  const handleDelete = async (itemId) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`/checklist/${id}/item/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Checklist item deleted:", itemId);
      window.location.reload(); // Reload the page to update the list of items
    } catch (error) {
      setError("Failed to delete checklist item.");
      console.error("Delete checklist item error:", error);
    }
  };

  return (
    <div className="container">
      <br />
      <h1>Checklist Items Page</h1>
      <div className="d-flex">
        <AddChecklistItems id={id} />
      </div>

      <br />

      {checklistData.length > 0 ? (
        <div className="card shadow p-3">
          {checklistData.map((checklist) => (
            <div key={checklist.id} className="col-12 col-sm-6 col-lg-4 mb-3">
              <div>
                <div className="d-flex align-items-center">
                  <input type="checkbox" className="me-2" />
                  <h5>{checklist.name}</h5>
                  <button
                    className="btn btn-sm btn-danger p-1 ms-2"
                    onClick={() => handleDelete(checklist.id)}
                  >
                    <MdDelete size={20} />
                  </button>{" "}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No checklist items found.</p>
      )}
    </div>
  );
}

export default ChecklistItems;
