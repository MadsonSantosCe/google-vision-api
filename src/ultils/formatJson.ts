export const formatJson = (textJson: string) => {
    const responseText = textJson.replace(/^```json\n/, "").replace(/\n```$/, "");
    
    try {
      const jsonResponse = JSON.parse(responseText);
      return jsonResponse;
    } catch (parseError) {
      console.error("Erro ao converter resposta para JSON:", parseError);
      return { error: "Falha ao interpretar a resposta do Google AI", rawText: responseText };
    }
}