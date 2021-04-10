import React, { useCallback } from 'react';
import {
    Button,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
} from '@material-ui/core';

import { TimetablesListItemViewModel } from './view-model';

type Props = TimetablesListItemViewModel & {
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
};

export const TimetablesListItem: React.FC<Props> = ({
    id,
    name,
    deleteButtonName,
    onEdit,
    onDelete,
}) => {
    const handleEditClick = useCallback(() => {
        onEdit(id);
    }, [onEdit, id]);
    const handleDeleteClick = useCallback(() => {
        onDelete(id);
    }, [onDelete, id]);

    return (
        <ListItem button={ true } divider={ true } onClick={ handleEditClick }>
            <ListItemText>{ name }</ListItemText>
            <ListItemSecondaryAction>
                <Button onClick={ handleDeleteClick }>
                    { deleteButtonName }
                </Button>
            </ListItemSecondaryAction>
        </ListItem>
    );
};
