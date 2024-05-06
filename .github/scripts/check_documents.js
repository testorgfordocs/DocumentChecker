const fs = require('fs');
const yaml = require('yaml-front-matter');
const axios = require('axios');
const glob = require('glob');

const DOCS_DIR = './docs/';  // Directory containing documents

async function checkDocuments() {
    // Use glob to find markdown files
    glob(`${DOCS_DIR}*.md`, async (err, files) => {
        if (err) {
            console.error('Error finding files:', err);
            return;
        }

        for (const file of files) {
            const content = fs.readFileSync(file, 'utf8');
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
    });
}

checkDocuments().catch(console.error);
