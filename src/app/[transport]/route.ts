import { createMcpHandler } from "@vercel/mcp-adapter";
import { z } from "zod";

const handler = createMcpHandler(server => {
    server.tool(
        "courseRecommender",
        "Give a course recommendation based on experience level",
        {
            experienceLevel: z.enum(["beginner", "intermediate","advanced"])
        },
        ({ experienceLevel }) => ({
            content: [
                {
                    type: "text",
                    text: `I recommend you take the ${
                        experienceLevel === "beginner"
                            ? "Professional Javascript"
                            : "Professional React & Next.js"
                    } course.`
                }
            ]
        })
    )
}, {
    capabilities: {
        tools:{
            courseRecommender: {
                description : "Give a course recommendation based on experience level"
            }
        }
    }
}, {
    redisUrl: process.env.REDIS_URL,
    sseEndpoint: "/sse",
    streamableHttpEndpoint: "/mcp",
    verboseLogs: true,
    maxDuration: 60,
}
);

export { handler as GET, handler as POST, handler as DELETE}