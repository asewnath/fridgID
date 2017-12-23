/*
*
*   THE FOLLOWING CODE FOR GETTING THE RFID TO READ IDs IS ADAPTED FROM https://www.hackster.io/ravee-tansangworn/reading-rfid-card-or-key-ring-and-display-on-lcd-b2f70d
*
*/
#include "RFID.h"

#define SS_PIN      A2
#define RST_PIN     D3

int led1 = D7;

MFRC522 mfrc522(SS_PIN, RST_PIN);	// Create MFRC522 instance.

void setup()
{
    SPI.begin();
    //SPI.setClockDivider(SPI_CLOCK_DIV8);
	pinMode(led1, OUTPUT);
    mfrc522.PCD_Init();
}

void loop() {

    digitalWrite(led1, LOW);
    // Look for new cards, if nothing found, quit
    if ( ! mfrc522.PICC_IsNewCardPresent()) {
    	return;

    }

    // Select one of the cards, if nothing found, quit
    if ( ! mfrc522.PICC_ReadCardSerial()) {
    	return;
    }

    String cardID = "";

    for (byte i = 0; i < mfrc522.uid.size; i++) {
        cardID += String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
        cardID += String(mfrc522.uid.uidByte[i], HEX);
    }
    digitalWrite(led1, HIGH);
    mfrc522.PICC_HaltA();
    Serial.println(cardID);
    Particle.publish("newRFID", cardID);
    //delay(5000);
}
