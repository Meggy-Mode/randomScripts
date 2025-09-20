
// === Config ===
const startX = 10;
const startY = 20;
const startZ = 10;
const step = 1;
const padding = 1.8;
const maxYOffset = 1;
const modules = 2

const chestPos = [42, 17, 49]; // counter chest

// === Block map ===
const blockMap = {
    0: "Air", 1: "Stone", 2: "Grass Block", 3: "Dirt", 4: "Block of Gold"
};

// === Example module ===  
const parkourModules = [
    {
        name: "module1",
        layers: [
            [
                [1,1,1,1,1],
                [1,0,0,0,1],
                [1,0,1,0,1],
                [1,0,0,0,1],
                [1,1,1,1,1]
            ],
            [
                [0,0,0,0,0],
                [0,1,1,1,0],
                [0,1,0,1,0],
                [0,1,1,1,0],
                [0,0,0,0,0]
            ],
            [
                [0,0,2,0,0],
                [0,2,0,2,0],
                [2,0,4,0,2],
                [0,2,0,2,0],
                [0,0,2,0,0]
            ],
            [
                [0,0,0,0,0],
                [0,3,3,3,0],
                [0,3,0,3,0],
                [0,3,3,3,0],
                [0,0,0,0,0]
            ],
            [
                [1,1,1,1,1],
                [1,0,0,0,1],
                [0,0,0,0,1],
                [1,0,0,0,1],
                [1,1,1,1,1]
            ]
        ]
    },
	{
	name: "module2",
	layers:[[[0,0,0,0,0],[0,0,0,0,0],[0,0,1,0,0],[0,0,0,0,0],[0,0,0,0,0]],[[0,0,0,0,0],[0,0,1,1,0],[0,1,1,1,0],[0,1,1,0,0],[0,0,0,0,0]],[[0,0,0,1,0],[0,1,1,1,0],[1,1,4,1,0],[0,1,1,1,0],[0,0,0,0,0]],[[0,0,1,1,0],[0,1,1,1,0],[1,1,0,1,1],[1,1,1,1,0],[0,0,1,1,0]],[[2,2,2,2,2],[2,0,0,0,2],[2,0,0,0,2],[2,0,0,0,2],[2,2,2,2,2]]]

}
];

// === Generate next module statelessly ===
function generateNextModule() {
    let moduleIndex = api.getStandardChestItemAmount(chestPos, "Dirt");

    // Module position based on index
    const baseX = startX + moduleIndex * (5 * step + padding);
    const baseZ = startZ;
    const baseY = startY;

    // Random noise
    const offsetX = Math.floor(Math.random() * padding * 2) - padding;
    const offsetZ = Math.floor(Math.random() * padding * 2) - padding;
    const offsetY = Math.floor(Math.random() * (maxYOffset + 1));

    // Generate module
	let randInt = Math.floor(Math.random() * (modules))

    const moduleSettings = parkourModules[randInt];

    for (let y = 0; y < moduleSettings.layers.length; y++) {
        const layer = moduleSettings.layers[y];
        for (let z = 0; z < layer.length; z++) {
            for (let x = 0; x < layer[z].length; x++) {
                const blockId = layer[z][x];
                const blockType = blockMap[blockId];
                if (!blockType || blockType === "Air") continue;
                api.setBlock([
                    baseX + x * step + offsetX,
                    baseY + y + offsetY,
                    baseZ + z * step + offsetZ
                ], blockType);
            }
        }
    }

    // Increment chest Dirt to track next module
    api.giveStandardChestItem(chestPos, "Dirt", 1);
}

// Clears ONE generated module per call
function clearPk() {
    let totalModules = api.getStandardChestItemAmount(chestPos, "Dirt");
    if (totalModules <= 0) return; // nothing to clear

    // Figure out which module to clear (last one first)
    const moduleIndex = totalModules - 1;

    const baseX = startX + moduleIndex * (5 * step + padding);
    const baseZ = startZ;
    const baseY = startY;

    // Module dimensions (all modules same size)
    const moduleSettings = parkourModules[0];
    const height = moduleSettings.layers.length;
    const depth  = moduleSettings.layers[0].length;
    const width  = moduleSettings.layers[0][0].length;

    // Add extra padding to cover random offsets
    const pad = Math.ceil(padding * 2);   // covers ±offsetX/offsetZ
    const yPad = maxYOffset + 1;          // covers offsetY

    for (let y = -yPad; y < height + yPad; y++) {
        for (let z = -pad; z < depth + pad; z++) {
            for (let x = -pad; x < width + pad; x++) {
                api.setBlock([
                    baseX + x * step,
                    baseY + y,
                    baseZ + z * step
                ], "Air");
            }
        }
    }

    // Update Dirt count directly
    api.setStandardChestItemSlot(chestPos, 0, "Dirt", moduleIndex);
}


tick = () => {
  for (const playerId of api.getPlayerIds()) {
    const blockTypes = api.getBlockTypesPlayerStandingOn(playerId);
    if (blockTypes.includes("Block of Gold")) {
      // Player is standing on a Gold block — execute your command here
      let defaultP = api.getPosition(playerId)
		let playerPos = [defaultP[0],defaultP[1] - 1,defaultP[2]]
		api.setBlock(playerPos, "Stone")
		generateNextModule();
	  
    } else if (blockTypes.includes("Block of Moonstone")) {api.log("cleared");clearPk();}
	
  }
};
