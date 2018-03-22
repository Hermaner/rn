/**
 * <plusmancn@gmail.com> created at 2017
 *
 * Copyright (c) 2017 plusmancn, all rights
 * reserved.
 *
 * @flow
 *
 * ListItem 常用条目
 */

import ListItemHeader from './ListItemHeader';
import ListItemSeparator from './ListItemSeparator';
import ListItemLabel from './ListItemLabel';
import ListItemArrow from './ListItemArrow';

export default class ListItem {
    static Header = ListItemHeader;
    static Label = ListItemLabel;
    static Separator = ListItemSeparator;
    static Arrow = ListItemArrow;
}
