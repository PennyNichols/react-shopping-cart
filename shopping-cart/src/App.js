import {useState} from "react";
import { Input, Button } from "reactstrap";
import {data} from "./assets/data"
import { BiTrash } from "react-icons/bi"

function App() {
  const [stateData, setStateData] = useState(data)
  const [totalItems, setTotalItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [searchValue, setSearchValue] = useState('')

  const calculateTotal = (arr) => {
    return arr.reduce((acc, i) => {
      return acc + i.count
    }, 0)
  }

  const handleIncr = (index) => {
    const newData = [...stateData]
    newData[index].count++

    // let total = newData.reduce((acc, i) => {
    //   return acc + i.count
    // }, 0)

    let totalPrice = 0;
    for (let i of newData) {
      totalPrice += i.count * i.price
    }
    setTotalPrice(totalPrice)
    setTotalItems(calculateTotal(newData))
    setStateData(newData)
  }
  const handleDecr = (ind) => {

    const newData = [...stateData]
    if (newData[ind].count) {
      newData[ind].count--

      // let total = 0;
      // for (let i of newData) {
      //   total += i.count
      // }
      let totalPrice = 0;
      for (let i of newData) {
        totalPrice += i.count * i.price
      }
      setTotalPrice(totalPrice)
      setTotalItems(calculateTotal(newData))
      // setTotalItems(total)
      setStateData(newData)
    }
  }
  const handleSearch = (event) => {
    setSearchValue(event.target.value)

  }
  const handleRemove = (index) => {
    const newData = [...stateData]
    newData.splice(index, 1)
    let totalPrice = 0;
    for (let i of newData) {
      totalPrice += i.count * i.price
    }
    setTotalPrice(totalPrice)
    setTotalItems(calculateTotal(newData))
    setStateData(newData)


  }

  const filtered = stateData.filter(i => i.title.toLowerCase().includes(searchValue.toLowerCase()))


  return (
    <div className="App">
      <div className="header">
        <Input value={searchValue} placeholder="search..." onChange={handleSearch} />
        <span className="counter">{totalItems}</span>
      </div>
      <div className="main">
        {filtered.map((item, index) => {
          return (
            <div className="custom-card">
              <img src={item.image} alt="" width='70' />
              <p>{item.title.slice(0, 12)}...</p>
              <div>
                <p>price: {item.price}</p>
                <p>{item.count}</p>
                <Button color="primary" onClick={() => handleIncr(index)}>+</Button>
                <Button color='secondary' onClick={() => handleDecr(index)}>-</Button>
                <Button color='danger' onClick={() => handleRemove(index)}><BiTrash /></Button>

              </div>
            </div>
          )
        })


        }
      </div>
      <div style={{ marginBottom: "10px", fontWeight: "bold" }}>Total price : {totalPrice}$ </div>
      <div>
        <Button>prev</Button>
        <Button>next</Button>
      </div>
    </div>
  );
}

export default App;