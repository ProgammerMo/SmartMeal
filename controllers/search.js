const handleSearch = (req, res, db) => {
    const { id } = req.body;

    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(() => {
        res.status(400).json("Unable to get entries");
    })
}

module.exports = { handleSearch : handleSearch };