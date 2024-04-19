const {OpenAIClient, AzureKeyCredential} = require ('@azure/openai');
const readline = require ('readline')

const client = new OpenAIClient(
    process.env.GET_ENDPOINT,
    new AzureKeyCredential (process.env.GET_KEY)

);

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
const getMensageFromAPI = async (message) =>{
    try{
        const response = await client.getCompletions(
            process.env.GPT_MODEL,
            message,
            {
            maxTokens: 50,
        })

      return response.choices[0].text.trim();      
    }   
    catch(error){
        console.error(error)
        return "mensagem nao encontrada";

    }
}

rl.question("Digite sua pergunta: ", async function (answer) {
    try {
        const response = await getMensageFromAPI(answer);
        console.log(response);
    } catch (error) {
        console.error("Erro ao obter resposta da API:", error);
    } finally {
        rl.close();
    }
});