require('dotenv/config');

module.exports = {
    SECRET: `${process.env.SECRET}`,
    expiresIn: '7d'
}