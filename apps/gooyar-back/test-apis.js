import axios from "axios";

const BASE_URL = "http://localhost:3001/api/v1";

async function testAPIs() {
  console.log("🧪 Testing Gooyar Backend APIs...\n");

  try {
    // Test Agents API
    console.log("1. Testing Agents API...");
    const agentsResponse = await axios.get(`${BASE_URL}/agents`);
    console.log("✅ GET /agents:", agentsResponse.data);

    // Test creating an agent
    const newAgent = {
      name: "Test Agent",
      description: "A test agent created by API test",
      type: "chat",
    };
    const createAgentResponse = await axios.post(
      `${BASE_URL}/agents`,
      newAgent
    );
    console.log("✅ POST /agents:", createAgentResponse.data);

    // Test Knowledge Base API
    console.log("\n2. Testing Knowledge Base API...");
    const kbResponse = await axios.get(`${BASE_URL}/knowledge-base`);
    console.log("✅ GET /knowledge-base:", kbResponse.data);

    // Test creating a knowledge base
    const newKB = {
      title: "Test Knowledge Base",
      description: "A test knowledge base created by API test",
      type: "mixed",
    };
    const createKBResponse = await axios.post(
      `${BASE_URL}/knowledge-base`,
      newKB
    );
    console.log("✅ POST /knowledge-base:", createKBResponse.data);

    // Test Processes API
    console.log("\n3. Testing Processes API...");
    const processesResponse = await axios.get(`${BASE_URL}/processes`);
    console.log("✅ GET /processes:", processesResponse.data);

    // Test creating a process
    const newProcess = {
      name: "Test Process",
      agent: "Test Agent",
      contactPoints: ["WhatsApp", "Telegram"],
      knowledgeBases: ["Test KB"],
      status: "فعال",
    };
    const createProcessResponse = await axios.post(
      `${BASE_URL}/processes`,
      newProcess
    );
    console.log("✅ POST /processes:", createProcessResponse.data);

    // Test Contact Points API
    console.log("\n4. Testing Contact Points API...");
    const phoneNumbersResponse = await axios.get(
      `${BASE_URL}/contact-points/phone-numbers`
    );
    console.log(
      "✅ GET /contact-points/phone-numbers:",
      phoneNumbersResponse.data
    );

    const telegramResponse = await axios.get(
      `${BASE_URL}/contact-points/telegram`
    );
    console.log("✅ GET /contact-points/telegram:", telegramResponse.data);

    const whatsappResponse = await axios.get(
      `${BASE_URL}/contact-points/whatsapp`
    );
    console.log("✅ GET /contact-points/whatsapp:", whatsappResponse.data);

    const instagramResponse = await axios.get(
      `${BASE_URL}/contact-points/instagram`
    );
    console.log("✅ GET /contact-points/instagram:", instagramResponse.data);

    console.log("\n🎉 All API tests passed successfully!");
  } catch (error) {
    console.error("❌ API test failed:", error.response?.data || error.message);
  }
}

// Run the tests
testAPIs();
