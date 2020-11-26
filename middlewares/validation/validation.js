const validation = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        const defaultError = {
          message: "Validation error!",
          value: error.details[0].message,
        };
        res.status(400).send({ error: defaultError });
      } else next();
    };
  };
  
  module.exports = { validation };

  /* 
    const errors = []

    if(!name || !password || password2 || !email){
      errors.push({ msg: "Please fill in all fields." })
    }

    if(password !== password2){
      errors.push({ msg: "Passwords do not match." })
    }

    if(password.length < 6){
      errors.push({ msg: "Password needs to be at least 6 characters long." })
    }

    if(errors.length > 0){
      res.status(200).send({ msg: `You have errors: ${errors}` })
    } else {
      next()
    }
  */