/* eslint-disable */
const functions = require("firebase-functions/v1");
const admin     = require("firebase-admin");
const twilio    = require("twilio");

admin.initializeApp();

// Twilio client
const client = twilio(
  functions.config().twilio.sid,
  functions.config().twilio.token
);
const fromNumber = functions.config().twilio.number;   // +1… (Twilio’dan aldığın numara)
const toNumber   = "+905443759482";                    // SMS'i alacak kendi numaran

exports.notifyBySms = functions
  .region("europe-west1")                  // Firestore lokasyonun
  .firestore.document("Sparisler/{id}")    // *** Koleksiyon adı birebir ***
  .onCreate(async (_, ctx) => {
    try {
      await client.messages.create({
        body: "Yeni bir siparişin var!",
        from: fromNumber,
        to:   toNumber,
      });
      functions.logger.info(`SMS gönderildi (#${ctx.params.id})`);
    } catch (err) {
      functions.logger.error("SMS hatası:", err);
    }
  });

