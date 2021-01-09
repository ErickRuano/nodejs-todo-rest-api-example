const duplicateService = async (ctx)=>{

        try{

            let query; 

            if(ctx.data.id){
                const task = await ctx.db.task.findOne({where : {id : ctx.data.id}})
                if("id" in task){ delete task.id }
                if("createdAt" in task){ delete task.createdAt }
                if("updatedAt" in task){ delete task.updatedAt }
                if("deletedAt" in task){ delete task.deletedAt }
                if("userId" in task){
                    task.user = { connect : { id : task.userId } }
                    delete task.userId
                } 
                query = {
                    data : {
                        ...task
                    },
                    ...ctx.query
                }
            }else{
                query = {
                    data :{
                        ...ctx.data
                    },
                    ...ctx.query
                }    
            }
       

            
            if('session' in ctx){
                const scope = { user : { connect : { id : ctx.session.user.id  } } }
                if(query.data){
                    Object.assign(query.data, scope)
                }else{
                    query.data = scope
                }
            }

            console.log(query)

            const taskDuplicate = await ctx.db.task.create(query)

            return taskDuplicate

        }catch(err){

            return {
                statusCode : 400,
                message : "One or more of your requests failed",
                error : err
            }
        }
  
}

module.exports = {
    duplicateService
}