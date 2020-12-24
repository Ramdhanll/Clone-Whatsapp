const User = require('../models/User')

const changeImage = (req, res) => {
   User.findByIdAndUpdate(req.body._id, {photo: req.body.url}, {new: true})
   .select("_id photo")
   .exec((err, result) => {
      if(err) return res.status(422).json({success: false, err})

      return res.status(200).json({success: true, user: result})
   })
}



module.exports = {
   changeImage
}