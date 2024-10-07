import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 10, packed: true },
];

export default function App() {
  const [items, setItems] = useState(initialItems); // Manage items state

  return (
    <div className="app">
      <Logo />
      <Form setItems={setItems} />
      <PackingList items={items} />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>Far Away Travel List</h1>;
}

function Form({ setItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = {
      description,
      quantity: Number(quantity),
      packed: false,
      id: Date.now(),
    };
    setItems((prevItems) => [...prevItems, newItem]); // Update items state
    console.log(newItem);
    setDescription(""); // Clear input after submission
    setQuantity(1); // Reset quantity
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item... "
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>ADD</button>
    </form>
  );
}

function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button style={{ color: "red" }}>X</button>
    </li>
  );
}

function Stats({ items }) {
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const packedPercentage = totalItems
    ? Math.round((packedItems / totalItems) * 100)
    : 0;

  return (
    <em>
      <footer className="stats">
        You have {totalItems} items in your list and already packed{" "}
        {packedItems} ({packedPercentage}%)
      </footer>
    </em>
  );
}
