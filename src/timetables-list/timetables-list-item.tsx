import React, { useCallback } from 'react';
import {
    Button,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
} from '@material-ui/core';

import { TimetablesListItemViewModel } from './view-model';

type Props = TimetablesListItemViewModel & { onDelete: (id: string) => void };

export const TimetablesListItem: React.FC<Props> = ({
    id,
    name,
    deleteButtonName,
    onDelete,
}) => {
    const handleDeleteClick = useCallback(() => {
        onDelete(id);
    }, [onDelete, id]);

    return (
        <ListItem button={ true } divider={ true }>
            <ListItemText>{ name }</ListItemText>
            <ListItemSecondaryAction>
                <Button onClick={ handleDeleteClick }>
                    { deleteButtonName }
                </Button>
            </ListItemSecondaryAction>
        </ListItem>
    );
};
