import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import{ toast} from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import {registerUser, reset} from '../features/auth/authSlice' 
import Spinner from '../components/Spinner'

function Register() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2:''
  })

  const { name, email, password, password2 } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)
  
  useEffect(() => {
    if (isError) {
     toast.error(message)
    }
    
    // Redirect when user is logged in
    if (isSuccess) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, dispatch, navigate])
  

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name, email, password
      }

      dispatch(registerUser(userData))
    }

  }

  if (isLoading) {
    return <Spinner/>
  }

  return <>
    <section className="heading">
      <h1>
        <FaUser />
       {''} Register
      </h1>
      <p>Please create an account</p>
    </section>
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type='text'
            className='form-control'
            id='name'
            name='name'
            value={name}
            onChange={onChange}
            placeholder='Enter your fullname'
            required
          />
        </div>
        <div className="form-group">
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={email}
            onChange={onChange}
            placeholder='Enter your Email'
            required
          />
        </div>
        <div className="form-group">
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            value={password}
            onChange={onChange}
            placeholder='Enter  Password'
            required
          />
        </div>
        <div className="form-group">
          <input
            type='password'
            className='form-control'
            id='password2'
            name='password2'
            value={password2}
            onChange={onChange}
            placeholder='Confirm Password'
            required
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block">
            Submit
          </button>
        </div>
      </form>
    </section>
  </>;
}

export default Register;
