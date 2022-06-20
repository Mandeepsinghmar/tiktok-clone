// TODO: Using Axios makes this function redundant. Just make axios calls in other files and remove this utility function and all fetch calls.
export const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => data);

// TODO: Constants should be written in all uppercase. BASE_URL
export const base_url = process.env.NEXT_PUBLIC_BASE_URL;

// TODO: For functions and methods name, the first word should always be a verb. -> fetchGoogleResponse
export const responseGoogle = async (response: any, addUser: any) => {
  const { name, googleId, imageUrl } = response.profileObj;
  // TODO: Add an empty line between different logical blocks
  addUser(response.profileObj);

  // TODO: Never abbreviate variable/function names. The more descriptive the name is, the better.
  // TODO: Change the name to `user`
  // TODO: For objects that have just a few properties, you can put it in one line to increase readability. 
  const doc = {
    _id: googleId,
    _type: 'user',
    userName: name,
    image: imageUrl,
  };

  // TODO: Switch to Axios
  await fetch(`${base_url}/api/auth`, {
    method: 'POST',
    body: JSON.stringify(doc),
  });
};
