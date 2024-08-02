export const BadRequest = (message?: string) => new Response(JSON.stringify({ message: message || 'Bad request' }), {
    status: 400,
    headers: {
      'Content-Type': 'application/json',
    },
  })

export const Unauthorized = () => new Response(JSON.stringify({ message: 'Unauthorized' }), {
    status: 401,
    headers: {
      'Content-Type': 'application/json',
    },
  })
