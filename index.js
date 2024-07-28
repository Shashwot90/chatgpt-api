import OpenAI from 'openai';
import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process';
import { Messages } from 'openai/resources/beta/threads/messages';

const rl = readline.createInterface({ input, output });

console.log("Welcome to Chat GPT API")

const mySecret = process.env['key']
const messages = []

const openai = new OpenAI({
  apiKey: mySecret, // This is the default and can be omitted
});

async function main(input) {
  messages.push({ role: 'user', content: input })
  console.log(messages)
  const completion = await openai.chat.completions.create({
    //messages: [{ role: 'user', content: 'Hey ChatGPT how are you?' }],
    messages: messages,
    model: 'gpt-3.5-turbo',
  });

  //console.log(completion.choices)
  console.log(completion.choices[0]?.message?.content)
}

//main();

rl.on('line', (input) => {
  console.log(`Received: ${input}`)
  main(input)
  if (input === 'q') {
    rl.close()
  }
   
})