import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { closeTicket, getTicket } from '../features/tickets/ticketSlice'
import {getNotes,createNote, reset as notesReset} from '../features/notes/noteSlice'
import { useParams, useNavigate } from 'react-router-dom'
import NoteItem from '../components/NoteItem'
import BackButton from '../components/BackButton'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'
import {  AiFillCloseCircle } from "react-icons/ai";
import Spinner from '../components/Spinner'

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}

Modal.setAppElement('#root')

function Ticket() {

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')
  const { ticket, isLoading, isSuccess, isError, message } = useSelector((state) => state.tickets)
  const { notes, isLoading: notesIsLoading  } = useSelector((state) => state.notes)
  
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()
  const {ticketId} = useParams()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
    dispatch(getNotes(ticketId))
  }, [isError, message, ticketId, dispatch])
  
// Close Ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId))
    toast.success('Ticket Closed')
    navigate('/tickets')
  }

  // Open/Close Modal
  const openModal = ()=> setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)
  
  // Submit not
  const onNoteSumbit = (e) => {
    e.preventDefault()
    dispatch(createNote({noteText, ticketId}))
    closeModal()
  }


  if (isLoading || notesIsLoading) {
    return <Spinner/>
  }

  if (isError) {
    return <h3>Something Went Wrong</h3>
  }


  return (
    <div className='ticket-page'>
      <header className="ticket-header">
        <BackButton url='/tickets' />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>{ticket.status }</span>
        </h2>
        <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-NG')}
        </h3>
        <h3>Product: { ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== 'closed' && (<button className='btn' onClick={openModal}><FaPlus />Add Note</button>)}
      
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Add Note'>
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}> <AiFillCloseCircle size={28} /> </button>
        <form onSubmit={onNoteSumbit}>
          <div className="form-group">
            <textarea name="noteText" id="noteText" className='form-control' placeholder='Note Text' value={noteText} onChange={(e)=>setNoteText(e.target.value)}></textarea>
          </div>
          <div className="form-group">
            <button type='submit' className="btn">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes.map((note) => (
        <NoteItem key={note._id} note={note}/>
      ))}

      {ticket.status !== 'closed' && (
        <button onClick={onTicketClose} className='btn btn-block btn-danger'>
          Close Ticket
        </button>
      )}
    </div>
  )
}

export default Ticket