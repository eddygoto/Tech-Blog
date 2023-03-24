const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();

  const content = document.querySelector('input[name="content"').value.trim();

  if (title && content) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to post');
    }
  }
}

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/post');
    } else {
      alert('Failed to delete posts');
    }
  }
};

const editPostHandler = async(event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();

  const content = document.querySelector('input[name="content"').value.trim();

  const response = await fetch(`/api/posts`, {
    method: 'PUT',
    body: JSON.stringify({
      post_id: id,
      title,
      content
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to edit post');
  }
}

const commentFormHandler = async(event) => {
  event.preventDefault();

  const comment = document.querySelector('input[name="comment-body"]').value.trim();

  const response = await fetch(`/api/comments`, {
    method: 'POST',
    body: JSON.stringify({
      post_id: id,
      comment
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (response.ok) {
    document.querySelector('#comment-form').style.display = 'block';
  } else {
    alert('Failed to edit post');
  }
}


document
  .querySelector('#new-post-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.delete-post-btn')
  .addEventListener('click', delButtonHandler);

document
  .querySelector('#edit-post-form')
  .addEventListener('submit', editPostHandler);

document
  .querySelector('#comment-form')
  .addEventListener('submit', commentFormHandler);