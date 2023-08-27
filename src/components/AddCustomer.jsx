// AddCustomer.js

import React, { useState } from "react";

const AddCustomer = ({ onAddCustomer }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Reset input fields when the menu is opened
    setCompanyName("");
    setStreet("");
    setCity("");
  };

  const handleAddClick = () => {
    if (companyName && street && city) {
      const newCustomer = {
        id: Date.now(),
        companyName: companyName,
        address: {
          street: street,
          city: city,
        },
      };

      onAddCustomer(newCustomer);

      // Reset input fields and close the menu after adding
      setCompanyName("");
      setStreet("");
      setCity("");
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="customer">
      <button onClick={toggleMenu}>Add Customer</button>

      {isMenuOpen && (
        <div className="menu">
          <button className="menu-close" onClick={toggleMenu}>
            &#10006;
          </button>
          <div className="menu-item">
            <h2>Add Customer</h2>
            <form>
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </form>
          </div>
          <div className="menu-item">
            <form>
              <label htmlFor="street">Street</label>
              <input
                type="text"
                id="street"
                name="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </form>
          </div>
          <div className="menu-item">
            <form>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </form>
          </div>
          <button className="menu-add" onClick={handleAddClick}>
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default AddCustomer;
