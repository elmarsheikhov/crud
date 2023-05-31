import React from "react";
import "../../assets/css/Table.scss";

const Table = ({
  users,
  setId,
  headData,
  bodyData,
  setEditModal,
  setAddModal,
  setDeleteModal,
  selectedItem,
  setSelectedItem,
}) => {
  const [selected, setSelected] = React.useState(0);
  function handleCheckboxChange(checked) {
    if (checked) {
      setSelected(selected + 1);
    } else {
      setSelected(selected - 1);
    }
  }
  console.log(selectedItem);
  return (
    <div className="table_container">
      {users.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>
                <i
                  className="trash_icon bx bx-trash"
                  onClick={() => setDeleteModal(true)}
                >
                  {" "}
                  <div className="trash_icon_badge">{selected}</div>
                </i>
              </th>
              {headData.map((item, index) => (
                <th key={index}>{item}</th>
              ))}
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {bodyData.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    onChange={(e) => (
                      handleCheckboxChange(e.target.checked),
                      setSelectedItem([...selectedItem, item])
                    )}
                  />
                </td>

                {headData.map((element) => (
                  <td key={element}>{item[element]}</td>
                ))}
                <td>
                  {" "}
                  <span onClick={() => (setEditModal(true), setId(index))}>
                    edit
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary" onClick={() => setAddModal(true)}>
          Add
        </button>
      </div>
    </div>
  );
};

export default Table;
