import { GoogleGenAI } from "@google/genai";
<<<<<<< HEAD

// Validate API key early
if(!process.env.GEMINI){
    console.warn('GEMINI API key is not set (process.env.GEMINI) — AI generation will fail.');
}

const ai = new GoogleGenAI({apiKey:process.env.GEMINI});

const extractText = (response) =>{
    if(!response) return null;
    // Common shapes returned by different clients
    if(typeof response === 'string') return response;
    if(response.text) return response.text;
    if(response.output && Array.isArray(response.output)){
        for(const item of response.output){
            if(item.content && Array.isArray(item.content)){
                for(const c of item.content){
                    if(typeof c.text === 'string') return c.text;
                }
            }
        }
    }
    if(response.candidates && Array.isArray(response.candidates) && response.candidates[0].content){
        const cont = response.candidates[0].content;
        if(Array.isArray(cont) && cont[0] && cont[0].text) return cont[0].text;
        if(typeof cont === 'string') return cont;
    }
    return null;
}

const geminiMain = async (prompt) => {
  try{
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = extractText(response);
    if(!text){
      throw new Error('AI response did not contain text');
    }
    return text;
  }catch(err){
    console.error('Error calling Gemini API:', err && err.message ? err.message : err);
    throw err;
  }
=======
const ai = new GoogleGenAI({apiKey:process.env.GEMINI});

const geminiMain =async(prompt)=> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return(response.text);
>>>>>>> 99fb45abda0df70ee507f809d114273565534de6
}

export default geminiMain;