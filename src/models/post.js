
export default (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    body: DataTypes.CONTENT,
  }, {
    underscored: true,
  });
  Post.associate = () => {
    // associations can be defined here
  };
  return Post;
};
