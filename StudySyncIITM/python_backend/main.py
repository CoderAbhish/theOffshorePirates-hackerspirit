import os
from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

file_path = "./Bot Docs.pdf"
loader = PyPDFLoader(file_path)

llm = ChatOpenAI(model="gpt-4o-mini", temperature= 0.3, top_p=0.2)
docs = loader.load()

embeddings = OpenAIEmbeddings(model="text-embedding-3-large")
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
splits = text_splitter.split_documents(docs)
vectorstore = Chroma.from_documents(documents=splits, embedding=embeddings)

retriever = vectorstore.as_retriever()

system_prompt = (
    "You are an assistant for clearing student doubts in IIT Madras BS Degree Program."
    "Use the following pieces of retrieved context to answer "
    "the question. Only if you don't know the answer, ask them to create"
    "a ticket for their query and a support personnel will help out and for nothing else."
    "Keep the answer concise, very simple for the students to understand and as small as possible."
    "\n\n"
    "{context}"
)

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        ("human", "{input}"),
    ]
)


question_answer_chain = create_stuff_documents_chain(llm, prompt)
rag_chain = create_retrieval_chain(retriever, question_answer_chain)

results = rag_chain.invoke({"input": "Can i skip OPPE2 pass python?"})

print(results['answer'])