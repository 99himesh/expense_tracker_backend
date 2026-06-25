const AWS=require("aws-sdk")

const awsS3Services= async(stringifyExpense,filename)=>{
   const s3Bucket=new AWS.S3({
    accessKeyId:process.env.S3_ACCESS_KEY,
    secretAccessKey:process.env.S3_SECRET_KEY,
   })
   
    const params={
        Bucket:process.env.S3_BUCKET_NAME,
        Key:filename,
        Body:stringifyExpense,
        ACL:"public-read"
    }
    return new Promise((resolve,reject)=>{
        s3Bucket.upload(params,(err,s3response)=>{
                if(err){
                console.log(err);
                reject(err)
                }else{
                    console.log("successsss",s3response);
                    resolve(s3response.Location)
                }
        })
    })
   
   
}


module.exports={
    awsS3Services
}