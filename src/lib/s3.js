import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

export const uploadFile = async (file) => {
  const params = {
    Bucket: 'hammah-green',
    Key: file.name,
    Body: file.data,
    ACL: 'public-read'
  };
  const data = await s3.upload(params).promise();
  return data.Location;
};
