import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY?.trim());

export const generatechatBotResponse = async ({ message, orderData }) => {
    try {

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        });

        const prompt = `
            You are a professional WhatsApp AI Customer Support Bot for an e-commerce store.

            You must answer politely and clearly.

            You can handle the following customer queries:

            1. Order status
            2. Order tracking
            3. Delivery date questions
            4. Shipping time
            5. Return policy
            6. Refund requests
            7. Wrong or damaged item
            8. Order cancellation
            9. Order modification
            10. Product information
            11. Greetings
            12. General help
            13. Unknown questions

            IMPORTANT RULES:

            1. If the user asks about order status, use the order data below.
            2. If the user asks about return policy, explain the return policy.
            3. If the user asks about refund, damaged product, complaint, or wrong item → mark escalation required.
            4. Always respond like a friendly WhatsApp support agent.
            5. Keep responses short and helpful.
            6. If the user asks about an order but order data is NOT available, politely ask for the Order ID.
            7. NEVER guess or invent order details.

            CONFIDENCE RULES:

            Give a confidence score from 0–100 based on how certain you are.

            Examples:
            - Greeting or simple help → 95+
            - Order tracking with order data → 95+
            - Return policy → 90+
            - Refund complaint → 70–80
            - Unknown question → 50–60

            Store Return Policy:
            - Returns allowed within 7 days
            - Item must be unused
            - Refund processed in 3–5 business days

            Order Data (from database):
            ${orderData ? JSON.stringify(orderData, null, 2) : "No order information available"}

            Customer Message:
            ${message}

            Return response ONLY in JSON format:

            {
            "reply": "AI reply message",
            "priority": "Normal or High",
            "escalate": true or false,
            "confidence": number
            }
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        let cleanedText = text
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();

        let parsed;

        try {
            parsed = JSON.parse(cleanedText);
        } catch {
            parsed = {
                reply: cleanedText,
                priority: "Normal",
                escalate: false,
                confidence: 70
            };
        }

        if (!parsed.confidence) {
            parsed.confidence = parsed.priority === "High" ? 70 : 90;
        }

        return parsed;

    } catch (error) {

        console.error("AI Error:", error);

        return {
            reply: "Sorry, I'm having trouble answering right now.",
            priority: "Normal",
            escalate: false,
            confidence: 50
        };
    }
};