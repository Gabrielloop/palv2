import { BehaviorSubject } from 'rxjs';

// Crée un BehaviorSubject avec une valeur initiale (list view par défaut)
export const viewModeSubject$ = new BehaviorSubject(true); // true = List view, false = Thumbnail view

// Méthode pour changer la valeur
export const setViewMode = (isListView: boolean): void => {
    viewModeSubject$.next(isListView);
};
