// 404 / error methods

export async function render404(req, res) {
  var message;
  if (req.path === '/404') {
    message = req.params.message || 'An unknown error occurred';
  }
  res.render('404', { message: message || 'That page is not found.' });
}
