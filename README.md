# PoC

Task:

Build 2 components one consumer and other as publisher.

Consumer:

1. build iot core
2. subscribe iot topic through lambda
3. iot rule to get data
4. enrich data like add extra attribute in json
5. insert into dynamodb and set some expiry
6. lambda to read data while expiring and insert into s3 - use dynamodb stream
Producer/publisher:

1. subscribe iot topic and generate some random data and publish to topic - may be use lambda or ec2. preferred ec2 but your choice. it should generate data per second once.
all do in nodejs and use mqtt

