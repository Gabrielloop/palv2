import React, { useState, useEffect } from 'react';
import { viewModeSubject$, setViewMode } from '../../service/viewModeService';
import ListIcon from '@mui/icons-material/List';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

const SwitchDisplayResult = () => {
    const [isListView, setIsListViewLocal] = useState(true); // État local pour afficher immédiatement les changements

    useEffect(() => {
        // S'abonner à l'observable pour synchroniser avec d'autres composants
        const subscription = viewModeSubject$.subscribe(setIsListViewLocal);

        return () => subscription.unsubscribe(); // Nettoyage de l'abonnement
    }, []);

    const toggleView = () => {
        setViewMode(!isListView); // Met à jour l'observable
    };

    return (
        <div style={{ padding: '1px', textAlign: 'right' }}>
            <div
                onClick={toggleView}
                style={{
                    padding: '5px 10px',
                    cursor: 'pointer',
                    color: '#fff',
                    transition: 'ease-in-out 0.3s',
                }}
            >
                {isListView ? <ViewModuleIcon/> : <ListIcon/>}
            </div>
        </div>
    );
};

export default SwitchDisplayResult;
