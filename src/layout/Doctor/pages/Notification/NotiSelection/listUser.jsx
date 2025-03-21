import { Checkbox, Divider } from "antd";
import PropTypes from 'prop-types';

import { useEffect, useState, useMemo, forwardRef, useImperativeHandle, useRef } from "react";

const UserItem = ({ id, checked, onChange, name }) => {
    // Prevent the click from bubbling up to parent elements
    const handleClick = (e) => {
        e.stopPropagation();
        onChange(id, !checked, name);
    };

    const handleCheckboxChange = (e) => {
        e.stopPropagation();
        onChange(id, e.target.checked, name);
    };

    return (
        <div>
            <div className="selection-item-user" onClick={handleClick}>
                <div className="selection-item-user-item d-flex align-items-center">
                    <Checkbox 
                        checked={checked} 
                        onChange={handleCheckboxChange}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <p className="ms-4">{name}</p>
                </div>
            </div>
        </div>
    );
};

// Store expanded groups in a Map outside component to persist between renders
const expandedGroupsMap = new Map();

const UserGroupList = ({ group, checkedUsers, onItemChange }) => {
    // Use the group ID as a key for tracking expansion state
    const groupId = group.id;
    
    // Initialize from our persistent map or default to false
    const initialExpanded = expandedGroupsMap.has(groupId) 
        ? expandedGroupsMap.get(groupId) 
        : false;
        
    const [isExpanded, setIsExpanded] = useState(initialExpanded);
    const users = group.users || [];
    
    // Update our persistent map whenever expansion state changes
    useEffect(() => {
        expandedGroupsMap.set(groupId, isExpanded);
    }, [groupId, isExpanded]);
    
    const groupCheckedUserIds = checkedUsers.map(user => user.id);
    
    const groupCheckedUsersCount = users.filter(user => 
        groupCheckedUserIds.includes(user.id)
    ).length;
    
    const indeterminate = groupCheckedUsersCount > 0 && groupCheckedUsersCount < users.length;
    const checkAll = users.length > 0 && groupCheckedUsersCount === users.length;
    
    const onCheckAllChange = (e) => {
        e.stopPropagation();
        
        if (e.target.checked) {
            // Add all users from this group
            const currentUserIds = checkedUsers.map(user => user.id);
            const newUsers = [...checkedUsers];
            
            users.forEach(user => {
                if (!currentUserIds.includes(user.id)) {
                    const userName = renderUserName(user);
                    newUsers.push({ id: user.id, name: userName });
                }
            });
            onItemChange(newUsers);
        } else {
            // Remove all group users
            const userIds = users.map(user => user.id);
            const newUsers = checkedUsers.filter(user => !userIds.includes(user.id));
            onItemChange(newUsers);
        }
    };
    
    const toggleExpand = (e) => {
        if (e) e.stopPropagation();
        const newExpandedState = !isExpanded;
        setIsExpanded(newExpandedState);
        expandedGroupsMap.set(groupId, newExpandedState);
    };
    
    // Render dean badge if applicable
    const renderUserName = (user) => {
        if (user.isDean) {
            return `${user.lastName} ${user.firstName} (Trưởng phòng)`;
        }
        return `${user.lastName} ${user.firstName}`;
    };
    
    return (
        <div className="selection-item-user">
            <div 
                className={`selection-item-user-header d-flex align-items-center ${isExpanded ? 'mb-4' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={toggleExpand}
            >
                <Checkbox 
                    indeterminate={indeterminate} 
                    onChange={onCheckAllChange} 
                    checked={checkAll}
                    onClick={(e) => e.stopPropagation()}
                />
                <div className="ms-2 title">{group.name}</div>
                <i 
                    className={`fa-solid ${isExpanded ? 'fa-caret-up' : 'fa-caret-down'} ms-2`}
                    style={{ transition: 'transform 0.3s ease' }}
                />
            </div>
            <div 
                className="selection-item-user-body"
                style={{
                    maxHeight: isExpanded ? '1000px' : '0',
                    overflow: 'hidden',
                    opacity: isExpanded ? 1 : 0,
                    transition: isExpanded 
                        ? 'max-height 0.5s ease, opacity 0.3s ease 0.2s'
                        : 'max-height 0.5s ease, opacity 0.3s ease'
                }}
            >
                {users.map(user => {
                    const userName = renderUserName(user);
                    const isChecked = checkedUsers.some(checkedUser => checkedUser.id === user.id);
                    
                    return (
                        <UserItem 
                            key={user.id} 
                            id={user.id}
                            name={userName}
                            checked={isChecked}
                            onChange={(id, checked, name) => {
                                let newCheckedUsers;
                                if (checked) {
                                    newCheckedUsers = [...checkedUsers, { id, name }];
                                } else {
                                    newCheckedUsers = checkedUsers.filter(user => user.id !== id);
                                }
                                onItemChange(newCheckedUsers);
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

const ListUser = forwardRef(({ data, role, onCheckedUsersChange, listCheckedUsers }, ref) => {
    const [checkedUsers, setCheckedUsers] = useState(listCheckedUsers || []);
    const [initialLoad, setInitialLoad] = useState(true);
    const userGroups = useMemo(() => data.userGroups || [], [data.userGroups]);

    // Clear the expandedGroupsMap when role changes
    useEffect(() => {
        // Clear the expansion state when role changes
        expandedGroupsMap.clear();
    }, [role]);

    useImperativeHandle(ref, () => ({
        resetCheckedUsers: () => {
            setCheckedUsers([]);
            if (onCheckedUsersChange) {
                onCheckedUsersChange([]);
            }
        }
    }));

    const handleCheckedUsersChange = (newCheckedUsers) => {
        setCheckedUsers(newCheckedUsers);

        if (onCheckedUsersChange) {
            onCheckedUsersChange(newCheckedUsers);
        }
    };

    useEffect(() => {
        if (Array.isArray(listCheckedUsers) && listCheckedUsers.length === 0 && checkedUsers.length > 0) {
            setCheckedUsers([]);
        }
    }, [listCheckedUsers]);

    useEffect(() => {
        let selectedUsers =  [];

        if (role === 0) {
            selectedUsers = userGroups.flatMap(group => 
                (group.users || []).map(user => ({
                    id: user.id,
                    name: user.isDean ? 
                        `${user.lastName} ${user.firstName} (Trưởng phòng)` : 
                        `${user.lastName} ${user.firstName}`
                }))
            );
        } else if (role === 1) {
            selectedUsers = userGroups.filter(group => group.id === 'regular').flatMap(group => 
                (group.users || []).map(user => ({
                    id: user.id,
                    name: `${user.lastName} ${user.firstName}`
                }))
            );
        } else if (role === 2) {
            selectedUsers = userGroups.filter(group => group.id !== 'regular').flatMap(group => 
                (group.users || []).map(user => ({
                    id: user.id,
                    name: user.isDean ? 
                        `${user.lastName} ${user.firstName} (Trưởng phòng)` : 
                        `${user.lastName} ${user.firstName}`
                }))
            );
        } else if (role === 3) {
            selectedUsers = userGroups.filter(group => group.id !== 'regular').flatMap(group => 
                (group.users || []).filter(user => user.isDean === true).map(user => ({
                    id: user.id,
                    name: `${user.lastName} ${user.firstName} (Trưởng phòng)`
                }))
            );
        } else if (role === 4) {
            selectedUsers = checkedUsers
        }
        
        setCheckedUsers(selectedUsers);
        if (onCheckedUsersChange) {
            onCheckedUsersChange(selectedUsers);
        }
    }, [role, userGroups]);
    
    return (
        <div className="selection-item-body">
            {userGroups.map(group => (
                <div key={group.id}>
                    <UserGroupList 
                        group={group}
                        checkedUsers={checkedUsers}
                        onItemChange={handleCheckedUsersChange}
                    />
                    <Divider />
                </div>
            ))}
        </div>
    );
});

// PropTypes...

ListUser.displayName = 'ListUser';

UserItem.propTypes = {
    id: PropTypes.number.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
};

UserGroupList.propTypes = {
    group: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        users: PropTypes.array.isRequired
    }).isRequired,
    checkedUsers: PropTypes.array.isRequired,
    onItemChange: PropTypes.func.isRequired
};

ListUser.propTypes = {
    data: PropTypes.shape({
        userGroups: PropTypes.array.isRequired
    }).isRequired,
    role: PropTypes.number.isRequired,
    onCheckedUsersChange: PropTypes.func,
    listCheckedUsers: PropTypes.array,
};

export default ListUser;