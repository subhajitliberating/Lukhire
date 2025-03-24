








import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, InputGroup, Pagination, Button } from 'react-bootstrap';
import { FaSearch, FaEdit, FaTrash, FaEye, FaCheckSquare, FaRegSquare } from 'react-icons/fa';
import { GiConfirmed } from "react-icons/gi";
const MainTable = ({
  data,
  columns,
  currentPage,
  totalPages,
  onPageChange,
  onView,
  onEdit,
  onDelete,
  searchTerm,
  setSearchTerm,
  tableCheck
}) => {
  const [selectedRows, setSelectedRows] = useState(new Set());

  const toggleAllRows = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(data.map(item => item.id)));
    }
  };

  const toggleRow = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const renderActions = (row) => (
    <div className="d-flex gap-2">
      <Button variant="outline-primary" size="sm" onClick={() => onView(row)}><FaEye /></Button>
    {tableCheck ?  <Button variant="outline-success" size="sm" onClick={() => onEdit(row)}><GiConfirmed /></Button> :  <Button variant="outline-success" size="sm" onClick={() => onEdit(row)}><FaEdit /></Button> } 
      <Button variant="outline-danger" size="sm" onClick={() => onDelete(row.id)}><FaTrash /></Button>
    </div>
  );

  return (
    <div className="p-3 border rounded">
      <InputGroup className="mb-3" style={{ maxWidth: '300px' }}>
        <InputGroup.Text><FaSearch /></InputGroup.Text>
        <Form.Control
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div onClick={toggleAllRows} style={{ cursor: 'pointer' }}>
                {selectedRows.size === data.length ? <FaCheckSquare /> : <FaRegSquare />}
              </div>
            </th>
            {columns.map((col) => <th key={col.accessor}>{col.header}</th>)}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>
                <div onClick={() => toggleRow(row.id)} style={{ cursor: 'pointer' }}>
                  {selectedRows.has(row.id) ? <FaCheckSquare /> : <FaRegSquare />}
                </div>
              </td>
              {columns.map((col) => (
                <td key={col.accessor}>{col.render ? col.render(row[col.accessor]) : row[col.accessor]}</td>
              ))}
              <td>{renderActions(row)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination className="justify-content-center">
        <Pagination.Prev onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} />
      </Pagination>
    </div>
  );
};


export default MainTable