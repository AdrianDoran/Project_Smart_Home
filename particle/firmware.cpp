// This #include statement was automatically added by the Particle IDE.
#include <ArduinoJson.h>

// This #include statement was automatically added by the Particle IDE.
#include <ArduinoJson.h>



// This #include statement was automatically added by the Particle IDE.
#include <google-maps-device-locator.h>

// This #include statement was automatically added by the Particle IDE.
#include <MFRC522.h>



/*
  Function           Core Pin      MRFC522 Pin
  Reset             D2            RST
  SPI SS            D1            SDA
  SPI MOSI          A5            MOSI
  SPI MISO          A4            MISO
  SPI SCK           A3            SCK
*/

#define SS_PIN D1
#define RST_PIN D2

MFRC522 mfrc522(SS_PIN, RST_PIN); // Create MFRC522 instance.
GoogleMapsDeviceLocator locator;

;
void setup() {
  Serial.begin(9600); // Initialize serial communications with the PC
  locator.withSubscribe(locationCallback);
  
  mfrc522.setSPIConfig();
  mfrc522.PCD_Init(); // Init MFRC522 card
  
  RGB.control(true); // take control of onboard RGB led
}

void blink() {
  RGB.color(0, 0, 255);
  delay(150);
  RGB.color(0, 0, 0);

}

void loop() {
  // Look for new cards
  if ( mfrc522.PICC_IsNewCardPresent() ){
    if ( mfrc522.PICC_ReadCardSerial()) {
        blink();
        locator.publishLocation();
    }
  }
}


void locationCallback(float lat, float lon, float accuracy)
{
      Serial.printlnf("lat=%f, lon=%f, accuracy=%f", lat, lon, accuracy);
      // Dump debug info about the card. PICC_HaltA() is automatically called.
      //mfrc522.PICC_DumpToSerial(&(mfrc522.uid));
      String UID = "";
      for (byte i = 0; i < mfrc522.uid.size; i++) {
        UID += String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
        UID += String(mfrc522.uid.uidByte[i], HEX);
      }

      mfrc522.PICC_HaltA();
      Serial.print("UID: ");
      Serial.println(UID);
      
      char cardID[100];
      strncpy(cardID, UID.c_str(), sizeof(cardID));
      
      
      char data[256];
      snprintf(data, sizeof(data), "{\"UID\":\"%s\",\"lat\":\"%.5f\",\"lon\":\"%.5f\",\"time\":\"%s\",\"entry\":\"%s\"}", cardID, lat, lon, "null", "false");
  
      Particle.publish("UID", data, PRIVATE);
      
      blink();

    
}

/*void mock(){

      // Dump debug info about the card. PICC_HaltA() is automatically called.
      //mfrc522.PICC_DumpToSerial(&(mfrc522.uid));
      String UID = "";
      for (byte i = 0; i < mfrc522.uid.size; i++) {
        UID += String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
        UID += String(mfrc522.uid.uidByte[i], HEX);
      }

      mfrc522.PICC_HaltA();
      Serial.print("UID: ");
      Serial.println(UID);
      
      char cardID[100];
      strncpy(cardID, UID.c_str(), sizeof(cardID));
      
      
      char data[256];
      snprintf(data, sizeof(data), "{\"UID\":\"%s\",\"lat\":\"%.6f\",\"lon\":\"%.6f\",\"time\":\"%s\",\"entry\":\"%s\"}", cardID, -38.176193, 144.324268, "null", "false");
      // Lets pass fake values for now.
      Particle.publish("UID", data, PRIVATE);
      delay(1000);
      
      snprintf(data, sizeof(data), "{\"UID\":\"%s\",\"lat\":\"%.6f\",\"lon\":\"%.6f\",\"time\":\"%s\",\"entry\":\"%s\"}", cardID, -38.176108, 144.323045, "null", "false");
      
       Particle.publish("UID", data, PRIVATE);
       delay(1000);
        snprintf(data, sizeof(data), "{\"UID\":\"%s\",\"lat\":\"%.6f\",\"lon\":\"%.6f\",\"time\":\"%s\",\"entry\":\"%s\"}", cardID, -38.175737, 144.320214, "null", "false");
      // Lets pass fake values for now.
      Particle.publish("UID", data, PRIVATE);
      delay(1000);
      snprintf(data, sizeof(data), "{\"UID\":\"%s\",\"lat\":\"%.6f\",\"lon\":\"%.5f\",\"time\":\"%s\",\"entry\":\"%s\"}", cardID, -38.173831, 144.320688, "null", "false");
      
       Particle.publish("UID", data, PRIVATE);
    delay(1000);
    snprintf(data, sizeof(data), "{\"UID\":\"%s\",\"lat\":\"%.6f\",\"lon\":\"%.5f\",\"time\":\"%s\",\"entry\":\"%s\"}", cardID, -38.173089, 144.323176, "null", "false");
      
       Particle.publish("UID", data, PRIVATE);
    delay(1000);
}

*/
