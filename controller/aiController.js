const  {GoogleGenAI}=require('@google/genai');

const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

const aiGpt=async(req,res)=>{
    const {question}=req.body;
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

const generateCategary=async(req,res)=>{
    const {question}=req.body;
    try {
        const response=await ai.models.generateContent({
           model: 'gemini-2.5-flash',
           contents: 
           `Analyze the following description and select exactly ONE category.

      Categories:
      Technology, Education, Health, Finance, Travel, Food, Entertainment, Sports

      Description:
      ${question}

      Return ONLY the category name.
      Do not provide any explanation.
    `});
     const category = response.text.trim();
     res.status(200).json({
        success: true,
        category,
        message: "Category fetched successfully"
  });
    } catch (error) {
         res.status(500).json({mesage:error})
         console.log(error);
    }
}

module.exports={
    aiGpt,
    generateCategary
}