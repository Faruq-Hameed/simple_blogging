const doesNameOrEmailAlreadyExit = async (User,req) => {
    const existingName = await User.findOne({ name: req.body.name.toLowerCase() }, {_id: 0, name: 1})
    if (existingName) {
        return {status: 409, message: `user with the name ${existingName.name} already exist`}
    }
    const existingEmail = await User.findOne({ email: req.body.email.toLowerCase() }, {_id: 0, email: 1})
    if (existingEmail) {
        return {status: 409, message: `user with the email ${existingEmail.email} already exist`}
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