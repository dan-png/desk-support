import { useState } from 'react'
import {useSelector} from 'react-redux'

function NewTicket() {
  const { user } = useSelector((state) => state.auth)
  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product, setProduct] = useState('')
  const [description, setDescription] = useState('')

  const onSubmit = (e) => {
    e.preventdefault()
  }

  return (
    <>
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>
      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={name} disabled/>
          <label htmlFor="email">Customer Email</label>
          <input type="email" className="form-control" value={email} disabled />
          
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="product">Product</label>
              <select name="product" id="product" value={product} onChange={(e) => setProduct(e.target.value)}>
                <option value="iPhone">iPhone</option>
                <option value="iMac">iMac</option>
                <option value="iPad">iPad</option>
                <option value="iWatch">iWatch</option>
                <option value="Airpods">Airpods</option>
                <option value="AirTag">AirTag</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description of Issue</label>
              <textarea name="description"
                id="description"
                value={description}
                className='form-control' placeholder='Description'
                onChange={(e)=>setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <button className="btn btn-block">Submit</button>
            </div>
            
          </form>
        </div>
      </section>
    </>
  )
}

export default NewTicket