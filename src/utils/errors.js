const doesNameOrEmailAlreadyExit = async (User,req) => {
    var user = await User.findOne({ name: req.body.name }, 'name email _id')
    if (user) {
        return {status: 409, message: `user with the name ${user.name} already exist`, user}
    }
    var user = await User.findOne({ email: req.body.email }, 'name email _id')
    if (user) {
        return {status: 409, message: `user with the email ${user.email} already exist`,user}
    }
}

function firstPromise() {
    return new Promise(function (resolve, reject) {
        const checkIfInfoExist = async () => {
            const existingName = User.findOne({ name: req.body.name.toLowerCase() })
            const existingEmail = User.findOne({ name: req.body.email.toLowerCase() })
            if (existingName) {
                reject(new Error({ status: 409, message: `user with the name ${existingName.name} already exist` }));
            }
            if (existingEmail) {
                reject(new Error({ status: 409, message: `user with the email ${existingEmail.name} already exist` }))
            }
        }
    });
}

//checking if the user._id exists in the database
// const doesUserExist = async (model, id) => {
//     const user = await model.findById(id)
//     if (user) {
//         return user;
//     }
//     user.error = true;
// }

//checking if the user._id exists in the database

module.exports = {doesNameOrEmailAlreadyExit}