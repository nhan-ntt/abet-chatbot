// mạng trường lỏ, cant work

import { readFileSync, existsSync, mkdirSync, writeFileSync, readdirSync } from 'fs';
import { dirname, basename, join } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Vector DB setup
const pinecone = new PineconeClient({
    apiKey: process.env.PINECONE_API_KEY, 
});

const pineconeIndex = pinecone.Index(process.env.PINECONE_PROD_INDEX_ABET);

const embedding = new GoogleGenerativeAIEmbeddings({
    model: "text-embedding-004",
    apiKey: process.env.GEMINI_API_KEY, 
}); 

// Clear existing data from namespace
// console.log('Clearing existing data from namespace...');
// await pineconeIndex.namespace(process.env.PINECONE_PROD_NAMESPACE).deleteAll();
// console.log('Namespace cleared successfully!');

// Process markdown files
const docsDir = join(__dirname, 'pdf');

const mdFiles = readdirSync(docsDir).filter(file => file.endsWith('.md'));

for (const file of mdFiles) {
  const fullPath = join(docsDir, file);
  console.log(`\n Processing file: ${file}`);
  await processFile(fullPath);
}

async function processFile(filePath) {
  const markdownContent = readFileSync(filePath, 'utf-8');
  const baseName = basename(filePath, '.md');
  const outputDir = join(__dirname, 'abet', baseName);

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  // Split by ## headers for ABET content
  const parts = markdownContent.split(/^### /m);
  const preamble = parts[0].trim();
  const sections = parts.slice(1);

  let indexID = 1;

  for (const section of sections) {
    const firstLineEnd = section.indexOf('\n');
    const title = section.slice(0, firstLineEnd).trim();
    const body = section.slice(firstLineEnd).trim();
    
    const fullContent = `${preamble}\n\n### ${title}\n\n${body}`;
    const safeFileName = title.replace(/[\\/:*?"<>|]/g, '').trim();
    const outputPath = join(outputDir, `${safeFileName}.md`);

    writeFileSync(outputPath, fullContent);
    console.log(`Created: ${outputPath}`);

    // Embed
    const embeddings = await embedding.embedQuery(fullContent);

    // Upsert to Pinecone
    await pineconeIndex.namespace(process.env.PINECONE_PROD_NAMESPACE).upsert([
      {
        id: `${baseName}-${indexID}`,
        values: embeddings,
        metadata: {
          title: title,
          source: `ABET Documentation - ${title}`,
          text: fullContent,
        }
      }
    ]);

    console.log(`Upsert to Pinecone: ${baseName}-${indexID}`);
    indexID++;
  }
}