// Methods for news
import axios from 'axios';
import { logDebug } from '../logging.js';
import { BASE_API_URL } from '../config.js';

// Render news view
export async function newsIndex(req, res) {
  const { data } = await axios.get(BASE_API_URL + '/news');
  logDebug(req, 'data', JSON.stringify(data));
  res.render('news', { news: data?.rows });
}
