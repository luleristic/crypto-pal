import Image from "next/image";
import classes from "./Post.module.css";
function Post({ src }) {
  return (
    <>
      <span className={classes.post}>
        <Image src={src} priority={true} width={360} height={360} objectFit='cover'></Image>
      </span>
    </>
  );
}

export default Post;
