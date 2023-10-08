import { useState } from "react";
import ReactSlider from "react-slider";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa6";
import SearchBar from "../ui/SearchBar";
import SelectBox from "../ui/SelectBox";
import CheckBox from "../ui/CheckBox";
import Button from "../ui/Button";

const Filters = (props) => {
  const inputNumberClasses =
    "w-24 border border-gray-300 rounded-sm text-slate-900 text-center font-semibold tracking-wider transition duration-700 focus:outline-none focus:border-gray-500";

  const orderList = [
    { id: 1, text: "Popular", value: "id" },
    { id: 2, text: "Price", value: "price" },
    { id: 3, text: "Rating", value: "rating" },
  ];

  const elementsPerPageList = [
    { id: 1, text: "15" },
    { id: 2, text: "20" },
    { id: 3, text: "25" },
    { id: 4, text: "30" },
    { id: 5, text: "40" },
  ];

  const [elementsPerPage, setElementsPerPage] = useState(props.elementsPerPage);

  const elementsPerPageChangeHandler = (item) => {
    setElementsPerPage(item);
    props.setElementsPerPage(item);
  };

  return (
    <div className="mb-14">
      <div className="md:mb-5 flex flex-col xl:flex-row md:items-center lg:items-start xl:items-end gap-3 md:gap-5 lg:gap-8">
        <div className="flex flex-col md:flex-row items-center lg:items-end gap-3 md:gap-8 lg:gap-12">
          <SearchBar
            placeholder="Search"
            containerClass="border-bottom"
            inputClass="bg-transparent"
            value={props.searchInputValue}
            onSearch={props.onSearch}
          />
          <div className="flex flex-row items-end gap-3 md:gap-5 lg:gap-12">
            <div className="flex flex-row gap-3 order-2 lg:order-1">
              <div className="w-36">
                <SelectBox
                  list={orderList}
                  selected={orderList.find(
                    (item) => item.value === props.sortBy
                  )}
                  onSelect={(item) => props.setSortBy(item.value)}
                />
              </div>
              <div className="flex flex-row items-center gap-2 text-xl">
                {props.sortOrder === "des" ? (
                  <FaArrowAltCircleUp className={"filter-icon" + " active"} />
                ) : (
                  <FaArrowAltCircleUp
                    className={"filter-icon"}
                    onClick={() => props.setSortOrder("des")}
                  />
                )}

                {props.sortOrder === "asc" ? (
                  <FaArrowAltCircleDown className={"filter-icon" + " active"} />
                ) : (
                  <FaArrowAltCircleDown
                    className={"filter-icon"}
                    onClick={() => props.setSortOrder("asc")}
                  />
                )}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <CheckBox
                text="In Stock"
                isChecked={props.stockValue}
                onToggle={() =>
                  props.setStockValue((prevState) => (prevState === 0 ? 1 : 0))
                }
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center md:justify-start gap-3">
          <div className="flex gap-2 md:gap-5 text-xl">
            Show
            <div className="w-auto">
              <SelectBox
                list={elementsPerPageList}
                selected={elementsPerPage}
                onSelect={elementsPerPageChangeHandler}
              />
            </div>
            items
          </div>
          <div className="flex flex-row gap-2 text-xl">
            {props.activeLayout === "grid" ? (
              <BsGrid3X3GapFill className={"filter-icon" + " active"} />
            ) : (
              <BsGrid3X3GapFill
                className={"filter-icon"}
                onClick={() => props.setActiveLayout("grid")}
              />
            )}

            {props.activeLayout === "list" ? (
              <FaListUl className={"text-xl filter-icon" + " active"} />
            ) : (
              <FaListUl
                className={"text-xl filter-icon"}
                onClick={() => props.setActiveLayout("list")}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-5">
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-8">
          <div className="min-w-[15rem] w-80">
            <ReactSlider
              className="slider"
              thumbClassName="slider-thumb"
              trackClassName="slider-track"
              pearling
              min={props.minPrice}
              max={props.maxPrice}
              value={props.priceValues}
              step={1}
              minDistance={props.priceDistance}
              onChange={(newValues) => props.setPriceValues(newValues)}
            />
          </div>
          <div className="flex flex-row justify-center gap-4">
            <input
              type="number"
              min={props.minPrice}
              max={props.priceValues[1] - props.priceDistance}
              className={inputNumberClasses}
              value={props.priceValues[0]}
              onChange={(e) =>
                props.setPriceValues((prevState) => [
                  +e.target.value,
                  prevState[1],
                ])
              }
            />
            <span className="text-lg select-none">-</span>
            <input
              type="number"
              min={props.priceValues[0] + props.priceDistance}
              max={props.maxPrice}
              className={inputNumberClasses}
              value={props.priceValues[1]}
              onChange={(e) =>
                props.setPriceValues((prevState) => [
                  prevState[0],
                  +e.target.value,
                ])
              }
            />
          </div>
        </div>
        <div className="flex flex-row gap-3">
            <Button
              bg
              text="Apply"
              onClick={() => props.filterFunction()}
              className="rounded-sm py-1"
            />
          <Button
            bg
            text="Reset"
            onClick={() => props.resetFunction()}
            className="rounded-sm py-1"
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
