const handleNotFound = (res, resource = 'Resource') => res.status(404).json({message: `${resource} not found`});

module.exports = handleNotFound;