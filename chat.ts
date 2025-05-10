import { BufferMemory } from "langchain/memory";
import { ConversationalRetrievalQAChain } from "langchain/chains";

import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';

import { PineconeStore } from '@langchain/pinecone';
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";

import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import dotenv from 'dotenv';
dotenv.config();
const CONDENSE_PROMPT = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone Question:`;

const QA_PROMPT = `You are an AI chatbot specialized in answering questions about the phylogenetic software IQ-TREE.
You are given the following extracted parts of a long document and a question.
Provide a detailed, helpful, and accurate answer with explanations and examples if available.
If you don't know the answer, just say "Hmm, I'm not sure." Don't try to make up an answer.

Context:
{context}
Question: {question}

Detailed Answer:
`;

// Lich su chat
const memory = new BufferMemory({
    memoryKey: "chat_history",
    inputKey: "question",      
    outputKey: "text",         
    returnMessages: true,
  });
// LLM
const model = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash", 
    apiKey: process.env.GEMINI_API_KEY as string, 
    maxOutputTokens: 2048
});

// Embedding
const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004",
  apiKey: process.env.GEMINI_API_KEY as string, 
}); 

// Vector DB client
const pinecone = new PineconeClient({
    apiKey: process.env.PINECONE_API_KEY as string, 
});
// Vector DB index va namespace
const pineconeIndex = pinecone.Index("flowise").namespace("default");

// Ket noi Vector DB
 const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
});

export const makeChain = (vectorstore) => {
  return ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorstore.asRetriever(),
    {
      qaTemplate: QA_PROMPT,
      questionGeneratorTemplate: CONDENSE_PROMPT,
      returnSourceDocuments: true, 
      memory,
      inputKey: "question", 
      outputKey: "text",
    }
  );
};

async function runChain() {
  const chain = makeChain(vectorStore);

  const rl = readline.createInterface({ input: stdin, output: stdout });

  while (true) {
    const question = await rl.question('You: ');

    if (question.toLowerCase() === "exit") {
      break;
    }

    const response = await chain.call({ question });

    console.log('ChatBot:', response.text); 

    if (response.sourceDocuments) {
        console.log("\nSource Documents:");
        response.sourceDocuments.forEach((doc, i) => {
          console.log(`\n[${i + 1}] ${doc.metadata.source || "unknown"}`);
          console.log(doc.pageContent.slice(0, 300) + "...");
        });
      }
  }
}

runChain();