const jwt = require('jsonwebtoken');

exports.authenticateToken = function(req, res) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
    });
}

exports.getUser = function(token){
    const decoded = jwt.decode(token);
    return decoded.id;
}

exports.createToken = function (user){
    const token = jwt.sign({id: user.id}, process.env.SECRET, {
        expiresIn: 3600
    });

    return token
}

