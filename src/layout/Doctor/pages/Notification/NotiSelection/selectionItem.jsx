import React, { forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import ListUser from './ListUser'; // Make sure this path is correct

const SelectionItem = forwardRef(({ dataUser, role, onCheckedUsersChange, checkedUsers }, ref) => {
    useImperativeHandle(ref, () => ({
        resetAllChecks: () => {
            if (onCheckedUsersChange) {
                onCheckedUsersChange([]);
            }
        }
    }));

    return (
        <div className="selection-item">
            <ListUser 
                data={dataUser} 
                role={role} 
                onCheckedUsersChange={onCheckedUsersChange}
                listCheckedUsers={checkedUsers || []}
            />
        </div>
    );
});

SelectionItem.propTypes = {
    dataUser: PropTypes.object.isRequired,
    role: PropTypes.number.isRequired,
    onCheckedUsersChange: PropTypes.func,
    checkedUsers: PropTypes.array
};

// This is important to add!
SelectionItem.displayName = 'SelectionItem';

export default SelectionItem;