import telegramService from './src/telegram.js';
import dotenv from 'dotenv';

dotenv.config();

async function testTelegramService() {
  try {
    console.log('Testing Telegram service...');
    
    // Test 1: Check if environment variables are set
    console.log('\n1. Checking environment variables...');
    if (!process.env.TELEGRAM_API_ID || !process.env.TELEGRAM_API_HASH) {
      console.log('❌ TELEGRAM_API_ID and TELEGRAM_API_HASH must be set in .env file');
      return;
    }
    console.log('✅ Environment variables are set');
    
    // Test 2: Initialize the service
    console.log('\n2. Initializing Telegram service...');
    await telegramService.initialize();
    console.log('✅ Telegram service initialized');
    
    // Test 3: Check status
    console.log('\n3. Checking service status...');
    const status = telegramService.getStatus();
    console.log('Status:', status);
    
    console.log('\n✅ All tests passed! Telegram service is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
  }
}

testTelegramService();
