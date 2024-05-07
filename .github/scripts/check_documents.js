const fs = require('fs').promises;
const yaml = require('yaml-front-matter');
const axios = require('axios');
const path = require('path'); // Import the path module to handle file paths

// Construct the correct path to the '.docs' directory
const DOCS_DIR = path.join(__dirname, '..', '..', '.docs');

async function checkDocuments() {
    try {
        const files = await fs.readdir(DOCS_DIR);

        for (const file of files) {
            if (file.endsWith('.md')) {
                const content = await fs.readFile(path.join(DOCS_DIR, file), 'utf8');
                const frontMatter = yaml.loadFront(content);

                let reviewDueDate = new Date(frontMatter.last_reviewed_on);
                reviewDueDate.setMonth(reviewDueDate.getMonth() + parseInt(frontMatter.review_cycle));

                if (new Date() >= reviewDueDate) {
                    console.log(`Document needs review: ${file}`);
                    
                    // Send a POST request to your Glitch webhook URL
                    await axios.post(process.env.GLITCH_WEBHOOK_URL, {
                        path: file,
                        title: frontMatter.title
                    }).catch(console.error);
                }
            }
        }
    } catch (error) {
        console.error('Error reading directory:', error);
    }
}

checkDocuments().catch(console.error);
