🔐 generate-url-service/
Lambda function for generating presigned S3 upload URLs.

##Local Testing
```bash
cd generate-url-service
npm install
sls deploy
```

##Request Example
```bash
GET /generate-presigned-url?fileName=myfile.jpg&fileType=image/jpeg&receiptId=abc123
```

##Response:
```bash
{
  "url": "<presigned_url>",
  "key": "abc123/image_0.jpg"
}
```
