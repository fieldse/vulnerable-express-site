// Controller methods for messages
import axios from 'axios';
import { logDebug } from '../logging.js';
import { BASE_API_URL } from '../config.js';

// Render message board view
export async function getMessageBoard(req, res) {
  const { data } = await axios.get(BASE_API_URL + '/messages');
  logDebug(req, 'data', JSON.stringify(data));
  res.render('message-board', { messages: data?.rows });
}
