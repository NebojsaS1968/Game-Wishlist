const checkSessProtect = (req, res, next) => {
  const { sid } = req.session
    if(!sid){
      res.send({ msg: "You are not authenticated!" })
    } else {
        next()
    }
  }

  const checkSessLoged = (req, res, next) => {
    const { sid } = req.session
    if(sid){
      res.send({ msg: "You are already authenticated!" })
    } else {
        next()
    }
  }

module.exports = {
    checkSessProtect,
    checkSessLoged
}