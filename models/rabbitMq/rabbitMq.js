const amqp = require("amqplib/callback_api");
// create the connection with localhost
amqp.connect("amqp://localhost", (error, connection) => {
  if (error) throw error;
  // create the channel
  connection.createChannel((error, channel) => {
    if (error) throw error;
    // ready to use the channel
    const queue = "hello";
    const msg = "Hello world !";
    channel.assertQueue(queue, {
      durable: false,
    });
    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });
  setTimeout(() => {
    connection.close();
    process.exit();
  }, 5000);
});
