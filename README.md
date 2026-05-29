# 🌡️ Projeto ExpoTech - Estação IoT de Monitoramento

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Arduino](https://img.shields.io/badge/-Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white)

Um projeto completo de **Internet das Coisas (IoT)** desenvolvido para apresentação acadêmica (ExpoTech). O sistema lê dados reais de temperatura e umidade usando um Arduino, processa esses dados em um servidor local com Node.js e exibe as métricas em tempo real num aplicativo mobile super moderno feito com React Native (Expo).

---

## 🚀 Arquitetura do Projeto

O projeto está dividido em três partes principais:

- 📟 **`arduino_sensor/`**: Código em C++ para a placa Arduino Uno ler os dados do sensor DHT11 e enviar via porta serial.
- ⚙️ **`backend/`**: Servidor Node.js criado para capturar os dados do Arduino via porta serial e fornecer uma API (endpoint HTTP) para o celular.
- 📱 **`frontend/`**: Aplicativo mobile em React Native utilizando Expo. Possui design no estilo "Glassmorphism" (vidro translúcido), atualizações automáticas em tempo real e interface dinâmica.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend Mobile:** React Native, Expo SDK 54, Axios, expo-blur, expo-linear-gradient.
- **Backend:** Node.js, Express, Cors, SerialPort.
- **Hardware:** Placa Arduino Uno, Sensor DHT11 (Temperatura e Umidade), Jumpers e Protoboard.

---

## 🎨 Funcionalidades do Aplicativo
- 🟢 Indicador animado de "Sistema Online" piscando em tempo real.
- 🌡️ Leitura precisa de Temperatura em graus Celsius (°C).
- 💧 Leitura de Umidade relativa do ar (%).
- 🌈 **Fundo Dinâmico Inteligente:** A paleta de cores do aplicativo muda automaticamente de acordo com a temperatura detectada (Tons de Azul para frio, Verde para clima agradável, e Vermelho para calor intenso).

---

## ⚙️ Como rodar o projeto localmente

### 1. Hardware (Arduino)
1. Conecte o sensor DHT11 ao Arduino.
2. Abra o arquivo `arduino_sensor.ino` na **Arduino IDE**.
3. Verifique se a biblioteca "DHT sensor library" está instalada.
4. Faça o upload do código para a placa e feche o Monitor Serial.

### 2. Servidor (Backend)
1. Abra um terminal na pasta `backend`.
2. Instale as dependências: `npm install`
3. Atualize o número da porta COM (ex: `COM3`, `COM5`) no arquivo `server.js` para corresponder ao seu Arduino.
4. Inicie o servidor: `node server.js`

### 3. Aplicativo (Frontend)
1. Abra um terminal na pasta `frontend`.
2. Instale as dependências: `npm install`
3. Abra o arquivo `App.js` e altere o IP na variável `SERVER_URL` para o endereço de IPv4 local do seu computador.
4. Inicie o Expo: `npx expo start --clear`
5. Baixe o aplicativo **Expo Go** (Android/iOS) no seu celular, aponte a câmera para o QR Code e aproveite!

---
*Criado com ☕ e muito código para a apresentação da ExpoTech!*
