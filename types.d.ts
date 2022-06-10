// caption,
//        video{
//         asset->{
//           _id,
//           url
//         }
//       },
//    _id,
//      postedBy->{
//       _id,
//       userName,
//       image
//     },
//     likes,
//     comments,
//     userId
export interface Video {
  caption: string;
  video: {
    asset: {
      _id: string;
      url: string;
    };
  };
  _id: string;
  postedBy: {
    _id: string;
    userName: string;
    image: string;
  };
  likes: [];
  comments: [];
  userId: string;
}
