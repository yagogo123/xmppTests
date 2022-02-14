import { Injectable } from '@nestjs/common';
const { client, xml } = require('@xmpp/client')






@Injectable()
export class AppService {
  
  async getHello(msg: any) {

// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


    const xmpp = await new client({
      // service: "xmpps://127.0.0.1:5223",
      service: "xmpp://chat-dev.conexia.com.br/http-bind/",

      resource: "testeAdmin",
      domain: "chat-dev.conexia.com.br",
      username: "yago.bareia",
      password: "8MmUXqeXqBVV7UdJBWrQ7gtXcq7CZzpe",
    });
    xmpp.start().catch(console.error)
    // xmpp.on("stanza", (stanza) => {
    //   console.log(stanza.toString());
    //   if (!stanza.is("message")) return;
    
    //   const { to, from } = stanza.attrs;
    //   console.log('stanza: ', stanza.attrs)
    //   stanza.attrs.from = to;
    //   stanza.attrs.to = from;
    //   xmpp.send(stanza);
    // });
    // let isOnline = xmpp.status === "online";
    // console.log('isOnline: ', isOnline)
    // if(isOnline === false){

    // }

    

    await xmpp.on("online", async (address) => {
      // Makes itself available
      await xmpp.send(xml("presence"));
      // Sends a chat message to itself
      const message = xml(
        "message",
        { type: "chat", to: "usuarioteste@chat-dev.conexia.com.br" },
        xml("body", {}, msg.msg),
      );
      

      console.log(address)

      await xmpp.send(message);
      await xmpp.send(xml("presence", { type: "unavailable" }));
      await xmpp.stop()
    });
    await xmpp.on("disconnect", (test) => {
      console.log('teste: ',test)
      return msg.msg;

    })
    // xmpp.on("stanza", async (stanza) => {
    //   if (stanza.is("message")) {
    //     await xmpp.send(xml("presence", { type: "unavailable" }));
    //     await xmpp.stop();
    //   }
    // });
  }
}
