import React, { useState } from 'react';
import axios from 'axios';
import { Table, Form, InputGroup, Pagination, Button } from 'react-bootstrap';
import { FaSearch, FaEdit, FaTrash, FaEye, FaCheckSquare, FaRegSquare, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { GiConfirmed } from "react-icons/gi";

const DynamicTable = ({
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
  handleSubmit,
  tableCheck,
  chechk
}) => {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const renderNestedData = (row, column) => {
    const value = row[column.accessor];

    if (Array.isArray(value)) {
      return column.render ? column.render(value) : value.map(item => item.Category).join(', ');
    }

    return column.render ? column.render(value) : value;
  };

  const renderActions = (row) => (
    <div className="d-flex gap-2">
      <Button variant="outline-primary" size="sm" onClick={() => onView(row)}><FaEye /></Button>
      {tableCheck ? (
        <Button disabled={row.orderStatus === 'processed' || row.orderStatus === 'Cancelled' || row.orderStatus === 'completed'} variant="outline-success" size="sm" onClick={() => onEdit(row)}>
          <GiConfirmed />
        </Button>
      ) : ( !chechk && (
        <Button variant="outline-success" size="sm" onClick={() => onEdit(row.id)}><FaEdit /></Button>
      ) 
       
      )}
      <Button variant="outline-danger" size="sm" onClick={() => onDelete(row.id)}><FaTrash /></Button>
    </div>
  );

  // Sorting function
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const valueA = a[sortConfig.key];
    const valueB = b[sortConfig.key];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortConfig.direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    }
    return sortConfig.direction === 'asc' ? valueA - valueB : valueB - valueA;
  });

  return (
    <div className="p-3 border rounded">
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3" style={{ maxWidth: '300px' }}>
          <Button type="submit" variant="outline-secondary">
            <FaSearch />
          </Button>
          <Form.Control
            placeholder="Search...With Parent Category"
            value={searchTerm}
            onChange={handleSearch}
          />
        </InputGroup>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div onClick={toggleAllRows} style={{ cursor: 'pointer' }}>
                {selectedRows.size === data.length ? <FaCheckSquare /> : <FaRegSquare />}
              </div>
            </th>
            {columns.map((col) => (
              <th key={col.accessor} onClick={() => handleSort(col.accessor)} style={{ cursor: 'pointer' }}>
                {col.header}{" "}
                {sortConfig.key === col.accessor ? (
                  sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />
                ) : (
                  <FaSort />
                )}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <React.Fragment key={row.id}>
              <tr>
                <td>
                  <div onClick={() => toggleRow(row.id)} style={{ cursor: 'pointer' }}>
                    {selectedRows.has(row.id) ? <FaCheckSquare /> : <FaRegSquare />}
                  </div>
                </td>
                {columns.map((col) => (
                  <td key={`${row.id}-${col.accessor}`}>
                    {renderNestedData(row, col)}
                  </td>
                ))}
                <td>{renderActions(row)}</td>
              </tr>
              {row.subCategories?.map((subCategory) => (
                <tr key={subCategory.id} className="bg-light">
                  <td></td>
                  {columns.map((col) => (
                    <td key={`${subCategory.id}-${col.accessor}`}>
                      {col.accessor === 'subCategories' ? (
                        <span className="ms-3">↳ {'N/A'}</span>
                      ) : col.accessor === 'Parent' ? (
                        <span className="ms-3">↳ {subCategory.Parent}</span>
                      ) : (
                        renderNestedData(subCategory, col)
                      )}
                    </td>
                  ))}
                  <td>{renderActions(subCategory)}</td>
                </tr>
              ))}
            </React.Fragment>
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

export default DynamicTable;
