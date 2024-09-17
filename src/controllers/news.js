// Methods for news
import axios from 'axios';
import { logDebug } from '../logging.js';
import apiUrls from '../apiUrls.js';
// Render news view
export async function newsIndex(req, res) {
  const { data } = await axios.get(apiUrls.allNews);
  logDebug(req, 'data', JSON.stringify(data));
  res.render('news', { news: data?.rows });
}
