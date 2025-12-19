export type CampoBitrix = {
  filterLabel: string;
  formLabel: string;
  isDynamic: boolean;
  isImmutable: boolean;
  isMultiple: boolean;
  isReadOnly: boolean;
  isRequired: boolean;
  listLabel: string;
  settings: {
    DEFAULT_VALUE: string;
    MAX_LENGTH: number;
    MIN_LENGTH: number;
    REGEXP: string;
    ROWS: number;
    SIZE: number;
  };
  title: string;
  type: string;
};