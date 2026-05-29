const express = require('express');
const cors = require('cors');
const { SerialPort, ReadlineParser } = require('serialport');

const app = express();
app.use(cors());

// Variáveis para armazenar a última leitura
let latestData = {
    temperature: 0,
    humidity: 0
};

// =========================================================================
// CONFIGURAÇÃO DA PORTA SERIAL
// IMPORTANTE: Altere 'COM3' para a porta onde seu Arduino está conectado!
// =========================================================================
const ARDUINO_PORT = 'COM3'; // Pode ser COM4, COM5... verifique na IDE do Arduino
const BAUD_RATE = 9600;      // Deve ser igual ao Serial.begin(9600) do Arduino

try {
    const port = new SerialPort({ path: ARDUINO_PORT, baudRate: BAUD_RATE });
    const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

    console.log(`Tentando conectar ao Arduino na porta ${ARDUINO_PORT}...`);

    port.on('open', () => {
        console.log(`Conexão serial aberta com sucesso em ${ARDUINO_PORT}!`);
    });

    parser.on('data', (data) => {
        const line = data.trim();
        console.log(`Recebido do Arduino: ${line}`);

        // Tentativa simples de extrair números da string
        // Ex: Se o arduino envia "Temp: 25.4 Humi: 60" ou similar
        const numbers = line.match(/\d+(\.\d+)?/g);
        
        if (numbers && numbers.length >= 1) {
            latestData.temperature = parseFloat(numbers[0]);
            
            if (numbers.length >= 2) {
                latestData.humidity = parseFloat(numbers[1]);
            }
        }
    });

    port.on('error', (err) => {
        console.error('Erro na porta serial:', err.message);
    });
} catch (error) {
    console.error('Falha ao iniciar SerialPort:', error.message);
    console.log('O servidor continuará rodando com dados simulados caso a porta falhe.');
}

// Endpoint para o App buscar os dados
app.get('/api/sensor', (req, res) => {
    res.json(latestData);
});

// Inicialização do Servidor
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n======================================================`);
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Endpoint de dados: http://localhost:${PORT}/api/sensor`);
    console.log(`======================================================\n`);
});
