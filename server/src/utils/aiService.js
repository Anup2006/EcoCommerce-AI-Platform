import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI?.trim());

const generateProductMetadataAI = async ({
    title,
    description,
    material,
    price
    }) => {

    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash"
    });

    const result = await model.generateContent(`
        You are an AI product categorization assistant.

        Choose primaryCategory ONLY from this list:
        Sustainable Fashion
        Eco Home
        Green Beauty
        Reusable Products
        Zero Waste

        Product:
        Title: ${title}
        Description: ${description}
        Material: ${material || "Not provided"}
        Price: ${price || "Not provided"}

        Generate:
        - primaryCategory
        - subCategory
        - 5-10 SEO tags
        - sustainability filters

        Return ONLY JSON:

        {
            "primaryCategory":"",
            "subCategory":"",
            "seoTags":[],
            "sustainabilityFilters":[]
        }
    `);

    const text = result.response.text();

    const cleanJSON = text.replace(/```json|```/g, "").trim();

    return JSON.parse(cleanJSON);
};

export { generateProductMetadataAI };