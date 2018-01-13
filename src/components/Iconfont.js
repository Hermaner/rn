/**
 * Iconfont icon set component.
 * Usage: <Ionicons name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from 'react-native-vector-icons';
import glyphMap from './font';

const iconSet = createIconSet(glyphMap, 'iconfont', 'iconfont.ttf');

export default iconSet;
