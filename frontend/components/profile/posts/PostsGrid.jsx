import classes from "./PostsGrid.module.css";
import Image from "next/image";
import Post from "./Post";

import img from "../../../public/profile/male-placeholder-image.jpeg"

function PostsGrid() {
  const mockImages = [
    { id: 1, src: img },
    { id: 2, src: img },
    { id: 3, src: img },
    { id: 4, src: img },
    { id: 5, src: img },
    { id: 6, src: img },
  ];
  return (
    <div className={classes.grid}>
      {mockImages.map((image) => (
        <Post key={image.id} src={image.src}></Post>
      ))}
    </div>
  );
}

export default PostsGrid;
