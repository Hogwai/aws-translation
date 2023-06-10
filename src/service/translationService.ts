import { TranslateClient, TranslateTextCommand, TranslateTextCommandInput } from "@aws-sdk/client-translate";


const CREDENTIALS = {
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID!!,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY!!,
};

const client = new TranslateClient({
    region: "eu-west-3",
    credentials: CREDENTIALS
});


export async function translateText(text: string, sourceLanguage: string, targetLanguage: string): Promise<string> {
    const params: TranslateTextCommandInput = {
        SourceLanguageCode: sourceLanguage,
        TargetLanguageCode: targetLanguage,
        Text: text
    };

    try {
        const command = new TranslateTextCommand(params);
        const data = await client.send(command);
        if (data && data.TranslatedText) {
            return data.TranslatedText;
        } else {
            throw new Error('Translation failed');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}
