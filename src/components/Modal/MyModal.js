import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { API_URL } from "../../config/routes";

function MyModal({
  users,
  id,
  editModal,
  setEditModal,
  addModal,
  setAddModal,
  deleteModal,
  setDeleteModal,
  selectedItem,
}) {
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [user, setUser] = React.useState([]);
  const [formData, setFormData] = React.useState({});
  const handleCloseEditModal = () => (
    setShowEditModal(false), setEditModal(false)
  );
  const handleCloseAddModal = () => (
    setShowAddModal(false), setAddModal(false)
  );
  const handleCloseDeleteModal = () => (
    setShowDeleteModal(false), setDeleteModal(false)
  );
  const fetchUserData = () => {
    fetch(`${API_URL}/${id + 1}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUser([data]);
        setFormData(data);
      });
  };
  console.log(deleteModal);
  const updateData = () => {
    if (id != null) {
      fetch(`${API_URL}/${id + 1}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Data updated:", data);
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    }

    setShowEditModal(false);
    setEditModal(false);
  };
  const addData = () => {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data added:", data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding data:", error);
      });

    setShowAddModal(false);
    setAddModal(false);
  };
  const deleteData = () => {
    if (selectedItem.length > 0) {
      const deletePromises = selectedItem.map((item) =>
        fetch(`${API_URL}/${item.id}`, {
          method: "DELETE",
        })
      );

      Promise.all(deletePromises)
        .then((responses) => {
          console.log("Data deleted:", responses);
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
        });
    }

    setShowDeleteModal(false);
    setDeleteModal(false);
  };

  React.useEffect(() => {
    if (id != null) {
      fetchUserData();
    }
  }, [id]);

  React.useEffect(() => {
    setShowEditModal(editModal);
  }, [editModal]);

  React.useEffect(() => {
    setShowAddModal(addModal);
  }, [addModal]);

  React.useEffect(() => {
    setShowDeleteModal(deleteModal);
  }, [deleteModal]);
  return (
    <>
      {editModal && (
        <div>
          <Modal show={showEditModal} onHide={handleCloseEditModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {!!user.length &&
                user.map((item, key) => (
                  <Form key={key}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.name || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Job</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.job || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, job: e.target.value })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.location || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Salary</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.salary || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, salary: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Form>
                ))}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEditModal}>
                Close
              </Button>
              <Button variant="primary" onClick={updateData}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
      {addModal && (
        <div>
          <Modal show={showAddModal} onHide={handleCloseAddModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Id</Form.Label>
                  <Form.Control type="number" value={users.length + 1} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Job</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) =>
                      setFormData({ ...formData, job: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) =>
                      setFormData({ ...formData, salary: e.target.value })
                    }
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAddModal}>
                Close
              </Button>
              <Button variant="primary" onClick={addData}>
                Add
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
      {deleteModal && (
        <div>
          <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
            <Modal.Header closeButton>
              <Modal.Title>Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {!!selectedItem.length &&
                selectedItem.map((item, key) => (
                  <table>
                    <tr>
                      <td>id:{item.id},</td>
                      <td>name: {item.name}</td>
                    </tr>
                  </table>
                ))}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={deleteData}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
}

export default MyModal;
