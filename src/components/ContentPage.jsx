// ContentPage.js

import React, { useState, useEffect } from "react";
import FilterOptions from "./FilterOptions";
import AddCustomer from "./AddCustomer";

const ContentPage = () => {
  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState("All");
  const [showOptions, setShowOptions] = useState(false);
  const [sortField, setSortField] = useState("companyName");
  const [isSortReversed, setIsSortReversed] = useState(false);

  useEffect(() => {
    async function fetchCustomerData() {
      try {
        const response = await fetch("https://northwind.vercel.app/api/customers");
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    }

    fetchCustomerData();
  }, []);

  useEffect(() => {
    handleSort();
  }, [sortField, isSortReversed, filter]);

  const handleSort = () => {
    const sortedCustomers = [...customers];

    sortedCustomers.sort((a, b) => {
      const nameA = a[sortField].toUpperCase();
      const nameB = b[sortField].toUpperCase();

      if (nameA < nameB) {
        return isSortReversed ? 1 : -1;
      }
      if (nameA > nameB) {
        return isSortReversed ? -1 : 1;
      }
      return 0;
    });

    const filteredSortedCustomers =
      filter === "All" ? sortedCustomers : sortedCustomers.slice(0, parseInt(filter));
    setCustomers(filteredSortedCustomers);
  };

  const handleSortClick = (field) => {
    if (field === sortField) {
      setIsSortReversed(!isSortReversed);
    } else {
      setSortField(field);
      setIsSortReversed(false);
    }
  };

  const handleAllClick = () => {
    setShowOptions(!showOptions);
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
    setShowOptions(false);
  };

  const handleAddCustomer = (newCustomer) => {
    setCustomers([...customers, newCustomer]);
  };

  const filteredCustomers = filter === "All" ? customers : customers.slice(0, parseInt(filter));

  return (
    <div className="table">
      <AddCustomer onAddCustomer={handleAddCustomer} />

      <h2>Customer Information</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th onClick={() => handleSortClick("companyName")}>Company Name</th>
            <th>Address</th>
            <th>City</th>
            <th>
              <FilterOptions
                onAllClick={handleAllClick}
                onChange={handleFilterChange}
                selected={filter}
                showOptions={showOptions}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.companyName}</td>
              <td>{customer.address.street}</td>
              <td>{customer.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContentPage;
