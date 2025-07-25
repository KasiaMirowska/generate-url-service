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
---
 Workflow Summary: 

• User uploads receipt via client (drag & drop box).

• Client dispatches uploadReceiptImages():

• Calls generate-url-service for presigned S3 URL.

• Uploads the image + a manifest.json with metadata.

• S3 triggers receiptProcessor Lambda:

• Reads receipt image and manifest.json

• Parses it using Textract + Claude 3

• Writes the structured transaction to Firestore

• Client displays receipt preview and parsed data (with loading state)

---
👩‍💻 Author
Built by Kasia Mirowska – blending creative design sensibility with modern serverless architecture 💡
