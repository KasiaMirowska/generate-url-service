import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: "us-east-1" });

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    console.log("QUERY PARAMS", event.queryStringParameters);

    const bucket = process.env.S3_BUCKET!;
    const fileName = event.queryStringParameters?.fileName;
    const fileType = event.queryStringParameters?.fileType;

    if (!fileName || !fileType) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ error: "Missing fileName or fileType" }),
      };
    }

    const key = `uploads/${Date.now()}_${fileName}`;

    const url = await getSignedUrl(
      s3,
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        ContentType: fileType,
      }),
      { expiresIn: 60 }
    );

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ url, key }),
    };
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: "Failed to generate signed URL" }),
    };
  }
};
