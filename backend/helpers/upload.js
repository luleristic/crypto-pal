const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

const uploadImage = async ( ext, image, imgId, type, userId) => {
  const upload = await s3
    .upload({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `${userId}/${type}/${imgId}.${ext}`,
      Body: new Buffer.from(
        image.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      ),
    })
    .promise();
  return upload;
};

const deleteAvatarFolder = async (folderName) => {
  const listedObjects = await s3
    .listObjectsV2({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Prefix: folderName,
    })
    .promise();

  if (listedObjects.Contents.length === 0) return;

  const deleteParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Delete: { Objects: [] },
  };

  listedObjects.Contents.forEach(({ Key }) => {
    deleteParams.Delete.Objects.push({ Key });
  });

  await s3.deleteObjects(deleteParams).promise();

  if (listedObjects.IsTruncated) await emptyS3Directory(bucket, dir);
};

const signedUrl = async (imageKey) => {
  // The name of your S3 bucket
  const bucketName = process.env.AWS_S3_BUCKET_NAME;

  // The name of the object you want to generate a URL for
  const objectKey = imageKey;

  // The number of seconds the URL should be valid for (e.g. 3600 for 1 hour)
  const expires = 3600;

  // Generate the signed URL
  const url = s3.getSignedUrl("getObject", {
    Bucket: bucketName,
    Key: objectKey,
    Expires: expires,
  });

  return url;
};

module.exports = {
  uploadImage,
  deleteAvatarFolder,
  signedUrl,
  s3,
};
