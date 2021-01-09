const duplicateService = async (ctx)=>{

        try{

            let query; 

            if(ctx.data.id){
                const task_log = await ctx.db.task_log.findOne({where : {id : ctx.data.id}})
                if("id" in task_log){ delete task_log.id }
                if("createdAt" in task_log){ delete task_log.createdAt }
                if("updatedAt" in task_log){ delete task_log.updatedAt }
                if("taskId" in task_log){
                    task_log.task = { connect : { id : task_log.taskId } }
                    delete task_log.taskId
                } 
                if("userId" in task_log){
                    task_log.user = { connect : { id : task_log.userId } }
                    delete task_log.userId
                } 
                query = {
                    data : {
                        ...task_log
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
       

            

            console.log(query)

            const task_logDuplicate = await ctx.db.task_log.create(query)

            return task_logDuplicate

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