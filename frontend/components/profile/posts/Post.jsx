import Image from "next/image";
import classes from "./Post.module.css";

function Post({ src }) {
  return (
    <>
      <span className={classes.post}>
        <Image src={src} priority={true}></Image>
      </span>
    </>
  );
}

export default Post;
