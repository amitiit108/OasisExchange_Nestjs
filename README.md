Instruction to run app
1. cd  CRYPTO-TRANSACTION-MICROSERVICE
2. npx prisma generate
3. npm i
4. npm run start
HTTP api examples
1. curl --location --request GET 'http://localhost:3000/api/v1/transactions' \
--header 'Content-Type: application/json'
2. curl --location --request GET 'http://localhost:3000/api/v1/transactions/3'
3. curl --location 'http://localhost:3000/api/v1/transactions' \
--header 'Content-Type: application/json' \
--data '{"user_id": "user4", "crypto_name": "USDC", "amount": 1.5, "transaction_type": "purchase"}'
4. curl --location --request PUT 'http://localhost:3000/api/v1/transactions/6' \
--header 'Content-Type: application/json' \
--data '{"user_id": "user4", "crypto_name": "BTC", "amount": 1.5, "transaction_type": "purchase"}'
5. 