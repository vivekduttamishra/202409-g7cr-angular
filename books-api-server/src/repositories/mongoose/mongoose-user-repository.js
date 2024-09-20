const { User } = require('./user.schema');


class MongooseUserRepository {

    getAllUsers = async () => {
        return await User.find({},{_id:0, __v:0, password:0});
    }

    addUser = async (user) => {

        var newUser = new User(user);
        //console.log('saving user',user,newUser);
        var dbUser = await newUser.save();
        return dbUser;
    }

    getUserByEmail = async (email) => {
        return await User.findOne({ email });
    }

    addUserToRoles = async (email, ...roles) => {
        return await User.findOneAndUpdate({ email }, {
            $push: {
                roles: { $each: newRoles }
            }
        });
    }

    removeUserFromRoles = async (email, ...roles) => {
        return await User.findOneAndUpdate({ email }, { $pull: { roles: { $in: rolesToRemove } } });
    }

    addToUserBookShelf = async (email,bookShelfItem) => {
        return await User.findOneAndUpdate({email},{ bookShelf: { $push: bookShelfItem } });
    }


}

module.exports = MongooseUserRepository;