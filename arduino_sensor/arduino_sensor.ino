#include "DHT.h"

#define DHTPIN 2     // Pino digital conectado ao sensor DHT
#define DHTTYPE DHT11   // Tipo do sensor: DHT 11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  // Inicializa a comunicação serial com taxa de 9600 (a mesma do nosso servidor!)
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  // Aguarda 2 segundos entre as leituras
  delay(2000);

  // Lê a umidade e a temperatura
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  // Verifica se alguma leitura falhou e tenta novamente.
  if (isnan(h) || isnan(t)) {
    Serial.println("Falha ao ler o sensor DHT!");
    return;
  }

  // ENVIA OS DADOS NO FORMATO QUE O NOSSO SERVIDOR NODE.JS ESPERA:
  // Exemplo da saída: "Temp: 25.40 Humi: 60.00"
  Serial.print("Temperatura: ");
  Serial.print(t);
  Serial.print("Umidade: ");
  Serial.println(h);
}
