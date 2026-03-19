/**
 * DST Database Schema Registry
 *
 * Central data source for schema documentation. Add new modules and
 * relationships here as the database grows. Components like
 * SchemaRelationshipDiagram read from this file automatically.
 */

export const modules = [
  {
    id: 'screening-management',
    name: 'Screening Management',
    description: 'Core screening entities, team assignments, project information, and URL routing.',
    page: './screening-management',
    tables: [
      { id: 'screenings', name: 'Screenings', columns: 14, status: 'implemented' },
      { id: 'users', name: 'Users', columns: 14, status: 'implemented' },
      { id: 'screening-assignments', name: 'ScreeningAssignments', columns: 6, status: 'implemented' },
      { id: 'project-information', name: 'ProjectInformation', columns: 50, status: 'implemented' },
    ],
  },
  {
    id: 'auth-system',
    name: 'Authentication & Notifications',
    description: 'Account lifecycle and user notification management.',
    page: './auth-system',
    tables: [
      { id: 'account-requests', name: 'AccountRequests', columns: 11, status: 'implemented' },
      { id: 'password-reset-requests', name: 'PasswordResetRequests', columns: 6, status: 'implemented' },
      { id: 'notifications', name: 'Notifications', columns: 6, status: 'implemented' },
    ],
  },
  {
    id: 'site-management',
    name: 'Site Management',
    description: 'System-wide alerts and informational ticker messages.',
    page: './site-management',
    tables: [
      { id: 'site-alerts', name: 'SiteAlerts', columns: 9, status: 'implemented' },
      { id: 'ticker-messages', name: 'TickerMessages', columns: 8, status: 'implemented' },
    ],
  },
  {
    id: 'pfm-01',
    name: 'PFM-01: Overtopping Erosion',
    description: 'Overtopping erosion failure mode evaluation with three-table SRP pattern.',
    page: './pfm-01',
    tables: [
      { id: 'pfm01', name: 'Pfm01', columns: 35, status: 'implemented' },
      { id: 'pfm01_dstsrp', name: 'Pfm01_DstSrp', columns: 6, status: 'implemented' },
      { id: 'pfm01_usersrp', name: 'Pfm01_UserSrp', columns: 5, status: 'implemented' },
      { id: 'pfm01_activesrp', name: 'Pfm01_ActiveSrp', columns: 5, status: 'implemented' },
    ],
  },
];

export const relationships = [
  // Screening Management
  { from: 'screenings', to: 'users', label: 'N : 1', note: 'CreatedByUserId' },
  { from: 'screenings', to: 'project-information', label: '1 : 1', cascade: true },
  { from: 'screenings', to: 'screening-assignments', label: '1 : N', cascade: true },
  { from: 'screening-assignments', to: 'users', label: 'N : 1' },

  // PFM-01
  { from: 'screenings', to: 'pfm01', label: '1 : N' },
  { from: 'pfm01', to: 'pfm01_dstsrp', label: '1 : 1', cascade: true },
  { from: 'pfm01', to: 'pfm01_usersrp', label: '1 : 1', cascade: true },
  { from: 'pfm01', to: 'pfm01_activesrp', label: '1 : 1', cascade: true },
];

/** Total table count across all modules. */
export function getTableCount() {
  return modules.reduce((sum, m) => sum + m.tables.length, 0);
}

/** Look up which module a table belongs to. */
export function getModuleForTable(tableId) {
  return modules.find((m) => m.tables.some((t) => t.id === tableId));
}
