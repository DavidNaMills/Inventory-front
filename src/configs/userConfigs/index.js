import { adminConfig } from './adminConfig';
import { subAdminConfig } from './subAdminConfig';
import { staffConfig } from './staffConfig';

export default () => ({
    '1': staffConfig,
    '2': subAdminConfig,
    '3': adminConfig
});