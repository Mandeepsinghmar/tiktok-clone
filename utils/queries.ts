export const allPostsQuery = () => {
  const query = `*[_type == "post"] | order(_createdAt desc){
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
   _id,
     postedBy->{
      _id,
      userName,
      image
    },
    likes, 
    comments,
    userId

  }  `;
  return query;
};

export const postDetailQuery = (postId) => {
  const query = `*[_type == "post" && _id == '${postId}']{
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
   likes[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const searchPostsQuery = (searchTerm) => {
  const query = `*[_type == "post" && caption match '${searchTerm}*' || hashtag match '${searchTerm}*'] {
        caption,
       video{
        asset->{
          _id,
          url
        }
      },
    postedBy->{
      _id,
      userName,
      image
    },
   likes,
   _id
          }`;
  return query;
};

export const singleUserQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};

export const allUsersQuery = () => {
  const query = `*[_type == "user"]`;
  return query;
};

export const userCreatedPostsQuery = (userId) => {
  const query = `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc){
  caption,
       video{
        asset->{
          _id,
          url
        }
      },
      likes,
      _id
  }`;
  return query;
};

export const userLikedPostsQuery = (userId) => {
  const query = `*[_type == 'post' && '${userId}' in likes[].userId ] | order(_createdAt desc) {
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      likes,
      _id
  }`;
  return query;
};

export const topicPostsQuery = (topic) => {
  const query = `*[_type == "post" && hashtag match '${topic}*'] {
        caption,
       video{
        asset->{
          _id,
          url
        }
      },
    postedBy->{
      _id,
      userName,
      image
    },
   likes,
   _id
          }`;
  return query;
};