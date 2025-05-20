from langchain_community.chat_models import ChatGoogleGenerativeAI
from ragas.llms.base import LangchainLLMWrapper
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from ragas.metrics import (
    answer_relevancy,
    faithfulness,
    context_precision,
    context_recall,

)
from ragas import evaluate
from datasets import Dataset
import json



# Load eval_output.json
with open("eval_output.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Filter for examples that have ground_truth
filtered = [item for item in data if item.get("groundTruth")]

# Convert to HuggingFace Dataset format
hf_data = Dataset.from_list([
    {
        "question": item["question"],
        "answer": item["answer"],
        "contexts": item["context"],
        "groundTruth": item["groundTruth"],
        "reference": item["groundTruth"]
    }
    for item in filtered
])

llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-chat",  # Or your desired Gemini model
    apiKey="AIzaSyA4RO8Ew5d3EhAMIlNWVUDksjRpaQ-nSOs",  # Make sure you set this securely
    temperature=0.0,
    maxOutputTokens=1024,
)
ragas_llm = LangchainLLMWrapper(llm)
embeddings = GoogleGenerativeAIEmbeddings(
model="text-embedding-004",
apiKey="AIzaSyA4RO8Ew5d3EhAMIlNWVUDksjRpaQ-nSOs",
taskType="RETRIEVAL_QUERY"
)

metrics = [
    answer_relevancy,
    faithfulness,
    context_precision,
    context_recall,
]
for metric in metrics:
    metric.llm = ragas_llm
    if hasattr(metric, "embeddings"):
        metric.embeddings = embeddings

# Run RAGAS evaluation
result = evaluate(
    hf_data,
    metrics=metrics
)

print(result.to_pandas())
