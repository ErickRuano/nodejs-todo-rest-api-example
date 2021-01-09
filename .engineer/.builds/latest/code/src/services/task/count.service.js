const countService = async (ctx)=>{

        try{
         
            let query = {
                ...ctx.query
            }

            const softDeleteFilter = { isArchived : false }
            if('where' in query){
                if(!('isArchived' in query.where)){
                    Object.assign(query.where, softDeleteFilter)
                }
            }else{
                query.where = softDeleteFilter
            }

            if('session' in ctx){
                const scope = { userId : ctx.session.user.id  }
                if(query.where){
                    Object.assign(query.where, scope)
                }else{
                    query.where = scope
                }
            }

            const taskCount = await ctx.db.task.count(query)

            return { taskCount }

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