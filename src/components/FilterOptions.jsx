import React, { useState, useEffect } from "react";

const FilterOptions = ({ onAllClick, onChange, selected, showOptions }) => {
  const options = [5, 10, 15, 20];
  const [selectedOption, setSelectedOption] = useState(selected); // Seçili seçenek durumu
  const [showAll, setShowAll] = useState(false); // Tüm verileri gösterme durumu
  const [previousSelected, setPreviousSelected] = useState(selected); // Önceki seçili seçenek durumu

  // Tüm verileri gösterme durumuna göre seçili seçeneği belirle
  const actualSelected = showAll ? "all" : selectedOption;

  useEffect(() => {
    if (showAll) {
      setPreviousSelected(selectedOption); // Tüm verileri gösterme durumu değiştiğinde önceki seçili seçeneği kaydet
      setSelectedOption("all"); // Seçili seçenek durumunu "all" olarak güncelle
    } else {
      setSelectedOption(previousSelected); // Tüm verileri gösterme durumu kapatıldığında önceki seçili seçeneği geri yükle
    }
  }, [showAll, previousSelected]);

  return (
    <div>
      <button
        className="all-button"
        onClick={() => {
          onAllClick();
          setShowAll(true); // "All" butonuna tıklandığında tüm verileri göster
        }}
        style={{ fontWeight: showAll ? "bold" : "normal" }}
      >
        All
      </button>
      <div style={{ display: showOptions ? "flex" : "none", flexDirection: "column" }}>
        {options.map((option) => (
          <button
            key={option}
            onClick={() => {
              onChange(option);
              setShowAll(false); // Herhangi bir seçenek butonuna tıklandığında tüm verileri gizle
              setSelectedOption(option); // Seçili seçenek durumunu güncelle
            }}
            style={{
              fontWeight:
                actualSelected === option || (actualSelected === "all" && option === 20) ? "bold" : "normal",
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterOptions;
