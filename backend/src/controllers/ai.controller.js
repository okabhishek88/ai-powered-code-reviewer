import aiService from "../services/ai.service.js"

export const aiController = async (req, res) => {
    try {
        const code = req.body.code

        // Check if the data is present
        if (!code) {
            return res.status(400).send("Prompt is required")
        }

        // Call the generateContent function with the prompt
        const response = await aiService(code)

        // Send the AI-generated response back to the client
        res.status(200).send(response)
    }
    catch (error) {
        console.error(`Error: ${error}`)
    }
}