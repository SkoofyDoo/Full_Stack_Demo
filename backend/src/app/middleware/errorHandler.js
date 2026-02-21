export function errorHandler(err, res, req, next) {
    console.error(err)

    res.status(err.status || 500).json({message: err.message || 'Server Fehler'})
};