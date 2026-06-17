const  {GoogleGenAI}=require('@google/genai');
console.log(process.env.GEMINI_API_KEY,"GEMINI_API_KEY");

const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
const aiGpt=async(req,res)=>{
    const {question}=req.body;
    //hii changes done
    try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: question,
         });


         
                res.status(200).json({success:true,answer:response.text,message:"Answer fetch successfully"})
                
      } catch (error) {
        res.status(500).json({mesage:error})
         console.log(error);
        
    }
}

module.exports={
    aiGpt
}