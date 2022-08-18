import AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

export const awsS3 = new AWS.S3({
  region: process.env.AWS_BUCKET_REGION,
});

export default AWS;
