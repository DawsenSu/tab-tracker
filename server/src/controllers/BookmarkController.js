const {Bookmark} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const { songId, userId } = req.query
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to index a bookmark'
      })
    }
  },
  async post (req, res) {
    try {
      const { songId, userId } = req.body

      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })

      if(bookmark) {
        return res.status(400).send({
          error: "bookmark already exists."
        })
      }
      const newBookmark = await Bookmark.create({
        SongId: songId,
        UserId: userId
      })
      res.send(newBookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to create a bookmark'
      })
    }
  },
  async delete (req, res) {
    try {

      const { bookmarkId } = req.params
      console.log(bookmarkId)
      const bookmark = await Bookmark.findByPk(bookmarkId)
      if(!bookmark){
        return res.status(403).send({
          error: 'you don\'t have access to this bookmark'
        })
      }
      await bookmark.destroy()
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to delete a bookmark'
      })
    }
  }
}