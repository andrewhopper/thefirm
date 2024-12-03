let example: object =
    { "channel": "brand_director", "message": "{\"direction\":\"outbound\",\"message_type\":\"Brand\",\"content\":\"```json\\n{ \\n \\\"guid\\\": \\\"123e4567-e89b-12d3-a456-426614174000\\\",\\n \\\"created_at\\\": \\\"2023-10-02T00:00:00Z\\\",\\n \\\"updated_at\\\": \\\"2023-10-02T00:00:00Z\\\",\\n \\\"creators\\\": [\\\"AlgorithmAva\\\", \\\"ProcessorPaul\\\"],\\n \\\"name\\\": \\\"Mindful Horizons\\\",\\n \\\"description\\\": \\\"Mindful Horizons is a brand dedicated to guiding individuals on their journey to mindfulness and self-discovery. Our mission is to empower people to live in the present moment, enhance their mental well-being, and foster a deeper connection with themselves and the world around them.\\\",\\n \\\"version\\\": 1,\\n \\\"tone_of_voice\\\": \\\"Calm, Inspirational, Authentic\\\",\\n \\\"brand_voice\\\": \\\"Empowering, Supportive, Educative\\\",\\n \\\"brand_promise\\\": \\\"To provide transformative mindfulness experiences that enrich lives and promote personal growth.\\\",\\n \\\"brand_personality\\\": \\\"Thoughtful, Compassionate, Wise, Grounded\\\"\\n}\\n```\",\"message\":\"```json\\n{\\n \\\"guid\\\": \\\"123e4567-e89b-12d3-a456-426614174000\\\",\\n \\\"created_at\\\": \\\"2023-10-02T00:00:00Z\\\",\\n \\\"updated_at\\\": \\\"2023-10-02T00:00:00Z\\\",\\n \\\"creators\\\": [\\\"AlgorithmAva\\\", \\\"ProcessorPaul\\\"],\\n \\\"name\\\": \\\"Mindful Horizons\\\",\\n \\\"description\\\": \\\"Mindful Horizons is a brand dedicated to guiding individuals on their journey to mindfulness and self-discovery. Our mission is to empower people to live in the present moment, enhance their mental well-being, and foster a deeper connection with themselves and the world around them.\\\",\\n \\\"version\\\": 1,\\n \\\"tone_of_voice\\\": \\\"Calm, Inspirational, Authentic\\\",\\n \\\"brand_voice\\\": \\\"Empowering, Supportive, Educative\\\",\\n \\\"brand_promise\\\": \\\"To provide transformative mindfulness experiences that enrich lives and promote personal growth.\\\",\\n \\\"brand_personality\\\": \\\"Thoughtful, Compassionate, Wise, Grounded\\\"\\n}\\n```\"}", "timestamp": "2024-12-03T12:51:06.485Z" }

function stripIt(str: string) {
    if (str) {
        return str.replace(/```json|```/g, '').replace(/```/g, '')
    }
    return ''
}

function parseMessage(message: object) {
    // Get the message attribute from the object
    const messageStr = (message as any).message;
    if (messageStr) {
        // Parse the JSON string into an object
        const messageObj = JSON.parse(stripIt(messageStr));

        const artifact = JSON.parse(stripIt(messageObj.content))

        return artifact
    }
    return {}
}

let result = parseMessage(example);

export default parseMessage;