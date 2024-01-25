const register = require('./register');
const login = require("./login");
const current = require("./current");
const logout = require("./logout");
const subscriptionUpdate = require("./subscriptionUpdate");
const updateAvatar = require("./updateAvatar");
const googleAuth=require("./googleAuth");
const googleRedirect=require("./redirect");
const googleLogin=require("./googleLogin");
const getUser=require("./getUser");
const addFavoriteCar=require("./addFavoriteCar");

module.exports = {
    register,
    login,
    current,
    logout,
    subscriptionUpdate,
    updateAvatar,
    googleAuth,
    googleRedirect,
    googleLogin,
    getUser,
    addFavoriteCar
}
