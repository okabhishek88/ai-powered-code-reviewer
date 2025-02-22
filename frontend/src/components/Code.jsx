import { useEffect, useState } from "react"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css"
import axios from "axios"
import Markdown from "react-markdown"

const Code = () => {
    const [code, setCode] = useState("function sum() {return a + b}")
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(false)

    async function reviewCode() {
        setLoading(true)
        try {
            const result = await axios.post('http://localhost:8000/ai/get-review', { code })
            setResponse(result.data)
        } catch (error) {
            console.error("Error sending code for review:", error)
        } finally {
            setLoading(false)
        }
    }

    // useeffect hook
    useEffect(() => {
        prism.highlightAll()
    }, [])

    return (
        <div className="container">
            <div className="left">
                <div className="codee">
                    <Editor value={code}
                        onValueChange={code => setCode(code)}
                        highlight={code => prism.highlight(code, prism.languages.js, "javascript")}
                        style={{
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 18,
                            width: "100%",
                            height: "100%",
                            background: "none",
                            overflow: "auto"
                        }}
                    />
                </div>
                <button className="review" onClick={() => reviewCode(code)} disabled={loading}>
                    {loading ? "Reviewing..." : "Review"}
                </button>
            </div>
            <div className="right">
                {
                    loading ? (
                        <div className="loading-spinner">
                            <p>AI is doing its magic...</p>
                        </div>
                    ) : (
                        <Markdown>{response}</Markdown>
                    )
                }
            </div>
        </div>
    )
}

export default Code
