const { organization } = require('./../../services')
 
const { countService } = organization
 
const countController = async (req, res, next) => {
  const { ctx, _query, session } = req
  const { db } = ctx 
  try {

      let context = {
        db : {
          organization : db.organization
        },
        session,
        query : _query
      }
      
      let results = await countService(context)
      
      if(results.hasOwnProperty('statusCode')){
        res.status(results.statusCode).send(results)
      }else{
        res.send(results)
      }
      next()
  
    
  } catch(e) {
    console.log(e)
    res.sendStatus(500) && next(e)
  }
}
 
module.exports = {
  countController
}