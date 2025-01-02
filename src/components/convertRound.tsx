const convertRound = (value: string | number | null): number => {
        if (value === null || value === undefined || value === '') {
          return 0; // Retourner une valeur par défaut pour null ou des entrées invalides
        }
      
        const numberValue = Math.round(Number(value));
        return parseFloat(numberValue.toFixed(1));
      };
      
      export default convertRound;