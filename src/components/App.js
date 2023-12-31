import { useEffect, useState } from "react";
import Logo from './Logo'
import Form from './Form'
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App(){

  const [items, setItems] = useState(function() {
    const storedValues = localStorage.getItem('items')
    return JSON.parse(storedValues) || [];
  })
  // const [items, setItems] = useState(function () {
  //   const storedvalue = localStorage.getItem("items")
  //   return JSON.parse(storedvalue);
  // });
  

  function handleAddItems(item) {
    setItems(items=> [...items, item]);

    // localStorage.setItem('items', JSON.stringify([...items, item]));
  }

  function handleDeleteItems(id) {
    setItems(items=>items.filter(item=>item.id !== id))
  }

  function handleToggleItem(id) {
    setItems(items => items.map(item => item.id === id ? {...item, packed: !item.packed}  : item )
  )};

  function handleClearList() {
    const confirmed = window.confirm('Are you sure you want to delete everything?');
    if (confirmed) setItems([]);
  }

  useEffect(function(){
    localStorage.setItem('items', JSON.stringify(items));
  },[items])

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItems={handleDeleteItems} onToggleItems={handleToggleItem} onClearList={handleClearList} />
      <Stats items={items}/>
  </div>
  )
};


