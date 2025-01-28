// Export des listes prédéfinies

export const presetLists = [
    { key: 0, name: "Favoris", type: "fav", group: "presets"},
    { key: 1, name: "A lire", type: "notStart", group: "track"},
    { key: 2, name: "En cours", type: "inProgress", group: "track"},
    { key: 3, name: "Terminé", type: "finished", group: "track"},
    { key: 4, name: "Enregistré", type: "save", group: "presets"},
  ];

  export const getPresetListsTitle = (type:string) => {
    const presetListsTitle = presetLists.find(presetList => presetList.type === type);
    return presetListsTitle ? presetListsTitle.name : "";
  };