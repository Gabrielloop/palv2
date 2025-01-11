// Export des listes prédéfinies

export const presetLists = [
    { key: 0, name: "Favoris", type: "fav"},
    { key: 1, name: "A lire", type: "notStart"},
    { key: 2, name: "En cours", type: "inProgress"},
    { key: 3, name: "Terminé", type: "finished"},
    { key: 4, name: "Enregistré", type: "save"},
  ];

  export const getPresetListsTitle = (type:string) => {
    const presetListsTitle = presetLists.find(presetList => presetList.type === type);
    return presetListsTitle ? presetListsTitle.name : "";
  };