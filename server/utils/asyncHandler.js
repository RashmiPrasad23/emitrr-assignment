
// pre handler created for  error handling so that we do not need to keep a check everywhere in the controller 
// and handling it by creating higher order fxns
const asyncHandler=(requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err)).
        catch((err)=>next(err))
    }
}


module.exports = asyncHandler