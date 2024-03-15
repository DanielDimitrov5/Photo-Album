import User from "./models/user";
import Photo from "./models/photo";
import Comment from "./models/comment";
import Message from "./models/message";

User.hasMany(Photo, { foreignKey: 'userId', sourceKey: 'id', onDelete: 'CASCADE'});
Photo.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'user'});

Photo.hasMany(Comment, { foreignKey: 'photoId', sourceKey: 'id', onDelete: 'CASCADE'});
Comment.belongsTo(Photo, { foreignKey: 'photoId', targetKey: 'id', as: 'photo' });

User.hasMany(Comment, { foreignKey: 'userId', sourceKey: 'id', onDelete: 'CASCADE'});
Comment.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });

User.hasMany(Message, { foreignKey: 'userId', sourceKey: 'id' });
Message.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });

