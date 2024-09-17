// Controller methods for messages
import { logDebug } from '../logging.js';
import api from '../api.js';

// Render message board view
export async function getMessageBoard(req, res) {
  const { data } = await api.getMessages();
  logDebug(req, 'data', JSON.stringify(data));
  res.render('message-board', { messages: data?.rows });
}
