import { NextResponse } from 'next/server'

import openai from '@/openai'

export async function POST(request: Request) {
  const { todos } = await request.json()

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      temperature: 0.8,
      n: 1,
      stream: false,
      messages: [
        {
          role: 'system',
          content: `When responding, welcome the use always as User and say Hello, and welcome to Trello clone todo App! Limit the response to 200 characters`,
        },
        {
          role: 'user',
          content: `Hi there, provide the summary of the following todos. Count how many todos are in each category such as To do, in progress and done, then tell the user to have a productive day! Here's the data: ${JSON.stringify(
            todos
          )}`,
        },
      ],
    })

    const { data } = response

    return NextResponse.json(data.choices[0].message)
  } catch (error: any) {
    const errorData = 'You need to add payement method on OpenAI'
    return NextResponse.json(errorData)
  }
}
