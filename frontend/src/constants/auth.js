// constants/auth.js
export const ROLES = {
    PARENT: 'parent',
    STUDENT: 'student',
    STAFF: 'staff',
  };
  
  export const ROLE_SPECIFIC_FIELDS = {
    [ROLES.STUDENT]: ['grade', 'dateOfBirth', 'parentId'],
    [ROLES.STAFF]: ['position', 'department', 'employeeId'],
    [ROLES.PARENT]: ['phone', 'address'],
  };