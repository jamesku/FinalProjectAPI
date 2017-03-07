import UserMeta from './User.js';
import UserPostMeta from './userPost.js';
import HtWallMeta from './htWall.js';
import connection from '../sequelize.js';

const User = connection.define('users', UserMeta.attributes, UserMeta.options);

const UserPost = connection.define('userposts', UserPostMeta.attributes, UserPostMeta.options);

const htWall = connection.define('htwalls', HtWallMeta.attributes, HtWallMeta.options);

UserPost.belongsTo(htWall);
UserPost.belongsTo(User);
User.belongsToMany(htWall, {through: 'UserWallAccess'});

connection.sync({force: true});

export default {User, UserPost, htWall};
