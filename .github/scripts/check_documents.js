const fs = require('fs').promises;
const yaml = require('yaml-front-matter');
const axios = require('axios');
const path = require('path'); /


const DOCS_DIR = path.join(__dirname, '..', '..', '.docs');

async function checkDocuments() {
    try {
        const files = await fs.readdir(DOCS_DIR);

        for (const file of files) {
            if (file.endsWith('.md')) {
                console.log(`Processing file: ${file}`);

                const content = await fs.readFile(path.join(DOCS_DIR, file), 'utf8');
                const frontMatter = yaml.loadFront(content);

                console.log(`Front matter for ${file}:`, frontMatter);

                let reviewDueDate = new Date(frontMatter.last_reviewed_on);
                reviewDueDate.setMonth(reviewDueDate.getMonth() + parseInt(frontMatter.review_cycle));

                console.log(`Review due date for ${file}:`, reviewDueDate);

                if (new Date() >= reviewDueDate) {
                    console.log(`Document needs review: ${file}`);
                    
                  
                    await axios.post('https://kind-petalite-gosling.glitch.me/review-request', {
                        path: file,
                        title: frontMatter.title
                    }).catch(console.error);
                } else {
                    console.log(`Document doesn't need review: ${file}`);
                }
            }
        }
    } catch (error) {
        console.error('Error reading directory:', error);
    }
}

checkDocuments().catch(console.error);
