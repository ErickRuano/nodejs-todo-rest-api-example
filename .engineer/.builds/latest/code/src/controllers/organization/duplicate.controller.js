const { organization } = require('./../../services')
 
const { duplicateService } = organization
 
const duplicateController = async (req, res, next) => {
  const { ctx, _query, session, body } = req
  const { db } = ctx 
  try {

      let context = {
        db : {
          organization : db.organization
        },
        session,
        data : body,
        query : _query
      }
      
      let results = await duplicateService(context)
      
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
  duplicateController
}