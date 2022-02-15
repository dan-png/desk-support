import axios from 'axios'


const API_URL = 'api/tickets/'

// Get ticket notes
const getNotes = async (tickeId, token) => {
  const config = {
    header: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + tickeId + '/notes', config)
  return response.data
}

const noteService = {
  getNotes,
}

export default noteService