export const comments = [
  {
    id: 0,
    value: 'some comment',
  },
];
let idCounter = 1;

export async function api(request) {
  let newComment;
  switch (request.method) {
    case 'GET':
      return new Response(JSON.stringify(comments), {status: 200});
    case 'POST':
      newComment = await request.json();
      comments.push(createNewComment(newComment));
      return new Response(JSON.stringify(comments[comments.length - 1]), {
        status: 200,
      });
    case 'DELETE':
      comments.length = 0;
      return new Response('success', {status: 200});
  }

  return new Response('Comment method not found', {status: 404});
}

function createNewComment(newComment) {
  return {...newComment, id: idCounter++};
}
