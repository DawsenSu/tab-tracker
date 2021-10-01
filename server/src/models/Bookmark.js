// eslint-disable-next-line no-unused-vars
module.exports =  (sequelize, DataTypes)  =>{
  const Bookmark = sequelize.define('Bookmark', {})

  Bookmark.associate = function (models) {
    // console.table(models)
    models.User.hasOne(Bookmark)
    Bookmark.belongsTo(models.User)
    models.Song.hasOne(Bookmark)
    Bookmark.belongsTo(models.Song)
  }
  return Bookmark
}
