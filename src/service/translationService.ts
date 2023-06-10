import { TranslateClient, TranslateTextCommand, TranslateTextCommandInput } from "@aws-sdk/client-translate";

const client = new TranslateClient({
    region: "us-west-2"
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
