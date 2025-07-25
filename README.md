🔐 generate-url-service/
Lambda function for generating presigned S3 upload URLs.

Local Testing
bash
Copy
Edit
cd generate-url-service
npm install
sls deploy
Request Example
http
Copy
Edit
GET /generate-presigned-url?fileName=myfile.jpg&fileType=image/jpeg&receiptId=abc123
Response:

json
Copy
Edit
{
  "url": "<presigned_url>",
  "key": "abc123/image_0.jpg"
}
