# 🪙 TipJar - Propinas con Mensajes en Ethereum

**TipJar** es una dApp que permite a los usuarios **enviar propinas en ETH con un mensaje personalizado**, mientras que el owner puede retirar los fondos acumulados.  
Incluye **contrato inteligente en Solidity**, scripts de despliegue e interacción con **Hardhat + Ethers.js**, y una **UI hecha en React + Vite**.

---

## 📁 Estructura del Proyecto

TipJar/
├── contracts/ # Contrato TipJar.sol
├── scripts/ # Scripts de deploy e interacción
├── test/ # Pruebas con Hardhat
├── tipjar-ui/ # Interfaz web con React + Vite
│ ├── src/
│ │ ├── abi/ # ABI del contrato
│ │ └── App.tsx # UI principal
├── .env # Variables sensibles (NO subir)
└── README.md

yaml
Copiar
Editar

---

## ⚙️ Requisitos

✅ Node.js >= 18  
✅ Cuenta en [Alchemy](https://www.alchemy.com/)  
✅ Wallet con ETH de prueba en la red **Sepolia** (por ejemplo, [MetaMask](https://metamask.io/))

---

## 🔐 Configuración del entorno

1. Crear un archivo `.env` en la raíz del proyecto con:

```env
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/TU_API_KEY
PRIVATE_KEY=tu_clave_privada_sin_0x
⚠️ Nunca subas tu .env a GitHub. Ya está en el .gitignore.

🚀 Despliegue del Contrato
Clonar el repo:

bash
Copiar
Editar
git clone https://github.com/tuusuario/TipJar.git
cd TipJar
Instalar dependencias:

bash
Copiar
Editar
npm install
Compilar contrato:

bash
Copiar
Editar
npx hardhat compile
Deploy a Sepolia:

bash
Copiar
Editar
npx hardhat run scripts/deploy.ts --network sepolia
(Opcional) Verificar en Etherscan:

bash
Copiar
Editar
npx hardhat verify TU_CONTRACT_ADDRESS --network sepolia
🔧 Scripts de Interacción
📤 Enviar propina con mensaje:

bash
Copiar
Editar
npx ts-node scripts/interactConArg.ts tip "¡Gran trabajo!" 0.01
💰 Ver balance del contrato:

bash
Copiar
Editar
npx ts-node scripts/interactConArg.ts balance
🏦 Retirar fondos (solo owner):

bash
Copiar
Editar
npx ts-node scripts/interactConArg.ts withdraw
📨 Listar mensajes recibidos:

bash
Copiar
Editar
npx ts-node scripts/interactConArg.ts listTips
🧪 Tests Automatizados
bash
Copiar
Editar
npx hardhat test
✔️ Verifica eventos
✔️ Controla que solo el owner pueda retirar
✔️ Asegura que se reciba ETH
✔️ Maneja errores de índices inválidos

🌐 Interfaz Web (UI)
Entrar a la carpeta del frontend:

bash
Copiar
Editar
cd tipjar-ui
Instalar dependencias:

bash
Copiar
Editar
npm install
Ejecutar la app en desarrollo:

bash
Copiar
Editar
npm run dev
🔗 Luego abrí: http://localhost:5173

🎨 Funcionalidades del Frontend
✅ Mostrar lista de mensajes con montos y remitente
✅ Enviar propina con mensaje desde MetaMask
✅ Conexión automática a Sepolia
✅ UI limpia y rápida con React + Vite

🔐 Seguridad
🛡️ .env está ignorado por Git
🚫 No incluyas tu clave privada en GitHub
🔑 Usá wallets temporales o con bajo saldo para pruebas

🧠 Tecnologías usadas
🧱 Solidity

🛠 Hardhat

🔌 Ethers.js

🌐 React + Vite


