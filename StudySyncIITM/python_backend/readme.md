# NAVI Chat Bot API

NAVI Chat Bot is a smart conversational assistant designed to help users with academic queries, particularly those related to the **IITM BS Degree** subjects. Using the power of the OpenAI Assistant API and preloaded academic content, NAVI can provide accurate and contextually relevant responses to user questions.

---

## Features

### 1. **Assistant API Integration**
NAVI utilizes the OpenAI Assistant API for conversational capabilities. This API allows the bot to:
- Manage threaded conversations.
- Respond contextually to user messages.

### 2. **Subject-Specific Querying**
NAVI has been enhanced with academic content from PDFs related to our **IITM BS Degree** courses. The courses currently covered include:
- **Mathematics for Data Science I**
- **Statistics for Data Science I**
- **Computational Thinking**
- **Programming in Python**

### 3. **Smart Document Querying**
NAVI extracts and processes data from these PDFs to:
- Provide detailed answers to academic queries.
- Summarize key concepts and topics.
- Clarify doubts using context from the provided materials.

---

## Prerequisites

1. Python 3.8 or higher.
2. OpenAI API key. 
   - Please contact the event personnel to receive the API key. **Only the provided API key will work** for this application.
3. `.env` file with environment variables for secure key storage.
4. Academic PDFs for IITM BS Degree subjects (included in the project directory).

---

## Future Improvements

- **Improve Accuracy**: Enhance the bot's response accuracy by fine-tuning its query understanding and response generation.
- **Expand Subject Database**: Add additional details to the existing subjects, and integrate new subjects into the system.
- **Ticket Information**: Implement the ability for the bot to reference completed tickets, enabling it to resolve more queries autonomously and reduce human intervention.

---