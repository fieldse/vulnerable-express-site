// Methods for news
import { logDebug } from '../logging.js';
import api from '../api.js';

// Render news view
export async function newsIndex(req, res) {
  const { data } = await api.getNews();
  logDebug(req, 'data', JSON.stringify(data));
  res.render('news', { news: data?.rows });
}
