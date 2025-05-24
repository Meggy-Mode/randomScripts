function addEnchantmentLevel(playerId, enchantName) {
  const slot = api.getSelectedInventorySlotI(playerId);
  const item = api.getItemSlot(playerId, slot);

  if (!item || item.type === "Air") {
    api.sendMessage(playerId, "You must be holding an item.");
    return;
  }

  // Extract current customAttributes safely
  const attributes = item.attributes || {};
  const custom = attributes.customAttributes || {};
  const enchants = custom.enchantments || {};

  const currentLevel = enchants[enchantName] || 0;
  const newLevel = currentLevel + 1;
  enchants[enchantName] = newLevel;

  // Rebuild and apply the updated item
  api.setItemSlot(playerId, slot, item.name, item.amount, {
    ...attributes,
    customAttributes: {
      ...custom,
      enchantments: enchants
    }
  });

  api.sendMessage(playerId, `${enchantName} increased to level ${newLevel}.`);
}
