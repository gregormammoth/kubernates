const amqp = require("amqplib");

async function consume() {
  const queue = "hello";

  try {
    const connection = await amqp.connect("amqp://rabbit:rabbit@rabbitmq:5672");
    // const connection = await amqp.connect("amqp://rabbit:rabbit@localhost:5672");
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: false });

    console.log(`[x] Waiting for messages in ${queue}. Press CTRL+C to exit`);

    channel.consume(queue, (msg) => {
      if (msg !== null) {
        console.log(`[x] Received: ${msg.content.toString()}`);
        channel.ack(msg); // подтверждаем сообщение
      }
    });
  } catch (err) {
    console.error("Error in consumer:", err);
  }
}

consume();