const jwt = require('jsonwebtoken');

exports.generateToken=async(id,collection)=>{

    const token = await jwt.sign({
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
