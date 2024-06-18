import User from "./models/user";
import Photo from "./models/photo";
import Comment from "./models/comment";
import Message from "./models/message";

// Define the relationship between User and Photo models
User.hasMany(Photo, { foreignKey: 'userId', sourceKey: 'id', onDelete: 'CASCADE'});
Photo.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'user'});

// Define the relationship between Photo and Comment models
Photo.hasMany(Comment, { foreignKey: 'photoId', sourceKey: 'id', onDelete: 'CASCADE'});
Comment.belongsTo(Photo, { foreignKey: 'photoId', targetKey: 'id', as: 'photo' });

// Define the relationship between User and Comment models
User.hasMany(Comment, { foreignKey: 'userId', sourceKey: 'id', onDelete: 'CASCADE'});
Comment.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });

// Define the relationship between User and Message models
User.hasMany(Message, { foreignKey: 'userId', sourceKey: 'id' });
Message.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });
