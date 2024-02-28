import { clerkClient } from "@clerk/nextjs";
import { NextResponse } from 'next/server';
import { DeleteUser } from "@/lib/actions/user.action";
export async function DELETE(request: Request) {
  try {
    if (request.body === null) {
      throw new Error('Request body is null');
    }
    
    const bodyContent = await readRequestBody(request.body);

    const { userId } = JSON.parse(bodyContent);
    await clerkClient.users.deleteUser(userId);
    await DeleteUser(userId)
    return NextResponse.json({ message: 'Success' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Error deleting user' });
  }
}

async function readRequestBody(body: ReadableStream<Uint8Array>): Promise<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let bodyContent = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) bodyContent += decoder.decode(value, { stream: true });
  }

  return bodyContent;
}
