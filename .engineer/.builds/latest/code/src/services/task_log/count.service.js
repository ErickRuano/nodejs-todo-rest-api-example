const countService = async (ctx)=>{

        try{
         
            let query = {
                ...ctx.query
            }



            const task_logCount = await ctx.db.task_log.count(query)

            return { task_logCount }

        }catch(err){

            return {
                statusCode : 400,
                message : "One or more of your requests failed",
                error : err
            }
        }
  
}

module.exports = {
    countService
}