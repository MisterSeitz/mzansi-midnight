import fs from 'node:fs';
import path from 'node:path';

function loadFalApiKey() {
  const envFiles = ['.env.local', '.env'];
  for (const file of envFiles) {
    const fullPath = path.join(process.cwd(), file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      for (const line of content.split(/\r?\n/)) {
        const match = line.match(/^FAL_API_KEY=(.+)$/);
        if (match) return match[1].trim().replace(/^['"]|['"]$/g, '');
      }
    }
  }
  throw new Error('No FAL_API_KEY found');
}

async function testFal() {
  const key = loadFalApiKey();
  console.log('Testing FAL API with flux/schnell...');
  const res = await fetch('https://fal.run/fal-ai/flux/schnell', {
    method: 'POST',
    headers: {
      Authorization: `Key ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: 'Cinematic graphic novel noir illustration of Durban harbour at night in heavy rain, orange fire reflection on ocean water, Citizen Sleeper art style, no text',
      image_size: 'landscape_16_9',
      num_inference_steps: 4,
      num_images: 1,
      enable_safety_checker: false,
    }),
  });
  console.log('Status:', res.status);
  const data = await res.json();
  if (data.images && data.images[0]?.url) {
    console.log('Image URL received successfully:', data.images[0].url.slice(0, 50) + '...');
  } else {
    console.log('Response error:', data);
  }
}
testFal().catch(console.error);
