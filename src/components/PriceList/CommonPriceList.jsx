import React, { useState, useEffect } from "react";

const CommonPriceList = ({
  title,
  title2,
  title3,
  options,
  cartDataArray,
  scrollToF,
  onCheckboxChange,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);

  // Initialize selectedItems based on cartDataArray
  useEffect(() => {
    const initialSelectedItems = {};
    cartDataArray.forEach((item) => {
      if (!initialSelectedItems[item.category]) {
        initialSelectedItems[item.category] = [];
      }
      initialSelectedItems[item.category].push({
        subcategory: item.subcategory,
        price: item.price,
        description: item.description,
      });
    });
    setSelectedItems(initialSelectedItems);
  }, [cartDataArray]);

  const handleCheckboxChange = (category, key, isChecked, price, itemTitle) => {
    const updatedItems = { ...selectedItems };

    if (isChecked) {
      if (!updatedItems[category]) {
        updatedItems[category] = [];
      }
      updatedItems[category].push({
        subcategory: key,
        price,
        description: itemTitle,
      });
    } else {
      updatedItems[category] = updatedItems[category].filter(
        (item) => item.subcategory !== key
      );
      if (updatedItems[category].length === 0) {
        delete updatedItems[category];
      }
    }

    setSelectedItems(updatedItems);
    onCheckboxChange(category, updatedItems[category] || []);
  };

  useEffect(() => {
    // Trigger the parent callback with the initial category and items
    const firstCategory = Object.keys(selectedItems)[0];
    if (firstCategory) {
      onCheckboxChange(firstCategory, selectedItems[firstCategory]);
    }
  }, [selectedItems]);

  return (
    <>
      <div>
        {title && (
          <div className="uppercase text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-greentextprice py-2 px-2 font-semibold bg-tablelightbrown">
            {title}
          </div>
        )}
        <div>
          {options &&
            Object.entries(options).map(
              ([category, subCategories]) =>
                subCategories &&
                Object.entries(subCategories).map(([key, item], index) => (
                  <React.Fragment key={key}>
                    {index === 0 && (
                      <>
                        {title && (
                          <>
                            <div className="uppercase text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-greentextprice py-2 px-2 font-semibold bg-tablelightbrown">
                              {/* {title} */}
                            </div>
                          </>
                        )}
                      </>
                    )}
                    {index === 3 && title2 && (
                      <div className="uppercase text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-greentextprice py-2 px-2 font-semibold bg-tablelightbrown">
                        {title2}
                      </div>
                    )}
                    {index === 6 && title3 && (
                      <div className="uppercase text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-greentextprice py-2 px-2 font-semibold bg-tablelightbrown">
                        {title3}
                      </div>
                    )}
                    <div
                      className={`${["C2", "C3", "C4", "D2", "D4", "D1"].includes(key)
                        ? ""
                        : "flex gap-4 py-4"
                        }`}
                    >
                      <div>
                        {["C2", "C3", "C4", "D2", "D4", "D1"].includes(key) ? (
                          <button onClick={scrollToF} className="w-full pl-7">
                            <div className="flex justify-between w-full  text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                              <div className="text-left font-semibold ">
                                {key} {item.title}
                                <span className="text-iconborder font-normal">
                                  {item.description}
                                </span>
                                {["D2", "D4", "D1"].includes(key) && (
                                  <span className="text-footerblue font-semibold">
                                    {" "}
                                    (SOLD){" "}
                                  </span>
                                )}
                              </div>
                              <div
                                className={`font-semibold ${["D2", "D4", "D1"].includes(key)
                                  ? "text-black/50 line-through"
                                  : ""
                                  }`}
                              >
                                {item.price}
                              </div>
                            </div>
                            <ul className="text-left">
                              {item.features?.map((feature, idx) => (
                                <li
                                  key={idx}
                                  className="text-iconborder text-sm md:text-base lg:text-lg xl:text-lg 2xl:text-xl"
                                >
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </button>
                        ) : (
                          <input
                            type="checkbox"
                            checked={selectedItems[category]?.some(
                              (selected) => selected.subcategory === key
                            )}
                            onChange={(e) =>
                              handleCheckboxChange(
                                category,
                                key,
                                e.target.checked,
                                item.price.replace(/\D/g, ""),
                                item.title
                              )
                            }
                          />
                        )}
                      </div>

                      <div className="flex flex-col justify-between w-full">
                        {!["C2", "C3", "C4", "D2", "D4", "D1"].includes(key) && (
                          <>
                            <div className="flex justify-between w-full text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                              <div className="space-x-2 font-semibold">
                                {key} {item.title}{" "}
                                <span className="text-iconborder font-normal">
                                  {item.description}
                                </span>
                              </div>
                              <div className="font-semibold">{item.price}</div>
                            </div>
                            <ul>
                              {item.features?.map((feature, idx) => (
                                <li
                                  key={idx}
                                  className="text-iconborder text-sm md:text-base lg:text-lg xl:text-lg 2xl:text-xl"
                                >
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                        {item.para && (
                          <div className="text-iconborder text-sm md:text-base lg:text-lg xl:text-lg 2xl:text-xl w-[60%]">
                            {item.para}
                          </div>
                        )}
                      </div>
                    </div>
                  </React.Fragment>
                ))
            )}
        </div>
      </div>
    </>
  );
};

export default CommonPriceList;
