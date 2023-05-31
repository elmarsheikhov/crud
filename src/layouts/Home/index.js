import React from "react";
import Table from "../../components/Table/Table";
import MyModal from "../../components/Modal/MyModal";
import { API_URL } from "../../config/routes";
const Home = () => {
  const [users, setUsers] = React.useState([]);
  const [id, setId] = React.useState(null);
  const [editModal, setEditModal] = React.useState(false);
  const [addModal, setAddModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState([]);

  const fetchUserData = () => {
    fetch(API_URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      });
  };
  const headData = users.length ? Object.keys(users[0]) : null;
  const bodyData = Object.values(users);
  React.useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <Table
        users={users}
        setId={setId}
        headData={headData}
        bodyData={bodyData}
        setEditModal={setEditModal}
        setAddModal={setAddModal}
        setDeleteModal={setDeleteModal}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <MyModal
        users={users}
        id={id}
        editModal={editModal}
        setEditModal={setEditModal}
        addModal={addModal}
        setAddModal={setAddModal}
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        selectedItem={selectedItem}
      />
    </div>
  );
};
export default Home;
