import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  //since we are trying to update the items state, we should call the useEffect hook here in the ShoppingList component to initiate the fetch request
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then(res => res.json())
      .then((items) => setItems(items))
  }, []);

  //callback function to pass as a prop to ItemForm component to add a new item
  function handleAddItem(newItem) {
    console.log("In Shopping List: ", newItem);
    setItems([...items, newItem]);
  }

  //callback function to pass as a prop to Item to update an item
  function handleUpdateitem(updatedItem){
    //console.log("In Shopping Cart: ", updatedItem);
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id){
        return updatedItem;
      } 
      else {
        return item;
      }
    });
    setItems(updatedItems);
  }

  //callback function to pass as a prop to Item to delete an item
  function handleDeleteItem(deletedItem){
    console.log("In Shopping Cart: ", deletedItem);
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateitem} onDeleteItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
