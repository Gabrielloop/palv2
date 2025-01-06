// Fonction désuet de conversion de valeur en nombre arrondi


const convertRound = (value: string | number | null): number => {
        if (value === null || value === undefined || value === '') {
          return 0;
        }
      
        const numberValue = Math.round(Number(value));
        return parseFloat(numberValue.toFixed(1));
      };
      
      export default convertRound;