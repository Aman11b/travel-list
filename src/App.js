import { useState } from "react";

export default function App() {
  // lifting state
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    // setItems((items) => items.push(item));
    // cant do as in react cant mutate state

    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴Far Away 🧳</h1>;
}
function Form({ onAddItems }) {
  // controlled element
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;
    // console.log(e);

    const newItem = { description, quantity, package: false, id: Date.now() };

    console.log(newItem);

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip 😁</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/* <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option> */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} onDeleteItem={onDeleteItem} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {""}
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>🎒You have X items list,and you already packed X (X%)</em>
    </footer>
  );
}

/**
 * State vs Prop
 * -> state is internal data owned by component,component memory,can be updated by component itself,updating leads to rerendering ,used to make component interactive
 * -> props is external data owned by parent,read-only,when new prop is received re-rendering happens,used by parent to configure child component
 */

/**
 * THINKING IN REACT
 * -> break the desired UI into components and establish the component tree
 * -> build a static version
 * [state management]
 * -> think about state
 * --> when to use state
 * --> type os state logical or global
 * --> where to place state
 * -> establish the data flow
 * --> one way data flow
 * --> parent to child communication
 * --> accessing global state
 */

/**
 * FUNDAMENTALE OF STATE MANAGEMENT
 * -> deciding when to create a peice of state what type of state are necessary where to place each peices of state and how data flows through the app
 * ->LOCAl STATE
 * - state needed only by one or few component
 * - alway start with local state
 * -> GLOBAL STATE (shared stae)
 * - state that many component might need
 * - implemented by content api or redux
 * -> WHEN and WHERE
 * -> need to store data( will this data change ? yes : regular variable) is can be computed then use previous existing state derived state > should it re-render component > no then REF (useRef, no re-render) > yes now create new state
 * -> WHERE
 * -> is needed in one component then leave it there
 * -> if can be needed in chalid component then pass it as props
 * -> if used by one or few sibling component -> left state to first commen parent (lifting state up)
 * -> if need in more sibilings then its global state
 */

/**
 * LIFTING UP STATE
 * -> problem sharing state with sibliing component
 * -> lift it to closest common parent component
 * [data can only flow down to childen via props not sideways to siblings]
 * -> how a child promotion(child) update sate in checkout(parent) > pass setCoupon down to component which need to update the state
 */
