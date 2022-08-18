import { Injectable, InternalServerErrorException } from "@nestjs/common";

import { awsS3 } from "config/aws-s3";

@Injectable()
export class AwsS3Service {
	private readonly AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
	private readonly awsS3 = awsS3;

	async uploadFile(file) {
		const { originalname } = file;

		const params = {
			Bucket: this.AWS_S3_BUCKET,
			Key: String(originalname),
			Body: file.buffer,
			ContentType: file.mimetype,
		};

		try {
			const s3Response = await this.awsS3.upload(params).promise();
			console.log(s3Response);

			return s3Response;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	async removeFileFromS3(Key: string) {
		const s3Response = await this.awsS3
			.deleteObject({
				Key,
				Bucket: this.AWS_S3_BUCKET,
			})
			.promise();

		return s3Response;
	}
}
