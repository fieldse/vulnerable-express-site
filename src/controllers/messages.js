// Controller methods for messages
import axios from 'axios';
import { logDebug } from '../logging.js';
import apiUrls from '../apiUrls.js';

// Render message board view
export async function getMessageBoard(req, res) {
  const { data } = await axios.get(apiUrls.allMessages);
  logDebug(req, 'data', JSON.stringify(data));
  res.render('message-board', { messages: data?.rows });
}
