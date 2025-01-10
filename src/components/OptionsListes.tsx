import React, { useEffect, useState } from 'react';
import { getUserListes } from '../service/dbListe.service';
import { DbLists } from '../@types/bookItem';
import { deleteListe } from '../service/dbListe.service';
interface Liste {
    id: number;
    name: string;
}
const OptionsListes: React.FC = () => {
    const [userLists, setUserLists] = useState<Liste[]>([]);

    useEffect(() => {
        const fetchListes = async () => {
            const dbListes = await getUserListes(1);
            const result: Liste[] = dbListes.map(dbListe => ({
                id: dbListe.id ?? 0,
                name: dbListe.name || 'Liste sans nom'
            }));
            setUserLists(result);
        };

        fetchListes();
    }, []);

// Gérer la suppression
const handleDelete = async (listeId: number) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cette liste ?");
    if (!confirmDelete) return;
  
    const isDeleted = await deleteListe(1, listeId);
    if (isDeleted) {
      const updatedLists = await getUserListes(1);
      const result: Liste[] = updatedLists.map(dbListe => ({
        id: dbListe.id ?? 0,
        name: dbListe.name || 'Liste sans nom'
      }));
      setUserLists(result);
    } else {
      console.error("La suppression a échoué.");
    }
  };
  
    return (
            <>
                {userLists.map((liste) => (
                    <tr key = {liste.id}>
                        <th scope="row" key={liste.id}>{liste.name}</th>
                        <td></td>
                        <td>vider, 
                            <button onClick={() => handleDelete(liste.id)}>supprimer</button>
                    </td>
                    </tr>
                ))}
            </>
    );
};

export default OptionsListes;