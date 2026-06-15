const  {GoogleGenAI}=require('@google/genai');
console.log(process.env.GEMINI_API_KEY,"GEMINI_API_KEY");

const ai = new GoogleGenAI({apiKey:"AQ.Ab8RN6L2HEZmHRkPb57FqC0vkaWvSoP-LSPSZSmaWDTFq5npnA"});
const aiGpt=async(req,res)=>{
    const {question}=req.body;
    try {
            const response = await ai.models.generateContent({
                model: 'gemini-3.5-flash',
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