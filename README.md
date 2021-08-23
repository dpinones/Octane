## Titulo del proyecto: Octane turnos para cancha de padel
 
#### Sección 1: Resumen:
Este proyecto permite poder reservar canchas de padel utilizando la tecnologia blockchain

#### Section 2: Casos de usos:
##### User roles: 
* Owner 
* User

##### Casos de usos:

* **User**:
    * Hacer una reserva
    * Cancelar una reserva
    * Ver historial de reservas
    * Mi balance actual
    * Si tengo balance a favor poder retirar en cualquier momento
    * Si tengo balance a favor y es superior al monto del valor de la hora que lo descuente de alli
    * Si tengo balance a favor y no es superior al monto del valor de la hora poder agregar balance para completar el valor de la hora
* **Owner**: 
    * Si tengo balance a favor poder retirar en cualquier momento
    * Historial de reservas de todos los usuarios
    * Al reservar una cancha que se genera un descuento de forma aleatoria
    * Si cancela la reserva antes de las 2 horas que se lo devuelva todo el monto, caso contrario se le devuelva solo la mitad

#### Sección 3: Estructura del proyecto:

###### Contrato: 
* **1** Octane.sol: Este contrato se encarga de la logica de las reservas
* **2** HelperDate.sol : Este contrato se encarga de las validaciones con respecto a las fechas
* **3** ReservePrice.sol : Este contrato se encarga  de generar el precio de la reserva y el descuento.
* **4** BokkyPooBahsDateTimeLibrary.sol : Esta biblioteca se encarga de convertir un date unix en año, mes, dia, hora.
Este contrato lo tome de: https://medium.com/@BokkyPooBah/bokkypoobahs-gas-efficient-solidity-datetime-library-92bf96d9b2da

###### Dapp: 
El Frontend se ha creado con Angular 12 y Angular Material. La estructura de la carpeta de la aplicación es la siguiente.
* **2)** src/app/components : contiene html y componentes para las pantallas.
* **3)** src/app/services : contiene el servicio que interactuará con la red blockchain.
* **3)** src/app : contiene toda la lógica de enrutamiento de los componentes

#### Section 4: Pre-requisitos:
* **1)** Instalar en su navegador la extension Metamask.
* **2)** Una vez que levanto la blockchain local de Hardhad(Seccion 5, Paso 4), se listan varias cuentas que tienen ETHER. Usted tiene que agregar algunas de esas cuentas a metamask para poder usar la dapp. 
Debe ir a My Accounts -> Import Account -> y pegar en el campo vacio la clave privada de algunas de las cuentas que estan listadas.
* **3)** Ahora por ultimo debe agregar Metamask la network de Hardhat. Debe ir a CUSTOM RPC y completar con lo siguiente:
    * Network Name: Hardhad
    * New RPC URL: http://localhost:8545
    * Chain ID: 31337
    * Currency Symbol (optional): ETH

#### Section 5: Como configurar localmente?
**Step 1:** Clonar el repositorio en su maquina:
* git clone https://github.com/dpinones/Octane-Smart-Contract.git

**Step 2:** Abrir una terminal, acceda a la carpeta contract y luego instale las dependencias 
* cd contract
* npm install

**Step 3:** Compile los contratos
* npm run build

**Step 3.1:** Ejecute los test
* npm run test

**Step 4:** Levante la blockchain local de Hardhat (por defecto es el puerto 8545)
* npx hardhat node

**Step 5** Abrir una terminal paralela y deploye los contratos en su blockchain local
* npx hardhat run scripts/octane-script.js --network localhost

**Step 7** Abrir una terminal paralela, acceda a la raiz del proyecto y luego instale las dependencias 
* npm install 

**Step 7** Inicie la aplicacion Angular
* **ng serve**

* Go to http://localhost:4200 
* Nota: El navegador debe tener la extension Metamask

#### Sección 6: Error: Nonce too high. Expected nonce to be 0 but got 4. Note that transactions can't be queued when automining.
Si tiene el error del automining valla: My accounts -> settings -> Advanced -> Reset Account. Ahora deberia funcionar
Info: https://dev.to/nmassi/comment/1dafo

#### Sección 7: Modificacion del contrato
Si realiza una modificacion en el contrato. En el frontend modifique los siguientes archivos

src/constants/abis/octane.json - Actualice el ABI
src/utils/getAbis.ts - Actualice el ABI
src/utils/getContractAddress.ts - Actualice el address del contrato

#### Sección 6: Herramientas
    * prettier-plugin-solidity
    * solidity-coverage
    * hardhat-contract-sizer
    * ethers

    

#### Sección 7: Problemas

    * **Manejo de Unix/Fecha:** Al principio se planteo que la forma para reservar era ingresando un unix el cual se lo decodificaba y se transformaba en años, mes, dia, hora. Pero luego se descarto totalmente ya que no era practico utilizar.
    * **Ether.js por Web3:** El peso de la biblioteca web3 era algo que no me convencia. Por lo tanto opte por Ethers.js 
    * **Tamaño del contrato:** Segun la EIP-170 el tamaño límite de un contrato debe ser 24.576 kb. Hoy en dia me esta dando este warning ya que supera el peso.
    Me tope con este artículo de formas que se le puede reducir el tamañana a un contrato https://soliditydeveloper.com/max-contract-size. Tambien sobre el final encontre la EIP-2535 Diamonds que es una forma de organizar su código y contratos Solidity para darles la cantidad adecuada de modularidad y cohesión para su sistema.
    * **Falta de ejemplos de como conectar Angular y un contrato con ether.js: ** Me decidi usar Angular ya que es un framework que lo conozco y lo vengo trabajando. Pero al estar la gran mayoria de dapps con el frontend con el framework React fue muy complejo encontrar informacion. Si habia pero de conectar Angular con web3 y pero yo decidi utilizar Ethers.js

#### Sección 8: Dapp en Heroku
La dapp está en https://octane-smart-contract.herokuapp.com/
Falta hacer el deploy del contrato en una testnet y conectarlo con la Dapp

#### Sección 9: Mejoras?
    * **Optimizar el código:**
    * **Agregar más casos de test por contrato:**
    * **El uso correcto de los BigNumber:**
    * **Optimizar el Gas:**
