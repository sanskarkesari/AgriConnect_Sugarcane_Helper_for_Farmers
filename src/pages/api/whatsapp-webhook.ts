import type { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Verify the request is from Twilio
  const twilioSignature = req.headers['x-twilio-signature'];
  const url = process.env.WEBHOOK_URL; // Your ngrok URL
  const params = req.body;

  const requestIsValid = twilio.validateRequest(
    process.env.TWILIO_AUTH_TOKEN!,
    twilioSignature as string,
    url,
    params
  );

  if (!requestIsValid) {
    return res.status(401).json({ message: 'Invalid request signature' });
  }

  try {
    const incomingMsg = req.body.Body;
    const from = req.body.From;

    // Process the message and generate response
    const response = new twilio.twiml.MessagingResponse();
    response.message('Thank you for your message! Our team will assist you shortly.');

    res.setHeader('Content-Type', 'text/xml');
    return res.send(response.toString());

  } catch (error) {
    console.error('Webhook Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 