const findManyService = async (ctx)=>{
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
        
        let results = await ctx.db.task.findMany(query);
        
        return results;

    }catch(err){
        return {
            statusCode : 500,
            message : "An error ocurred while processing your request",
            error : err
        }
    }
}
    
module.exports = {
    findManyService
}