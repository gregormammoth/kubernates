const amqp = require("amqplib");

async function produce() {
  const queue = "hello";
  const msg = "Hello from producer!";

  try {
    // Подключаемся к RabbitMQ
    const connection = await amqp.connect("amqp://rabbit:rabbit@rabbitmq:5672");
    // const connection = await amqp.connect("amqp://rabbit:rabbit@localhost:5672");
    const channel = await connection.createChannel();

    // Объявляем очередь (если её нет — создастся)
    await channel.assertQueue(queue, { durable: false });

    // Отправляем сообщение
    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(`[x] Sent: ${msg}`);

    // Закрываем соединение
    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (err) {
    console.error("Error in producer:", err);
  }
}

produce();