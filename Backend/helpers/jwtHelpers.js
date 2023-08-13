const jwt = require('jsonwebtoken');

exports.generateToken=(id,collection)=>{

    const token =  jwt.sign({
        id,
        collection
    },
    process.env.JWT_SECRET_KEY,
    {
        expiresIn:"7d"
    }
    )
    return token;
}
