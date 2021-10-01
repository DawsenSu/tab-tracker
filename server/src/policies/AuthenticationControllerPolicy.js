const Joi = require('joi')

module.exports = {
  async register (req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    })
    try {
      await schema.validateAsync(req.body)
      next()
    } catch (error) {
      switch (error.details[0].context.key) {
        case 'email' :
          res.status(400).send({
            error: "You must provide a valid email address"
          })
          break
        case 'password' :
          res.status(400).send({
            error: `The password provided failed to match teh following rulres:
            \n
            1. It must contains ONLY the following characters: lower case, upper case and number;
            \n
            2. It must be at least 8 characters in length and not greater than 32.
            `
          })
          break
        default:
          res.status(400).send({
            error: "Invalid registeration information"
          })
      }
    }
  }
}