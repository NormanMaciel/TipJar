
# 🪙 TipJar - Propinas con Mensajes en Ethereum

**TipJar** es una dApp que permite a los usuarios enviar propinas en ETH con un mensaje personalizado, mientras que el owner puede retirar los fondos acumulados.  
Incluye contrato inteligente en Solidity, scripts de despliegue e interacción con Hardhat + Ethers.js, y una UI hecha en React + Vite.

---

## 📁 Estructura del Proyecto

```
TipJar/
├── contracts/
│   └── TipJar.sol
├── scripts/
│   ├── deploy.ts
│   └── interactConArg.ts
├── test/
│   └── TipJar.test.ts
├── tipjar-ui/
│   ├── src/
│   │   ├── abi/
│   │   │   └── TipJar.json
│   │   └── App.tsx
├── .env
└── README.md
```

---

## ⚙️ Requisitos

- Node.js >= 18  
- Cuenta en [Alchemy](https://www.alchemy.com/)
- Wallet con ETH de prueba en la red **Sepolia** (por ejemplo, usando MetaMask)

---

## 🔐 Configuración del entorno

Crear un archivo `.env` en la raíz del proyecto con:

```
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/TU_API_KEY
PRIVATE_KEY=tu_clave_privada_sin_0x
```

> ⚠️ **Nunca subas tu `.env` a GitHub. Ya está en el `.gitignore`.**

---

## 🚀 Despliegue del contrato

### 1. Clonar e instalar dependencias

```bash
git clone https://github.com/TU_USUARIO/TipJar.git
cd TipJar
npm init -y
npm install
npm install --save-dev hardhat
npx hardhat
```

### 2. Compilar el contrato

```bash
npx hardhat compile
```

### 3. Desplegar a Sepolia

```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

---

## 🔧 Scripts de Interacción

### Enviar propina con mensaje

```bash
npx ts-node scripts/interactConArg.ts tip "¡Gran trabajo!" 0.01
```

### Consultar balance del contrato

```bash
npx ts-node scripts/interactConArg.ts balance
```

### Retirar fondos (solo el owner)

```bash
npx ts-node scripts/interactConArg.ts withdraw
```

### Listar todas las propinas y mensajes

```bash
npx ts-node scripts/interactConArg.ts listTips
```

---

## 🧪 Ejecutar los tests

```bash
npx hardhat test
```

Verifica:

- Evento emitido al recibir una propina
- Que solo el owner pueda retirar
- Que no se acepten propinas sin ETH
- Errores al pedir propinas inexistentes

---

## 🖥 UI en React

### 1. Ingresar al frontend

```bash
cd tipjar-ui
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar la aplicación

```bash
npm run dev
```

Luego abrir: [http://localhost:5173](http://localhost:5173)

---     
## 🎨 Características del frontend

✅ Listado de todas las propinas con mensaje    
✅ Enviar propina desde MetaMask    
✅ Conexión a la red Sepolia automáticamente    
✅ Estilo simple, rápido y funcional        



---

## 🔒 Seguridad

🔐 Seguridad    
🛡️ .env está ignorado por Git   
🚫 No incluyas tu clave privada en GitHub   
🔑 Usá wallets temporales o con bajo saldo para pruebas

---

## 🧠 Tecnologías utilizadas


🧱 Solidity     
🛠 Hardhat  
🔌 Ethers.js    
🌐 React + Vite


---

## ✨ Autor

Proyecto creado como práctica curso Smart Contracts Ethkipu.

Autor: [Maciel Norman](https://github.com/NormanMaciel)
