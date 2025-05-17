import { BufferMemory } from "langchain/memory";
import { ConversationalRetrievalQAChain } from "langchain/chains";

import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { TaskType } from "@google/generative-ai";
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
const chat_history = new BufferMemory({
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
    temperature: 0.6
});

// Embedding
const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004",
  apiKey: process.env.GEMINI_API_KEY as string, 
  taskType: TaskType.RETRIEVAL_QUERY
}); 

// Pinecone client
const pinecone = new PineconeClient({
    apiKey: process.env.PINECONE_API_KEY as string, 
});

// Vector DB index va namespace
const pineconeIndex = pinecone.Index("flowise").namespace("default");
const pineconeIndexTest = pinecone.Index("test").namespace("IQ-TREE Test 1");

// Ket noi Vector DB voi Embedding
 const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: pineconeIndex,
});

const vectorStoreTest = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: pineconeIndexTest,
})

const makeChain = (vectorstore, mode = 1) => {
  const PROMPT = mode === 1 ? STRICT_QA_PROMPT : CREATIVE_QA_PROMPT;

  return ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorstore.asRetriever({
      searchType: "mmr",
      searchKwargs: {
        fetchK: 15,
        k: 5,
        lambda: 0.3
      }
    }),
    {
      qaTemplate: PROMPT,
      questionGeneratorTemplate: CONDENSE_PROMPT,
      returnSourceDocuments: false, 
      memory: chat_history,
      inputKey: "question", 
      outputKey: "text",
    }
  );
};
const strictChain = makeChain(vectorStore, 1);
const creativeChain = makeChain(vectorStore, 2);

let currentChain = strictChain;

async function runChain() {
  const rl = readline.createInterface({ input: stdin, output: stdout });

  while (true) {
    const question = await rl.question('You: ');

    if (question.toLowerCase() === "exit") {
      break;
    }

    if (question.toLowerCase() === "chatbot 1") {
      currentChain = strictChain;
      console.log("Chatbot 1 Strict Mode");
      continue;
    }

    if (question.toLowerCase() === "chatbot 2") {
      currentChain = creativeChain;
      console.log("Chatbot 2 Creative Mode");
      continue;
    }
    const response = await currentChain.call({ question });

    console.log('ChatBot:', response.text); 

    if (response.sourceDocuments) {
        console.log("\nSource:");
        response.sourceDocuments.forEach((doc, i) => {
          console.log(`\n[${i + 1}] ${doc.metadata.source || "unknown"}`);
          console.log(doc.pageContent.slice(0, 300) + "...");
        });
      }
  }
}

runChain();