import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
    try {
        // Create some sample templates
        const templates = [
            {
                name: "Modern Professional",
                category: "Professional",
                description: "Clean and modern design perfect for corporate roles",
                featured: true,
                rating: 4.9,
                downloads: 15000,
            },
            {
                name: "Creative Designer",
                category: "Creative",
                description: "Eye-catching design for creative professionals",
                featured: false,
                rating: 4.8,
                downloads: 12000,
            },
            {
                name: "Tech Specialist",
                category: "Technology",
                description: "Technical-focused layout for developers and engineers",
                featured: true,
                rating: 4.9,
                downloads: 18000,
            },
            {
                name: "Executive",
                category: "Executive",
                description: "Sophisticated design for senior-level positions",
                featured: false,
                rating: 4.7,
                downloads: 8000,
            },
        ];
        for (const template of templates) {
            await prisma.template.upsert({
                where: { name: template.name },
                update: template,
                create: template,
            });
        }
        console.log("✅ Database initialized successfully!");
        console.log("📋 Created sample templates");
    }
    catch (error) {
        console.error("❌ Error initializing database:", error);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
