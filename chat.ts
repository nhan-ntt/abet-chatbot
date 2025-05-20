// Improvement: GraphRAG, Rerank, AI Agent, UI, Data Quality, Evaluation
// Should start build in Python :(
import { BufferMemory } from "langchain/memory";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import * as readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
import dotenv from "dotenv";
dotenv.config();

interface AppConfig {
  GEMINI_API_KEY: string;
  GEMINI_LLM_MODEL: string;
  GEMINI_LLM_MAX_TOKEN: number;
  GEMINI_LLM_TEMPERATURE: number;
  GEMINI_EMBEDDING_MODEL: string;

  PINECONE_API_KEY: string;
  PINECONE_TEST_INDEX: string;
  PINECONE_PROD_INDEX: string;
  PINECONE_PROD_NAMESPACE: string;
  PINECONE_TEST_NAMESPACE: string;
}

function loadConfig(): AppConfig {
  const GeminiAPI = process.env.GEMINI_API_KEY;
  const PineconeAPI = process.env.PINECONE_API_KEY;

  if (!GeminiAPI) {
    throw new Error("Missing GEMINI_API_KEY in .env file");
  }
  if (!PineconeAPI) {
    throw new Error("Missing PINECONE_API_KEY in .env file");
  }

  const config: AppConfig = {
    GEMINI_API_KEY: GeminiAPI,
    GEMINI_LLM_MODEL: process.env.GEMINI_LLM_MODEL || "gemini-1.5-flash",
    GEMINI_LLM_MAX_TOKEN: parseInt(process.env.GEMINI_LLM_MAX_TOKEN || "2048"),
    GEMINI_LLM_TEMPERATURE: parseFloat(
      process.env.GEMINI_LLM_TEMPERATURE || "0.6"
    ),
    GEMINI_EMBEDDING_MODEL:
      process.env.GEMINI_EMBEDDING_MODEL || "text-embedding-004",

    PINECONE_API_KEY: PineconeAPI,
    PINECONE_PROD_INDEX: process.env.PINECONE_PROD_INDEX || "flowise",
    PINECONE_PROD_NAMESPACE: process.env.PINECONE_PROD_NAMESPACE || "default",
    PINECONE_TEST_INDEX: process.env.PINECONE_TEST_INDEX || "test",
    PINECONE_TEST_NAMESPACE:
      process.env.PINECONE_TEST_NAMESPACE || "IQ-TREE Test 1",
  };

  return config;
}

const CHATBOT_MODE = {
  STRICT: 1,
  CREATIVE: 2,
};

const COMMAND = {
  EXIT: "exit",
  SWITCH_TO_STRICT: "chatbot 1",
  SWITCH_TO_CREATIVE: "chatbot 2",
  HELP: "help",
};

const CONDENSE_PROMPT = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone Question:`;

const STRICT_QA_PROMPT = `You are an AI chatbot specialized in answering questions about the phylogenetic software IQ-TREE.
You are given the following extracted parts of a long document and a question.
Provide a detailed, helpful, and accurate answer with explanations and examples if available.
If the context is not related to the question, just only say "Im not sure." Don't try to make up an answer.

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

async function main() {
  const CONFIG = loadConfig();

  // Lich su chat va cac bien trong Prompt
  const chat_history = new BufferMemory({
    memoryKey: "chat_history",
    inputKey: "question",
    outputKey: "text",
    returnMessages: true,
  });

  // LLM
  const model = new ChatGoogleGenerativeAI({
    model: CONFIG.GEMINI_LLM_MODEL,
    apiKey: CONFIG.GEMINI_API_KEY,
    maxOutputTokens: CONFIG.GEMINI_LLM_MAX_TOKEN,
    temperature: CONFIG.GEMINI_LLM_TEMPERATURE,
  });

  // Embedding
  const embeddings = new GoogleGenerativeAIEmbeddings({
    model: CONFIG.GEMINI_EMBEDDING_MODEL,
    apiKey: CONFIG.GEMINI_API_KEY,
    taskType: TaskType.RETRIEVAL_QUERY,
  });

  // Pinecone
  const pinecone = new PineconeClient({
    apiKey: CONFIG.PINECONE_API_KEY,
  });
  const pineconeIndex = pinecone
    .Index(CONFIG.PINECONE_PROD_INDEX)
    .namespace(CONFIG.PINECONE_PROD_NAMESPACE);
  const pineconeIndexTest = pinecone
    .Index(CONFIG.PINECONE_TEST_INDEX)
    .namespace(CONFIG.PINECONE_TEST_NAMESPACE);

  // Ket noi Pinecone
  let vectorStore, vectorStoreTest;
  try {
    vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: pineconeIndex,
    });
    vectorStoreTest = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: pineconeIndexTest,
    });
  } catch (error) {
    console.error("Failed to initialize Pinecone vector stores:", error);
    process.exit(1);
  }

  const makeChain = (vectorstore, mode = CHATBOT_MODE.STRICT) => {
    const PROMPT =
      mode === CHATBOT_MODE.STRICT ? STRICT_QA_PROMPT : CREATIVE_QA_PROMPT;
    const lambda = mode === CHATBOT_MODE.STRICT ? 0.8 : 0.5;
    // const scoreThreshold = mode === 1 ? 0.8 : 0.5; // Further improve Retrieval

    return ConversationalRetrievalQAChain.fromLLM(
      model,
      vectorstore.asRetriever({
        searchType: "mmr", // Further Improve use Cohere?
        search_kwargs: {
          fetchK: 15,
          k: 5,
          lambda: lambda,
        },
      }),
      {
        qaTemplate: PROMPT,
        questionGeneratorTemplate: CONDENSE_PROMPT,
        returnSourceDocuments: true,
        memory: chat_history,
        inputKey: "question",
        outputKey: "text",
      }
    );
  };

  const strictChain = makeChain(vectorStore, CHATBOT_MODE.STRICT);
  const creativeChain = makeChain(vectorStore, CHATBOT_MODE.CREATIVE);
  await runInteractiveLoop(strictChain, creativeChain);
}

async function runInteractiveLoop(
  strictChainInstance: ConversationalRetrievalQAChain,
  creativeChainInstance: ConversationalRetrievalQAChain,
) {

  let currentChain: ConversationalRetrievalQAChain = strictChainInstance;
  let currentMode = "Strict";

  const rl = readline.createInterface({ input: stdin, output: stdout });
  console.log(`Chatbot initialized. Currently in ${currentMode} Mode.`);
  console.log(
    "Type 'exit' to quit, 'chatbot 1' for Strict Mode, 'chatbot 2' for Creative Mode, or 'help'."
  );

  while (true) {
    const question = await rl.question("You: ");
    const lowercaseQuestion = question.toLocaleLowerCase();

    if (lowercaseQuestion === COMMAND.EXIT) {
      console.log("Exiting chatbot. Goodbye!");
      break;
    }

    if (lowercaseQuestion === COMMAND.SWITCH_TO_STRICT) {
      currentChain = strictChainInstance;
      currentMode = "Strict";
      console.log("Switched to Chatbot 1 Strict Mode");
      continue;
    }

    if (lowercaseQuestion === COMMAND.SWITCH_TO_CREATIVE) {
      currentChain = creativeChainInstance;
      currentMode = "Creative";
      console.log("Switched to Chatbot 2 Creative Mode");
      continue;
    }

    if (lowercaseQuestion === COMMAND.HELP) {
      console.log(`Available commands:
    ${COMMAND.EXIT}: Exit the chatbot.
    ${COMMAND.SWITCH_TO_STRICT}: Switch to Strict Mode (IQ-TREE specific context).
    ${COMMAND.SWITCH_TO_CREATIVE}: Switch to Creative Mode (broader phylogenetics, speculative).
    ${COMMAND.HELP}: Show this help message.`);
      continue;
    }

    if (question === "") {
      continue;
    }

    console.log("ChatBot is thinking...");

    try {
      const response = await currentChain.call({ question });
      const answer = response.text;
      console.log("ChatBot:", answer);

      if (response.sourceDocuments) {
        console.log("\nSource:");
        response.sourceDocuments.forEach((doc, i) => {
          console.log(`\n[${i + 1}] ${doc.metadata.source || "unknown"}`);
        });
      } else {
        console.log("\nNo source documents were retrieved.");
      }
    } catch (error) {
      console.error("Error during chain execution:", error);
      console.log(
        "ChatBot: I encountered an error. Please try again or check the console for details."
      );
    }
    console.log("\n------------------------------------\n");
  }
  rl.close();
}

main().catch((error) => {
  console.error("Unhandled error", error);
  process.exit(1);
});
