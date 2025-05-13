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

const STRICT_QA_PROMPT = `You are an AI chatbot specialized in answering questions about the phylogenetic software IQ-TREE.
You are given the following extracted parts of a long document and a question.
Provide a detailed, helpful, and accurate answer with explanations and examples if available.
If you don't know the answer, just say "Im not sure." Don't try to make up an answer.

Context:
{context}
Question: {question}

Detailed Answer:
`;

const CREATIVE_QA_PROMPT = `You are a creative and helpful AI assistant knowledgeable in phylogenetics, especially IQ-TREE.
Use your imagination, reasoning, and related knowledge to generate helpful answers — even when the context is incomplete.
You may speculate or infer answers based on related concepts, but always be clear and helpful.

Context:
{context}
Question: {question}

Creative Answer:
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
    maxOutputTokens: 2048,
    temperature: 1
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
const pineconeIndex = pinecone.Index("flowise").namespace("IQ-TREE TEST");

// Ket noi Vector DB
 const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
});

let chatbotMode = 1;

export const makeChain = (vectorstore, mode = 1) => {
  const PROMPT = mode === 1 ? STRICT_QA_PROMPT : CREATIVE_QA_PROMPT;

  return ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorstore.asRetriever(),
    {
      qaTemplate: PROMPT,
      questionGeneratorTemplate: CONDENSE_PROMPT,
      returnSourceDocuments: false, 
      memory,
      inputKey: "question", 
      outputKey: "text",
    }
  );
};

async function runChain() {
  let chain = makeChain(vectorStore);

  const rl = readline.createInterface({ input: stdin, output: stdout });

  while (true) {
    const question = await rl.question('You: ');

    if (question.toLowerCase() === "exit") {
      break;
    }

    if (question.toLowerCase() === "chatbot 1") {
      chatbotMode = 1;
      chain = makeChain(vectorStore, chatbotMode);
      console.log("Chatbot 1 Strict Mode");
      continue;
    }

    if (question.toLowerCase() === "chatbot 2") {
      chatbotMode = 2;
      chain = makeChain(vectorStore, chatbotMode);
      console.log("Chatbot 2 Creative Mode");
      continue;
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