# Project

Build a Financial Advice AI Chatbot using Retrieval-Augmented Generation (RAG)

## Architecture

This project consists of an HTML page, a Node.js backend, and an Ollama model running in the background on your personal computer to compute responses for the user.

## Tech Stack

Frontend: HTML, JavaScript  
Backend: Node.js, Express  
LLM: Ollama Llama3

## Improvements

- Make it more user-friendly by designing it to look like a chatbot and keeping track of all queries sent to the LLM.  
- Deploying to the cloud is preferable because of CPU constraints; currently, response times can be very slow (generally around 1–5 minutes).

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher recommended)  
- **npm** (comes with Node.js)  
- **Ollama** (installed and running locally)

You can check Node.js and npm installation with:

```
node -v
npm -v
```

## How to Run This Application

1. Download and install Ollama. Confirm it is installed by running in your terminal:

```
ollama --version
```

2. Start the Ollama server in the background:

```
ollama serve
```

3. Install project dependencies (Express and any other required packages) from your project folder:

```
npm install
```

4. Run the Node.js server:

```
node server.js
```

5. Open your browser and navigate to:

```
http://localhost:3000/index.html
```

You can now enter a question in the input box and receive responses from the chatbot.

