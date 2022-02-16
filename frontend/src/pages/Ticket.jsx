import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { closeTicket, getTicket } from '../features/tickets/ticketSlice'
import {getNotes, reset as notesReset} from '../features/notes/noteSlice'
import { useParams, useNavigate } from 'react-router-dom'
import NoteItem from '../components/NoteItem'
import BackButton from '../components/BackButton'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

function Ticket() {

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