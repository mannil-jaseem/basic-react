import './App.css';
import { useState } from 'react'

const data = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]

function App() {
  const [filter, setFilter] = useState('')
  const [stockOnly, setStockOnly] = useState(false)
  return (<div>
    <SearchBar changeFilter={setFilter} setStockOnly={setStockOnly} />
    <ProductTable data={data} filter={filter} stockOnly={stockOnly} />
  </div>)
}

function SearchBar({ changeFilter, setStockOnly }) {
  return <div className="search-bar">
    <input type='text' id="search" onChange={(e) => changeFilter(e.target.value)} />
    <br />
    <input type='checkbox' onChange={(e) => setStockOnly(e.target.checked)} />
    <label>Only sow products in stock</label>
  </div>
}

function ProductTable({ data, filter, stockOnly }) {
  let fruits = [], veg = []
  data.forEach(e => {
    if (
      e.name.toLowerCase().indexOf(
        filter.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if ((stockOnly && e.stocked) || !stockOnly)
      e.category === "Fruits" ? fruits.push(<ProductRow name={e.name} value={e.price} key={e.name} />)
        : veg.push(<ProductRow name={e.name} value={e.price} key={e.name} />)
  })
  return <>
    <table className="product-row">
      <thead>
        <tr>
          <th>NAME</th>
          <th>PRICE</th>
        </tr>
      </thead>
      <tbody>
        <ProductCategoryRow heading={'Fruits'} />
        {fruits}
        <ProductCategoryRow heading={'Vegetables'} />
        {veg}
      </tbody>
    </table>
  </>
}

function ProductCategoryRow({ heading }) {
  return <>
    <tr>
      <td colSpan="2" className='product-cat-row'>{heading}</td>
    </tr>
  </>
}

function ProductRow({ name, value }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  );
}

export default App;
