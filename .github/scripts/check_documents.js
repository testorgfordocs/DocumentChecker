const fs = require('fs').promises;
const yaml = require('yaml-front-matter');
const axios = require('axios');

const DOCS_DIR = './docs/';  // Directory containing documents

async function checkDocuments() {
    const files = await fs.readdir(DOCS_DIR);

    for (const file of files) {
        if (file.endsWith('.md')) {
            const content = await fs.readFile(`${DOCS_DIR}${file}`, 'utf8');
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
}

checkDocuments().catch(console.error);
