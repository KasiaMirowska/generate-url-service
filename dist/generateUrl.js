var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
const s3 = new S3Client({ region: "us-east-1" });
export const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        console.log("QUERY PARAMS", event.queryStringParameters);
        const bucket = process.env.S3_BUCKET;
        const fileName = (_a = event.queryStringParameters) === null || _a === void 0 ? void 0 : _a.fileName;
        const fileType = (_b = event.queryStringParameters) === null || _b === void 0 ? void 0 : _b.fileType;
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
        const url = yield getSignedUrl(s3, new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            ContentType: fileType,
        }), { expiresIn: 60 });
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ url, key }),
        };
    }
    catch (error) {
        console.error("Error generating signed URL:", error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ error: "Failed to generate signed URL" }),
        };
    }
});
